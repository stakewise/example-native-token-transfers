/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  DummyTokenMintAndBurn,
  DummyTokenMintAndBurnInterface,
} from "../../DummyToken.sol/DummyTokenMintAndBurn";

const _abi = [
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burnFrom",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decreaseAllowance",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "subtractedValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "increaseAllowance",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "addedValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mintDummy",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;

const _bytecode =
  "0x6080346200033a576040906001600160401b03908083018281118282101762000324578352600a815260209169223ab6b6bcaa37b5b2b760b11b83830152835192848401848110838211176200032457855260049384815263222a25a760e11b828201528351908382116200030f576003928354926001968785811c9516801562000304575b83861014620002ef578190601f9586811162000299575b508390868311600114620002325760009262000226575b505060001982871b1c191690871b1784555b8151948511620002115786548681811c9116801562000206575b82821014620001f157838111620001a6575b50809285116001146200013857509383949184926000956200012c575b50501b92600019911b1c19161790555b51610abf9081620003408239f35b0151935038806200010e565b92919084601f1981168860005285600020956000905b898383106200018b575050501062000170575b50505050811b0190556200011e565b01519060f884600019921b161c191690553880808062000161565b8587015189559097019694850194889350908101906200014e565b87600052816000208480880160051c820192848910620001e7575b0160051c019087905b828110620001da575050620000f1565b60008155018790620001ca565b92508192620001c1565b602288634e487b7160e01b6000525260246000fd5b90607f1690620000df565b604187634e487b7160e01b6000525260246000fd5b015190503880620000b3565b90899350601f1983169188600052856000209260005b8782821062000282575050841162000269575b505050811b018455620000c5565b015160001983891b60f8161c191690553880806200025b565b8385015186558d9790950194938401930162000248565b90915086600052836000208680850160051c820192868610620002e5575b918b91869594930160051c01915b828110620002d55750506200009c565b600081558594508b9101620002c5565b92508192620002b7565b602289634e487b7160e01b6000525260246000fd5b94607f169462000085565b604186634e487b7160e01b6000525260246000fd5b634e487b7160e01b600052604160045260246000fd5b600080fdfe608060408181526004918236101561001657600080fd5b600092833560e01c91826306fdde03146105dd57508163095ea7b3146105b357816318160ddd1461059457816323b872dd146104ca578163313ce567146104ae578163395093511461045e57816340c10f191461045957816356aba69c1461045957816370a082311461042257816379cc67901461030157816395d89b41146101e2578163a457c2d71461013a57508063a9059cbb1461010a5763dd62ed3e146100bf57600080fd5b34610106578060031936011261010657806020926100db610702565b6100e361071d565b6001600160a01b0391821683526001865283832091168252845220549051908152f35b5080fd5b5034610106578060031936011261010657602090610133610129610702565b6024359033610819565b5160018152f35b905082346101df57826003193601126101df57610155610702565b918360243592338152600160205281812060018060a01b038616825260205220549082821061018e576020856101338585038733610987565b608490602086519162461bcd60e51b8352820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152fd5b80fd5b838334610106578160031936011261010657805190828454600181811c908083169283156102f7575b60209384841081146102e4578388529081156102c85750600114610273575b505050829003601f01601f191682019267ffffffffffffffff841183851017610260575082918261025c9252826106b9565b0390f35b634e487b7160e01b815260418552602490fd5b8787529192508591837f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b5b8385106102b4575050505083010185808061022a565b80548886018301529301928490820161029e565b60ff1916878501525050151560051b840101905085808061022a565b634e487b7160e01b895260228a52602489fd5b91607f169161020b565b8391503461010657826003193601126101065761031c610702565b6001600160a01b0316906024359082156103d55782845283602052848420549082821061038757508184957fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef936020938688528785520381872055816002540360025551908152a380f35b608490602087519162461bcd60e51b8352820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152fd5b608490602086519162461bcd60e51b8352820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152fd5b5050346101065760203660031901126101065760209181906001600160a01b0361044a610702565b16815280845220549051908152f35b610733565b5050346101065780600319360112610106576101336020926104a7610481610702565b338352600186528483206001600160a01b038216845286529184902054602435906107f6565b9033610987565b5050346101065781600319360112610106576020905160128152f35b83915034610106576060366003190112610106576104e6610702565b6104ee61071d565b91846044359460018060a01b038416815260016020528181203382526020522054906000198203610528575b602086610133878787610819565b84821061055157509183916105466020969561013395033383610987565b91939481935061051a565b606490602087519162461bcd60e51b8352820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152fd5b5050346101065781600319360112610106576020906002549051908152f35b5050346101065780600319360112610106576020906101336105d3610702565b6024359033610987565b849084346106b557826003193601126106b55782600354600181811c908083169283156106ab575b60209384841081146102e4578388529081156102c8575060011461065557505050829003601f01601f191682019267ffffffffffffffff841183851017610260575082918261025c9252826106b9565b600387529192508591837fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b5b838510610697575050505083010185808061022a565b805488860183015293019284908201610681565b91607f1691610605565b8280fd5b6020808252825181830181905290939260005b8281106106ee57505060409293506000838284010152601f8019910116010190565b8181018601518482016040015285016106cc565b600435906001600160a01b038216820361071857565b600080fd5b602435906001600160a01b038216820361071857565b346107185760403660031901126107185761074c610702565b602435906001600160a01b031680156107b1578161076e6020936002546107f6565b6002557fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600093849284845283825260408420818154019055604051908152a380f35b60405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606490fd5b9190820180921161080357565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b0390811691821561093457169182156108e35760008281528060205260408120549180831061088f57604082827fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef958760209652828652038282205586815220818154019055604051908152a3565b60405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608490fd5b60405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608490fd5b60405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608490fd5b6001600160a01b03908116918215610a3857169182156109e85760207f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925918360005260018252604060002085600052825280604060002055604051908152a3565b60405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608490fd5b60405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608490fdfea2646970667358221220efaa133aedd6b4429d77db7c5429dd2502932e13c746b3eb93d74e3db054eb0164736f6c63430008130033";

type DummyTokenMintAndBurnConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DummyTokenMintAndBurnConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DummyTokenMintAndBurn__factory extends ContractFactory {
  constructor(...args: DummyTokenMintAndBurnConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<DummyTokenMintAndBurn> {
    return super.deploy(overrides || {}) as Promise<DummyTokenMintAndBurn>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DummyTokenMintAndBurn {
    return super.attach(address) as DummyTokenMintAndBurn;
  }
  override connect(signer: Signer): DummyTokenMintAndBurn__factory {
    return super.connect(signer) as DummyTokenMintAndBurn__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DummyTokenMintAndBurnInterface {
    return new utils.Interface(_abi) as DummyTokenMintAndBurnInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DummyTokenMintAndBurn {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DummyTokenMintAndBurn;
  }
}
