#![cfg(feature = "test-sbf")]
#![feature(type_changing_struct_update)]

use anchor_lang::prelude::{Clock, ErrorCode, Pubkey};
use anchor_spl::token::{Mint, TokenAccount};
use common::setup::{TestData, OTHER_CHAIN};
use example_native_token_transfers::{
    bitmap::Bitmap,
    error::NTTError,
    instructions::TransferArgs,
    queue::outbox::{OutboxItem, OutboxRateLimit, TokenTransferOutbox},
    transceivers::wormhole::ReleaseOutboundArgs,
};
use ntt_messages::{
    chain_id::ChainId, mode::Mode, ntt::NativeTokenTransfer, ntt_manager::NttManagerMessage,
    transceiver::TransceiverMessage, transceivers::wormhole::WormholeTransceiver,
    trimmed_amount::TrimmedAmount,
};
use sdk::accounts::NTT;
use solana_program_test::*;
use solana_sdk::{
    instruction::InstructionError, signature::Keypair, signer::Signer,
    transaction::TransactionError,
};
use wormhole_anchor_sdk::wormhole::PostedVaa;

use crate::{
    common::{
        query::GetAccountDataAnchor,
        setup::{ANOTHER_CHAIN, OUTBOUND_LIMIT},
    },
    sdk::{
        accounts::{good_ntt, NTTAccounts},
        instructions::transfer::Transfer,
    },
};
use crate::{
    common::{setup::OTHER_MANAGER, submit::Submittable},
    sdk::{
        instructions::{
            admin::{set_paused, SetPaused},
            transfer::{approve_token_authority, transfer},
        },
        transceivers::wormhole::instructions::release_outbound::{
            release_outbound, ReleaseOutbound,
        },
    },
};

pub mod common;
pub mod sdk;

use crate::common::setup::setup;

// TODO: some more tests
// - unregistered peer can't transfer
// - can't transfer to unregistered peer
// - can't transfer more than balance
// - wrong inbox accounts
// - paused contracts

/// Helper function for setting up transfer accounts and args.
/// It sets the accounts up properly, so for negative testing we just modify the
/// result.
fn init_accs_args(
    ntt: &NTT,
    ctx: &mut ProgramTestContext,
    test_data: &TestData,
    outbox_item: Pubkey,
    amount: u64,
    should_queue: bool,
) -> (Transfer, TransferArgs) {
    let accs = Transfer {
        payer: ctx.payer.pubkey(),
        mint: test_data.mint,
        from: test_data.user_token_account,
        from_authority: test_data.user.pubkey(),
        peer: ntt.peer(OTHER_CHAIN),
        outbox_item,
    };

    let args = TransferArgs {
        amount,
        recipient_chain: ChainId { id: OTHER_CHAIN },
        recipient_address: [1u8; 32],
        should_queue,
    };

    (accs, args)
}

#[tokio::test]
pub async fn test_transfer_locking() {
    let (mut ctx, test_data) = setup(Mode::Locking).await;
    test_transfer(&mut ctx, &test_data, Mode::Locking).await;
}

#[tokio::test]
pub async fn test_transfer_burning() {
    let (mut ctx, test_data) = setup(Mode::Burning).await;
    test_transfer(&mut ctx, &test_data, Mode::Burning).await;
}

