import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    binance: {
      url: "https://bsc-testnet.public.blastapi.io",
      accounts: ['8e1e4035b6f61f4a36376f701f5545cf5d75ab026c723dbc0ea3039dcaa9d16d']
    },
    seploia: {
      url: "https://scroll-testnet-public.unifra.io",
      accounts: ['8e1e4035b6f61f4a36376f701f5545cf5d75ab026c723dbc0ea3039dcaa9d16d']
    }
  },
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: {
      seploia: '',
      binance: ''
    },
    customChains: [
      {
        network: "seploia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com"
        }
      },
      {
        network: "binance",
        chainId: 97,
        urls: {
          apiURL: "https://api-testnet.bscscan.com/api",
          browserURL: "https://testnet.bscscan.com"
        }
      }
    ]
  }
};

export default config;
