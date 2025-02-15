use anchor_lang::prelude::*;

declare_id!("NGoD1yTeq5KaURrZo7MnCTFzTA4g62ygakJCnzMLCfm");

pub mod error;
pub mod instructions;

use instructions::*;

#[program]
pub mod wormhole_governance {
    use super::*;

    pub fn governance<'info>(ctx: Context<'_, '_, '_, 'info, Governance<'info>>) -> Result<()> {
        instructions::governance(ctx)
    }
}