/// This tests the happy path of a transfer, with all the relevant account checks.
/// Written as a helper function so both modes can be tested.
async fn test_transfer(ctx: &mut ProgramTestContext, test_data: &TestData, mode: Mode) {
    let outbox_item = Keypair::new();

    let clock: Clock = ctx.banks_client.get_sysvar().await.unwrap();

    let (accs, args) = init_accs_args(&good_ntt, ctx, test_data, outbox_item.pubkey(), 154, false);

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], ctx)
    .await
    .unwrap();
    transfer(&good_ntt, accs, args, mode)
        .submit_with_signers(&[&outbox_item], ctx)
        .await
        .unwrap();

    let outbox_item_account: OutboxItem<TokenTransferOutbox> =
        ctx.get_account_data_anchor(outbox_item.pubkey()).await;

    assert_eq!(
        outbox_item_account,
        OutboxItem {
            sender: test_data.user.pubkey(),
            recipient_chain: ChainId { id: 2 },
            recipient_ntt_manager: OTHER_MANAGER,
            release_timestamp: clock.unix_timestamp,
            released: Bitmap::new(),
            payload: TokenTransferOutbox {
                amount: TrimmedAmount {
                    amount: 1,
                    decimals: 7
                },
                recipient_address: [1u8; 32],
            }
        }
    );

    release_outbound(
        &good_ntt,
        ReleaseOutbound {
            payer: ctx.payer.pubkey(),
            outbox_item: outbox_item.pubkey(),
        },
        ReleaseOutboundArgs {
            revert_on_delay: true,
        },
    )
    .submit(ctx)
    .await
    .unwrap();

    let outbox_item_account_after: OutboxItem<TokenTransferOutbox> =
        ctx.get_account_data_anchor(outbox_item.pubkey()).await;

    // make sure the outbox item is now released, but nothing else has changed
    assert_eq!(
        OutboxItem {
            released: Bitmap::from_value(1),
            ..outbox_item_account
        },
        outbox_item_account_after,
    );

    let wh_message = good_ntt.wormhole_message(&outbox_item.pubkey());

    // NOTE: technically this is not a PostedVAA but a PostedMessage, but the
    // sdk does not export that type, so we parse it as a PostedVAA instead.
    // They are identical modulo the discriminator, which we just skip by using
    // the unchecked deserialiser.
    // TODO: update the sdk to export PostedMessage
    let msg: PostedVaa<TransceiverMessage<WormholeTransceiver, NativeTokenTransfer>> =
        ctx.get_account_data_anchor_unchecked(wh_message).await;

    let transceiver_message = msg.data();

    assert_eq!(
        transceiver_message,
        &TransceiverMessage::new(
            example_native_token_transfers::ID.to_bytes(),
            OTHER_MANAGER,
            NttManagerMessage {
                id: outbox_item.pubkey().to_bytes(),
                sender: test_data.user.pubkey().to_bytes(),
                payload: NativeTokenTransfer {
                    amount: TrimmedAmount {
                        amount: 1,
                        decimals: 7
                    },
                    source_token: test_data.mint.to_bytes(),
                    to: [1u8; 32],
                    to_chain: ChainId { id: 2 },
                }
            },
            vec![]
        )
    );
}

#[tokio::test]
async fn test_burn_mode_burns_tokens() {
    let (mut ctx, test_data) = setup(Mode::Burning).await;

    let outbox_item = Keypair::new();

    let (accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        105,
        false,
    );

    let mint_before: Mint = ctx.get_account_data_anchor(test_data.mint).await;

    let token_account_before: TokenAccount = ctx
        .get_account_data_anchor(test_data.user_token_account)
        .await;

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    transfer(&good_ntt, accs, args, Mode::Burning)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap();

    let mint_after: Mint = ctx.get_account_data_anchor(test_data.mint).await;

    let token_account_after: TokenAccount = ctx
        .get_account_data_anchor(test_data.user_token_account)
        .await;

    // NOTE: we transfer 105, but only 100 gets burned (token is 9 decimals, and
    // gets trimmed to 8)
    // TODO: should we just revert if there's dust?
    assert_eq!(mint_before.supply - 100, mint_after.supply);
    assert_eq!(
        token_account_before.amount - 100,
        token_account_after.amount
    );
}

