import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const priv_key = process.env.ACCOUNT_PKEY as string;
const priv_key2 = process.env.ACCOUNT_PKEY2 as string;
const neo_rpc = process.env.RPC_NEO as string;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    neo_testnet: {
      url: neo_rpc,
      accounts: [priv_key, priv_key2],
    },
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai	",
      accounts: [priv_key, priv_key2],
    },
  },
};

export default config;
