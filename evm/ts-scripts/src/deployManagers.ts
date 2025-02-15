import { inspect } from "util";
import { ethers } from "ethers";
import { ChainId } from "@certusone/wormhole-sdk";
import {
  ERC1967Proxy__factory,
  NttManager__factory,
  TransceiverStructs__factory,
  TrimmedAmountLib__factory,
} from "../contract-bindings";
import {
  loadOperatingChains,
  init,
  ChainInfo,
  writeOutputFiles,
  Deployment,
  getSigner,
  loadScriptConfig,
} from "./env";
import { NttManagerLibraryAddresses } from "../contract-bindings/factories/NttManager__factory";

const processName = "deployManagers";

type NttManagerConfig = {
  token: string;
  mode: number;
  chainId: ChainId;
  rateLimitDuration: number;
  skipRateLimit: boolean;
  threshold: number;
  outboundLimit: number;
};

init();
const chains = loadOperatingChains();

// Warning: we assume that the script configuration file is correctly formed
const config: NttManagerConfig[] = loadScriptConfig("managers");

async function run() {
  console.log(`Start ${processName}!`);

  const output: any = {
    NttManagerImplementations: [],
    NttManagerProxies: [],
    TransceiverStructsLibs: [],
    TrimmedAmountLibs: [],
  };

  const results = await Promise.all(
    chains.map(async (chain) => {
      const chainConfig = config.find((c) => c.chainId === chain.chainId);
      if (!chainConfig) {
        console.error(`No configuration found for chain ${chain.chainId}`);
        return { chainId: chain.chainId, error: "No configuration found" };
      }

      const result = await deployManager(chain, chainConfig);
      return result;
    })
  );

  for (const result of results) {
    if (result.error) {
      console.error(
        `Error deploying for chain ${result.chainId}: ${inspect(result.error)}`
      );
      continue;
    }

    console.log(`Deployed succeded for chain ${result.chainId}`);
    output.NttManagerImplementations.push(result.implementation);
    output.NttManagerProxies.push(result.proxy);
    output.TransceiverStructsLibs.push({
      chainId: result.chainId,
      address:
        result.libraries[
          "src/libraries/TransceiverStructs.sol:TransceiverStructs"
        ],
    });
    output.TrimmedAmountLibs.push({
      chainId: result.chainId,
      address:
        result.libraries[
          "src/libraries/TrimmedAmount.sol:TrimmedAmountLib"
        ],
    });
  }

  writeOutputFiles(output, processName);
}

async function deployManager(chain: ChainInfo, config: NttManagerConfig) {
  let libraries, implementation, proxy;
  const log = (...args) => console.log(`[${chain.chainId}]`, ...args);

  try {
    libraries = await deployManagerLibraries(chain);
    log("Libraries deployed at ", inspect(libraries));
  } catch (error) {
    return { chainId: chain.chainId, error };
  }

  try {
    implementation = await deployManagerImplementation(
      chain,
      config,
      libraries
    );
    log("Implementation deployed at ", implementation.address);
  } catch (error) {
    return { chainId: chain.chainId, error };
  }

  proxy = await deployManagerProxy(chain, implementation.address);
  log("Proxy deployed at ", proxy.address);

  return {
    chainId: chain.chainId,
    implementation,
    libraries,
    proxy,
  };
}

run().then(() => console.log("Done!"));

async function deployManagerLibraries(
  chain: ChainInfo
): Promise<NttManagerLibraryAddresses> {
  const signer = await getSigner(chain);

  const libAddresses = {} as NttManagerLibraryAddresses;

  const structs = await new TransceiverStructs__factory(signer).deploy();
  libAddresses["src/libraries/TransceiverStructs.sol:TransceiverStructs"] = await structs.deployed().then((d) => d.address);

  return libAddresses;
}

async function deployManagerImplementation(
  chain: ChainInfo,
  config: NttManagerConfig,
  libraries: NttManagerLibraryAddresses
): Promise<Deployment> {
  const signer = await getSigner(chain);

  const managerFactory = await new NttManager__factory(libraries, signer);
  const manager = await managerFactory.deploy(
    config.token,
    config.mode,
    config.chainId,
    config.rateLimitDuration,
    config.skipRateLimit
    // overrides,
  );

  return await manager.deployed().then((result) => {
    return { address: result.address, chainId: chain.chainId };
  });
}

async function deployManagerProxy(
  chain: ChainInfo,
  implementationAddress: string
): Promise<Deployment> {
  const signer = await getSigner(chain);

  const proxyFactory = new ERC1967Proxy__factory(signer);

  const abi = ["function initialize()"];
  const iface = new ethers.utils.Interface(abi);
  const encodedCall = iface.encodeFunctionData("initialize", []);

  const proxy = await proxyFactory.deploy(implementationAddress, encodedCall);

  return await proxy.deployed().then((result) => {
    return { address: result.address, chainId: chain.chainId };
  });
}
