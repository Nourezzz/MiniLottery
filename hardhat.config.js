require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.11",
  paths: {
    sources: "./contracts",
  },
  networks: {
    hardhat: {},
  },
   networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      forking: {
        url: "https://rpc.ankr.com/bsc"
      },
      accounts: {
        count: 250,
      }
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s2.binance.org:8545/"
    },
    mumb: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/hQe09bWwSPichl2HSenFSf-lty-_d_WF"
    }
  },
};
