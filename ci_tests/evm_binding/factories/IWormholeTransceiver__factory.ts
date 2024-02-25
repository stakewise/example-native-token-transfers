/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IWormholeTransceiver,
  IWormholeTransceiverInterface,
} from "../IWormholeTransceiver";

const _abi = [
  {
    type: "function",
    name: "getWormholePeer",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isSpecialRelayingEnabled",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isVAAConsumed",
    inputs: [
      {
        name: "hash",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isWormholeEvmChain",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isWormholeRelayingEnabled",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "receiveMessage",
    inputs: [
      {
        name: "encodedMessage",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ReceivedMessage",
    inputs: [
      {
        name: "digest",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "emitterChainId",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "emitterAddress",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "sequence",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ReceivedRelayedMessage",
    inputs: [
      {
        name: "digest",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "emitterChainId",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "emitterAddress",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SendTransceiverMessage",
    inputs: [
      {
        name: "recipientChain",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "message",
        type: "tuple",
        indexed: false,
        internalType: "struct TransceiverStructs.TransceiverMessage",
        components: [
          {
            name: "sourceNttManagerAddress",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "recipientNttManagerAddress",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "nttManagerPayload",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "transceiverPayload",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetIsSpecialRelayingEnabled",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "isRelayingEnabled",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetIsWormholeEvmChain",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetIsWormholeRelayingEnabled",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "isRelayingEnabled",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetWormholePeer",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "peerContract",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "CallerNotRelayer",
    inputs: [
      {
        name: "caller",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidRelayingConfig",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        internalType: "uint16",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidVaa",
    inputs: [
      {
        name: "reason",
        type: "string",
        internalType: "string",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidWormholeChainIdZero",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidWormholePeer",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "peerAddress",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidWormholePeerZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "PeerAlreadySet",
    inputs: [
      {
        name: "chainId",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "peerAddress",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "TransferAlreadyCompleted",
    inputs: [
      {
        name: "vaaHash",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "UnexpectedAdditionalMessages",
    inputs: [],
  },
] as const;

export class IWormholeTransceiver__factory {
  static readonly abi = _abi;
  static createInterface(): IWormholeTransceiverInterface {
    return new utils.Interface(_abi) as IWormholeTransceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWormholeTransceiver {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IWormholeTransceiver;
  }
}
