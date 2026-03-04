const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.ETH_PRIVATE_KEY,
        "https://sepolia.infura.io/v3/ad29101b70d94fcf9719a1f1353dc306"
      ),
      network_id: 11155111,
      gas: 3000000,
      confirmations: 2,
      timeoutBlocks: 500,
      networkCheckTimeout: 120000,
      deploymentPollingInterval: 8000,
    }
  },
  compilers: {
    solc: { version: "0.8.19" }
  }
};