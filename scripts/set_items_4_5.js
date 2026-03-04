/**
 * Sets on-chain prices for items 4 and 5.
 * Run with: truffle exec scripts/set_items_4_5.js --network sepolia
 */
const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = async function (callback) {
  try {
    const instance = await SimpleStorage.deployed();
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];

    console.log("Owner:", owner);
    console.log("Contract:", instance.address);

    // Item 4: 0.004 ETH
    console.log("\nSetting price for item 4...");
    const tx4 = await instance.setItemPrice(4, web3.utils.toWei("0.004", "ether"), { from: owner });
    console.log("Item 4 set. TX:", tx4.tx);

    // Item 5: 0.005 ETH
    console.log("Setting price for item 5...");
    const tx5 = await instance.setItemPrice(5, web3.utils.toWei("0.005", "ether"), { from: owner });
    console.log("Item 5 set. TX:", tx5.tx);

    // Verify all 5 items
    console.log("\n--- Verifying all items ---");
    for (let i = 1; i <= 5; i++) {
      const price = await instance.getItemPrice(i);
      console.log(`Item ${i}: ${web3.utils.fromWei(price, "ether")} ETH`);
    }

    callback();
  } catch (err) {
    console.error("Error:", err.message);
    callback(err);
  }
};
