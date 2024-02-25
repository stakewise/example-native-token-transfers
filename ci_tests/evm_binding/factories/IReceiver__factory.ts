/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IReceiver, IReceiverInterface } from "../IReceiver";

const _abi = [
  {
    type: "function",
    name: "receiveMessage",
    inputs: [
      {
        name: "message",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "success",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
] as const;

export class IReceiver__factory {
  static readonly abi = _abi;
  static createInterface(): IReceiverInterface {
    return new utils.Interface(_abi) as IReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IReceiver {
    return new Contract(address, _abi, signerOrProvider) as IReceiver;
  }
}
