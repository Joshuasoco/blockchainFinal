/**
 * Direct ethers.js deployment script — bypasses Truffle's aggressive block polling.
 * Run with: node scripts/deploy_ethers.js
 */
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const PRIVATE_KEY = process.env.ETH_PRIVATE_KEY || "ecd6a68bb106e85982f7e37df2b0976ea6d6b3945f8d886b83f6000ad38dc7b1";
const RPC_URL = "https://sepolia.infura.io/v3/ad29101b70d94fcf9719a1f1353dc306";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("Deployer:", wallet.address);
  const balance = await provider.getBalance(wallet.address);
  console.log("Balance:", ethers.utils.formatEther(balance), "ETH");

  // Load compiled artifact
  const artifactPath = path.join(__dirname, "../build/contracts/SimpleStorage.json");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  console.log("\nDeploying SimpleStorage...");
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy({ gasLimit: 3000000 });

  console.log("TX hash:", contract.deployTransaction.hash);
  console.log("Waiting for confirmation...");
  await contract.deployed();

  const address = contract.address;
  console.log("\n✅ Contract deployed at:", address);

  // Verify item prices from constructor
  console.log("\n--- Verifying constructor prices ---");
  for (let i = 1; i <= 3; i++) {
    const price = await contract.getItemPrice(i);
    console.log(`Item ${i}: ${ethers.utils.formatEther(price)} ETH`);
  }

  // Set prices for items 4 and 5
  console.log("\n--- Setting prices for items 4 & 5 ---");
  const tx4 = await contract.setItemPrice(4, ethers.utils.parseEther("0.004"), { gasLimit: 100000 });
  await tx4.wait();
  console.log("Item 4 set. TX:", tx4.hash);

  const tx5 = await contract.setItemPrice(5, ethers.utils.parseEther("0.005"), { gasLimit: 100000 });
  await tx5.wait();
  console.log("Item 5 set. TX:", tx5.hash);

  // Verify all 5
  console.log("\n--- Final prices for all 5 items ---");
  for (let i = 1; i <= 5; i++) {
    const price = await contract.getItemPrice(i);
    console.log(`Item ${i}: ${ethers.utils.formatEther(price)} ETH`);
  }

  // Update blockchain_config.json
  const configPath = path.join(__dirname, "../streamingassets/blockchain_config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const oldAddress = config.contractAddress;
  config.contractAddress = address;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
  console.log(`\n✅ blockchain_config.json updated: ${oldAddress} → ${address}`);
}

main().catch(err => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
