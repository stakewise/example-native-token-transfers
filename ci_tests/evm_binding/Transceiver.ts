/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export declare namespace TransceiverStructs {
  export type TransceiverInstructionStruct = {
    index: BigNumberish;
    payload: BytesLike;
  };

  export type TransceiverInstructionStructOutput = [number, string] & {
    index: number;
    payload: string;
  };
}

export interface TransceiverInterface extends utils.Interface {
  functions: {
    "getMigratesImmutables()": FunctionFragment;
    "getNttManagerOwner()": FunctionFragment;
    "getNttManagerToken()": FunctionFragment;
    "initialize()": FunctionFragment;
    "isPaused()": FunctionFragment;
    "migrate()": FunctionFragment;
    "nttManager()": FunctionFragment;
    "nttManagerToken()": FunctionFragment;
    "owner()": FunctionFragment;
    "pauser()": FunctionFragment;
    "quoteDeliveryPrice(uint16,(uint8,bytes))": FunctionFragment;
    "sendMessage(uint16,(uint8,bytes),bytes,bytes32)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "transferPauserCapability(address)": FunctionFragment;
    "transferTransceiverOwnership(address)": FunctionFragment;
    "upgrade(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getMigratesImmutables"
      | "getNttManagerOwner"
      | "getNttManagerToken"
      | "initialize"
      | "isPaused"
      | "migrate"
      | "nttManager"
      | "nttManagerToken"
      | "owner"
      | "pauser"
      | "quoteDeliveryPrice"
      | "sendMessage"
      | "transferOwnership"
      | "transferPauserCapability"
      | "transferTransceiverOwnership"
      | "upgrade"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getMigratesImmutables",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNttManagerOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNttManagerToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "isPaused", values?: undefined): string;
  encodeFunctionData(functionFragment: "migrate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nttManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nttManagerToken",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pauser", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "quoteDeliveryPrice",
    values: [BigNumberish, TransceiverStructs.TransceiverInstructionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "sendMessage",
    values: [
      BigNumberish,
      TransceiverStructs.TransceiverInstructionStruct,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferPauserCapability",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferTransceiverOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "upgrade", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "getMigratesImmutables",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNttManagerOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNttManagerToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isPaused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "migrate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nttManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nttManagerToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pauser", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "quoteDeliveryPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferPauserCapability",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferTransceiverOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgrade", data: BytesLike): Result;

  events: {
    "AdminChanged(address,address)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "Initialized(uint64)": EventFragment;
    "NotPaused(bool)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(bool)": EventFragment;
    "PauserTransferred(address,address)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NotPaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PauserTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

export interface AdminChangedEventObject {
  previousAdmin: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface BeaconUpgradedEventObject {
  beacon: string;
}
export type BeaconUpgradedEvent = TypedEvent<
  [string],
  BeaconUpgradedEventObject
>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export interface InitializedEventObject {
  version: BigNumber;
}
export type InitializedEvent = TypedEvent<[BigNumber], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface NotPausedEventObject {
  notPaused: boolean;
}
export type NotPausedEvent = TypedEvent<[boolean], NotPausedEventObject>;

export type NotPausedEventFilter = TypedEventFilter<NotPausedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PausedEventObject {
  paused: boolean;
}
export type PausedEvent = TypedEvent<[boolean], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface PauserTransferredEventObject {
  oldPauser: string;
  newPauser: string;
}
export type PauserTransferredEvent = TypedEvent<
  [string, string],
  PauserTransferredEventObject
>;

export type PauserTransferredEventFilter =
  TypedEventFilter<PauserTransferredEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface Transceiver extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TransceiverInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getMigratesImmutables(overrides?: CallOverrides): Promise<[boolean]>;

    getNttManagerOwner(overrides?: CallOverrides): Promise<[string]>;

    getNttManagerToken(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    isPaused(overrides?: CallOverrides): Promise<[boolean]>;

    migrate(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    nttManager(overrides?: CallOverrides): Promise<[string]>;

    nttManagerToken(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pauser(overrides?: CallOverrides): Promise<[string]>;

    quoteDeliveryPrice(
      targetChain: BigNumberish,
      instruction: TransceiverStructs.TransceiverInstructionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    sendMessage(
      recipientChain: BigNumberish,
      instruction: TransceiverStructs.TransceiverInstructionStruct,
      nttManagerMessage: BytesLike,
      recipientNttManagerAddress: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    transferPauserCapability(
      newPauser: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    transferTransceiverOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    upgrade(
      newImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  getMigratesImmutables(overrides?: CallOverrides): Promise<boolean>;

  getNttManagerOwner(overrides?: CallOverrides): Promise<string>;

  getNttManagerToken(overrides?: CallOverrides): Promise<string>;

  initialize(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  isPaused(overrides?: CallOverrides): Promise<boolean>;

  migrate(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  nttManager(overrides?: CallOverrides): Promise<string>;

  nttManagerToken(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  pauser(overrides?: CallOverrides): Promise<string>;

  quoteDeliveryPrice(
    targetChain: BigNumberish,
    instruction: TransceiverStructs.TransceiverInstructionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  sendMessage(
    recipientChain: BigNumberish,
    instruction: TransceiverStructs.TransceiverInstructionStruct,
    nttManagerMessage: BytesLike,
    recipientNttManagerAddress: BytesLike,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  transferPauserCapability(
    newPauser: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  transferTransceiverOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  upgrade(
    newImplementation: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    getMigratesImmutables(overrides?: CallOverrides): Promise<boolean>;

    getNttManagerOwner(overrides?: CallOverrides): Promise<string>;

    getNttManagerToken(overrides?: CallOverrides): Promise<string>;

    initialize(overrides?: CallOverrides): Promise<void>;

    isPaused(overrides?: CallOverrides): Promise<boolean>;

    migrate(overrides?: CallOverrides): Promise<void>;

    nttManager(overrides?: CallOverrides): Promise<string>;

    nttManagerToken(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pauser(overrides?: CallOverrides): Promise<string>;

    quoteDeliveryPrice(
      targetChain: BigNumberish,
      instruction: TransceiverStructs.TransceiverInstructionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendMessage(
      recipientChain: BigNumberish,
      instruction: TransceiverStructs.TransceiverInstructionStruct,
      nttManagerMessage: BytesLike,
      recipientNttManagerAddress: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferPauserCapability(
      newPauser: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferTransceiverOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgrade(
      newImplementation: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminChanged(address,address)"(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "BeaconUpgraded(address)"(
      beacon?: string | null
    ): BeaconUpgradedEventFilter;
    BeaconUpgraded(beacon?: string | null): BeaconUpgradedEventFilter;

    "Initialized(uint64)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "NotPaused(bool)"(notPaused?: null): NotPausedEventFilter;
    NotPaused(notPaused?: null): NotPausedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Paused(bool)"(paused?: null): PausedEventFilter;
    Paused(paused?: null): PausedEventFilter;

    "PauserTransferred(address,address)"(
      oldPauser?: string | null,
      newPauser?: string | null
    ): PauserTransferredEventFilter;
    PauserTransferred(
      oldPauser?: string | null,
      newPauser?: string | null
    ): PauserTransferredEventFilter;

    "Upgraded(address)"(implementation?: string | null): UpgradedEventFilter;
    Upgraded(implementation?: string | null): UpgradedEventFilter;
  };

  estimateGas: {
    getMigratesImmutables(overrides?: CallOverrides): Promise<BigNumber>;

    getNttManagerOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getNttManagerToken(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    isPaused(overrides?: CallOverrides): Promise<BigNumber>;

    migrate(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    nttManager(overrides?: CallOverrides): Promise<BigNumber>;

    nttManagerToken(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pauser(overrides?: CallOverrides): Promise<BigNumber>;

    quoteDeliveryPrice(
      targetChain: BigNumberish,
      instruction: TransceiverStructs.TransceiverInstructionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendMessage(
      recipientChain: BigNumberish,
      instruction: TransceiverStructs.TransceiverInstructionStruct,
      nttManagerMessage: BytesLike,
      recipientNttManagerAddress: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    transferPauserCapability(
      newPauser: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    transferTransceiverOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    upgrade(
      newImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getMigratesImmutables(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNttManagerOwner(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNttManagerToken(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    isPaused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    migrate(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    nttManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nttManagerToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pauser(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    quoteDeliveryPrice(
      targetChain: BigNumberish,
      instruction: TransceiverStructs.TransceiverInstructionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sendMessage(
      recipientChain: BigNumberish,
      instruction: TransceiverStructs.TransceiverInstructionStruct,
      nttManagerMessage: BytesLike,
      recipientNttManagerAddress: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    transferPauserCapability(
      newPauser: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    transferTransceiverOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    upgrade(
      newImplementation: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
