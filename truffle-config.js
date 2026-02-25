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
        "https://sepolia.infura.io/v3/e3234f466e9b4c5388753084f5e5f1b9"
      ),
      network_id: 11155111,
      gas: 3000000,
      confirmations: 2,
      timeoutBlocks: 200,
    }
  },
  compilers: {
    solc: { version: "0.8.19" }
  }
};