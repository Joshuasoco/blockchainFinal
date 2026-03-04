const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = async function (callback) {
  try {
    const instance = await SimpleStorage.deployed();
    const accounts = await web3.eth.getAccounts();
    console.log("Owner wallet:", accounts[0]);
    console.log("Contract owner:", await instance.owner());
    console.log("Match:", accounts[0].toLowerCase() === (await instance.owner()).toLowerCase());
    console.log("\n--- Item Prices ---");
    for (let i = 1; i <= 5; i++) {
      const price = await instance.getItemPrice(i);
      console.log(`Item ${i}: ${price.toString()} wei (${web3.utils.fromWei(price, "ether")} ETH)`);
    }
    const ids = await instance.getItemIds();
    console.log("\nCatalog IDs:", ids.map(x => x.toString()));
    callback();
  } catch (err) {
    console.error("Error:", err.message);
    callback(err);
  }
};
