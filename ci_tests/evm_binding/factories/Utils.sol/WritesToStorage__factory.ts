/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  WritesToStorage,
  WritesToStorageInterface,
} from "../../Utils.sol/WritesToStorage";

const _abi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
] as const;

const _bytecode =
  "0x60808060405234601857600a600055603a9081601e8239f35b600080fdfe600080fdfea2646970667358221220658b6c7e70689bae2bd7edab57b072d99985cf5e12551b41fee4975b0ca975bd64736f6c63430008130033";

type WritesToStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WritesToStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WritesToStorage__factory extends ContractFactory {
  constructor(...args: WritesToStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<WritesToStorage> {
    return super.deploy(overrides || {}) as Promise<WritesToStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): WritesToStorage {
    return super.attach(address) as WritesToStorage;
  }
  override connect(signer: Signer): WritesToStorage__factory {
    return super.connect(signer) as WritesToStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WritesToStorageInterface {
    return new utils.Interface(_abi) as WritesToStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WritesToStorage {
    return new Contract(address, _abi, signerOrProvider) as WritesToStorage;
  }
}