#[tokio::test]
async fn locking_mode_locks_tokens() {
    let (mut ctx, test_data) = setup(Mode::Locking).await;

    let outbox_item = Keypair::new();

    let (accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        1050,
        false,
    );

    let token_account_before: TokenAccount = ctx
        .get_account_data_anchor(test_data.user_token_account)
        .await;

    let custody_account_before: TokenAccount = ctx
        .get_account_data_anchor(good_ntt.custody(&test_data.mint))
        .await;

    let mint_before: Mint = ctx.get_account_data_anchor(test_data.mint).await;

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    transfer(&good_ntt, accs, args, Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap();

    let token_account_after: TokenAccount = ctx
        .get_account_data_anchor(test_data.user_token_account)
        .await;

    let custody_account_after: TokenAccount = ctx
        .get_account_data_anchor(good_ntt.custody(&test_data.mint))
        .await;

    let mint_after: Mint = ctx.get_account_data_anchor(test_data.mint).await;

    // NOTE: we transfer 1050, but only 1000 gets locked (token is 9 decimals, and
    // gets trimmed to 7 because of the target chain's decimals)

    assert_eq!(
        token_account_before.amount - 1000,
        token_account_after.amount
    );

    assert_eq!(
        custody_account_before.amount + 1000,
        custody_account_after.amount
    );

    assert_eq!(mint_before.supply, mint_after.supply);
}

#[tokio::test]
async fn test_bad_mint() {
    let (mut ctx, test_data) = setup(Mode::Locking).await;

    let outbox_item = Keypair::new();

    let (mut accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        1050,
        false,
    );

    // use the wrong mint here
    accs.mint = test_data.bad_mint;

    approve_token_authority(
        &good_ntt,
        &test_data.bad_user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();

    let err = transfer(&good_ntt, accs, args, Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap_err();

    assert_eq!(
        err.unwrap(),
        TransactionError::InstructionError(
            0,
            InstructionError::Custom(ErrorCode::ConstraintAddress.into())
        )
    );
}

#[tokio::test]
async fn test_invalid_peer() {
    // in this test we send to 'OTHER_CHAIN' but use the peer account for
    // 'ANOTHER_CHAIN'.
    struct BadNTT {}

    impl NTTAccounts for BadNTT {
        fn peer(&self, _chain_id: u16) -> Pubkey {
            // return 'ANOTHER_CHAIN' peer account
            good_ntt.peer(ANOTHER_CHAIN)
        }
    }

    let (mut ctx, test_data) = setup(Mode::Locking).await;

    let outbox_item = Keypair::new();

    let (accs, args) = init_accs_args(
        &BadNTT {},
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        1050,
        false,
    );

    approve_token_authority(
        &good_ntt,
        &test_data.bad_user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();

    let err = transfer(&BadNTT {}, accs, args, Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap_err();

    assert_eq!(
        err.unwrap(),
        TransactionError::InstructionError(
            0,
            InstructionError::Custom(ErrorCode::ConstraintSeeds.into())
        )
    );
}

#[tokio::test]
async fn test_rate_limit() {
    let (mut ctx, test_data) = setup(Mode::Locking).await;

    let outbox_item = Keypair::new();
    let clock: Clock = ctx.banks_client.get_sysvar().await.unwrap();

    let (accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        100,
        false,
    );

    let outbound_limit_before: OutboxRateLimit = ctx
        .get_account_data_anchor(good_ntt.outbox_rate_limit())
        .await;

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    transfer(&good_ntt, accs, args, Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap();

    let outbound_limit_after: OutboxRateLimit = ctx
        .get_account_data_anchor(good_ntt.outbox_rate_limit())
        .await;

    assert_eq!(
        outbound_limit_before.capacity_at(clock.unix_timestamp) - 100,
        outbound_limit_after.capacity_at(clock.unix_timestamp)
    );
}

#[tokio::test]
async fn test_transfer_wrong_mode() {
    let (mut ctx, test_data) = setup(Mode::Burning).await;
    let outbox_item = Keypair::new();

    let (accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        100,
        false,
    );

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    // make sure we can't transfer in the wrong mode
    let err = transfer(&good_ntt, accs.clone(), args.clone(), Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap_err();

    assert_eq!(
        err.unwrap(),
        TransactionError::InstructionError(
            0,
            InstructionError::Custom(NTTError::InvalidMode.into())
        )
    );
}

async fn assert_queued(ctx: &mut ProgramTestContext, outbox_item: Pubkey) {
    let outbox_item_account: OutboxItem<TokenTransferOutbox> =
        ctx.get_account_data_anchor(outbox_item).await;

    let clock: Clock = ctx.banks_client.get_sysvar().await.unwrap();

    assert!(!outbox_item_account.released.get(0));
    assert!(outbox_item_account.release_timestamp > clock.unix_timestamp);
}

#[tokio::test]
async fn test_large_tx_queue() {
    let (mut ctx, test_data) = setup(Mode::Locking).await;

    let outbox_item = Keypair::new();

    let too_much = OUTBOUND_LIMIT + 1000;
    let should_queue = true;
    let (accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        too_much,
        should_queue,
    );

    let outbound_limit_before: OutboxRateLimit = ctx
        .get_account_data_anchor(good_ntt.outbox_rate_limit())
        .await;

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    transfer(&good_ntt, accs, args, Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap();

    let outbound_limit_after: OutboxRateLimit = ctx
        .get_account_data_anchor(good_ntt.outbox_rate_limit())
        .await;

    assert_queued(&mut ctx, outbox_item.pubkey()).await;

    // queued transfers don't change the rate limit
    assert_eq!(outbound_limit_before, outbound_limit_after);
}

#[tokio::test]
async fn test_cant_transfer_when_paused() {
    let (mut ctx, test_data) = setup(Mode::Locking).await;

    let outbox_item = Keypair::new();

    let (accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        100,
        false,
    );

    set_paused(
        &good_ntt,
        SetPaused {
            owner: test_data.program_owner.pubkey(),
        },
        true,
    )
    .submit_with_signers(&[&test_data.program_owner], &mut ctx)
    .await
    .unwrap();

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    let err = transfer(&good_ntt, accs.clone(), args.clone(), Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap_err();

    assert_eq!(
        err.unwrap(),
        TransactionError::InstructionError(0, InstructionError::Custom(NTTError::Paused.into()))
    );

    // make sure we can unpause
    set_paused(
        &good_ntt,
        SetPaused {
            owner: test_data.program_owner.pubkey(),
        },
        false,
    )
    .submit_with_signers(&[&test_data.program_owner], &mut ctx)
    .await
    .unwrap();

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    transfer(&good_ntt, accs, args, Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap();
}

#[tokio::test]
async fn test_large_tx_no_queue() {
    let (mut ctx, test_data) = setup(Mode::Locking).await;

    let outbox_item = Keypair::new();

    let too_much = OUTBOUND_LIMIT + 1000;
    let should_queue = false;
    let (accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        too_much,
        should_queue,
    );

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    let err = transfer(&good_ntt, accs, args, Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap_err();

    assert_eq!(
        err.unwrap(),
        TransactionError::InstructionError(
            0,
            InstructionError::Custom(NTTError::TransferExceedsRateLimit.into())
        )
    );
}

#[tokio::test]
async fn test_cant_release_queued() {
    let (mut ctx, test_data) = setup(Mode::Locking).await;

    let outbox_item = Keypair::new();

    let too_much = OUTBOUND_LIMIT + 1000;
    let (accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        too_much,
        true,
    );

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    transfer(&good_ntt, accs, args, Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap();

    assert_queued(&mut ctx, outbox_item.pubkey()).await;

    // check that 'revert_on_delay = true' returns correct error
    let err = release_outbound(
        &good_ntt,
        ReleaseOutbound {
            payer: ctx.payer.pubkey(),
            outbox_item: outbox_item.pubkey(),
        },
        ReleaseOutboundArgs {
            revert_on_delay: true,
        },
    )
    .submit(&mut ctx)
    .await
    .unwrap_err();

    assert_eq!(
        err.unwrap(),
        TransactionError::InstructionError(
            0,
            InstructionError::Custom(NTTError::CantReleaseYet.into())
        )
    );

    // check that 'revert_on_delay = false' succeeds but does not release
    release_outbound(
        &good_ntt,
        ReleaseOutbound {
            payer: ctx.payer.pubkey(),
            outbox_item: outbox_item.pubkey(),
        },
        ReleaseOutboundArgs {
            revert_on_delay: false,
        },
    )
    .submit(&mut ctx)
    .await
    .unwrap();

    assert_queued(&mut ctx, outbox_item.pubkey()).await;

    // just to be safe, let's make sure the wormhole message account wasn't initialised
    let wh_message = good_ntt.wormhole_message(&outbox_item.pubkey());
    assert!(ctx
        .banks_client
        .get_account(wh_message)
        .await
        .unwrap()
        .is_none());
}

#[tokio::test]
async fn test_cant_release_twice() {
    let (mut ctx, test_data) = setup(Mode::Locking).await;

    let outbox_item = Keypair::new();

    let (accs, args) = init_accs_args(
        &good_ntt,
        &mut ctx,
        &test_data,
        outbox_item.pubkey(),
        100,
        false,
    );

    approve_token_authority(
        &good_ntt,
        &test_data.user_token_account,
        &test_data.user.pubkey(),
        &args,
    )
    .submit_with_signers(&[&test_data.user], &mut ctx)
    .await
    .unwrap();
    transfer(&good_ntt, accs, args, Mode::Locking)
        .submit_with_signers(&[&outbox_item], &mut ctx)
        .await
        .unwrap();

    release_outbound(
        &good_ntt,
        ReleaseOutbound {
            payer: ctx.payer.pubkey(),
            outbox_item: outbox_item.pubkey(),
        },
        ReleaseOutboundArgs {
            revert_on_delay: true,
        },
    )
    .submit(&mut ctx)
    .await
    .unwrap();

    // make sure we can't release again
    let err = release_outbound(
        &good_ntt,
        ReleaseOutbound {
            payer: ctx.payer.pubkey(),
            outbox_item: outbox_item.pubkey(),
        },
        ReleaseOutboundArgs {
            revert_on_delay: true,
        },
    )
    .submit(&mut ctx)
    .await
    .unwrap_err();

    assert_eq!(
        err.unwrap(),
        TransactionError::InstructionError(
            0,
            InstructionError::Custom(NTTError::MessageAlreadySent.into())
        )
    );
}
