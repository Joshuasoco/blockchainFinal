# Project Setup Guide — Unity + Blockchain (Ganache)

> Follow every step from top to bottom. Do not skip anything.

---

## Table of Contents

1. [Install Required Software](#1-install-required-software)
2. [Clone the Project](#2-clone-the-project)
3. [Install Project Dependencies](#3-install-project-dependencies)
4. [Set Up Ganache (Local Blockchain)](#4-set-up-ganache-local-blockchain)
5. [Compile & Deploy the Smart Contract](#5-compile--deploy-the-smart-contract)
6. [Set Up the Unity Project](#6-set-up-the-unity-project)
7. [Configure Unity for Blockchain](#7-configure-unity-for-blockchain)
8. [Run & Test](#8-run--test)
9. [How to Test on a Real Network (Sepolia Testnet)](#9-how-to-test-on-a-real-network-sepolia-testnet)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Install Required Software

Download and install **all** of the following before anything else.

| Software | Download Link |
|---|---|
| **Node.js** (v18 LTS or newer) | https://nodejs.org/ |
| **Git** | https://git-scm.com/downloads |
| **Ganache** (GUI) | https://trufflesuite.com/ganache/ |
| **Unity Hub** | https://unity.com/download |

### 1.1 Install Node.js

1. Download the **LTS** version from https://nodejs.org/.
2. Run the installer — click **Next** on everything, accept all defaults.
3. Open a terminal (**PowerShell** or **Command Prompt**) and type:
   ```
   node -v
   npm -v
   ```
   You should see version numbers (e.g. `v18.x.x` and `9.x.x`). If you see an error, restart your terminal and try again.

### 1.2 Install Git

1. Download from https://git-scm.com/downloads.
2. Run the installer — accept all defaults.
3. Verify:
   ```
   git --version
   ```

### 1.3 Install Truffle (Smart Contract Tool)

Open a terminal and run:

```
npm install -g truffle
```

After it finishes, verify:

```
truffle version
```

You should see `Truffle v5.x.x` and `Solidity v0.8.x`.

### 1.4 Install Ganache

1. Download from https://trufflesuite.com/ganache/.
2. Run the installer.
3. Open Ganache — you should see a welcome screen. Leave it open for now.

### 1.5 Install Unity

1. Download **Unity Hub** from https://unity.com/download.
2. Open Unity Hub → go to **Installs** → click **Install Editor**.
3. Choose **Unity 2022.3 LTS** (or any newer LTS version).
4. Make sure **Windows Build Support** is checked.
5. Click **Install** and wait for it to finish.

---

## 2. Clone the Project

Open a terminal and navigate to the folder where you want the project, then run:

```
git clone https://github.com/Joshuasoco/blockchainFinal.git
```

Then enter the project folder:

```
cd blockchainFinal
```

> If the repository is private, ask the project owner for access first.

---

## 3. Install Project Dependencies

While inside the `blockchainFinal` folder, run:

```
npm install
```

Wait for it to finish. A `node_modules/` folder will appear — this is normal.

---

## 4. Set Up Ganache (Local Blockchain)

Ganache gives you a **fake blockchain** on your computer — no real money, no internet needed.

### 4.1 Create a workspace

1. Open **Ganache**.
2. Click **QUICKSTART (ETHEREUM)**.
3. You will see 10 accounts, each with **100 ETH** (fake money for testing).

### 4.2 Verify the settings

Click the **gear icon** (⚙) at the top-right → **Server** tab. Confirm these values:

| Setting | Should Be |
|---|---|
| Hostname | `127.0.0.1` |
| Port Number | `7545` |
| Automine | ON |

Then click the **Chain** tab:

| Setting | Should Be |
|---|---|
| Chain ID | `1337` |

Click **Save and Restart** if you changed anything.

### 4.3 Copy a private key

1. On the **ACCOUNTS** page, find the **first** account.
2. Click the **key icon** (🔑) on the right side of that account.
3. A popup shows the **Private Key** — click the copy button.
4. Save this somewhere (Notepad, sticky note) — you will need it in Step 7.

Also copy the **Account Address** (the long `0x...` text next to the key icon) — you will see it used later.

> ⚠️ These are test-only keys. They have no real value.

**Keep Ganache open** — do not close it while working.

---

## 5. Compile & Deploy the Smart Contract

Open a terminal inside the `blockchainFinal` folder and run these commands one at a time:

### 5.1 Compile

```
truffle compile
```

Expected output:
```
Compiling your contracts...
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to ./build/contracts
> Compiled successfully using solc 0.8.19
```

### 5.2 Deploy to Ganache

Make sure **Ganache is running**, then:

```
truffle migrate --network development
```

Expected output:
```
Deploying 'SimpleStorage'
   > transaction hash:    0x...
   > contract address:    0x1234abcd...   ← COPY THIS ADDRESS
   > block number:        ...
   > gas used:            ...
```

**⚠️ Copy the `contract address`** — you will need it in Step 7.

You can also verify in Ganache: click the **TRANSACTIONS** tab — you should see the deployment transaction.

---

## 6. Set Up the Unity Project

### 6.1 Open the project

1. Open **Unity Hub**.
2. Click **Open** (or **Add**) → navigate to the `blockchainFinal/UnityProject/` folder → click **Open** / **Select Folder**.
3. Wait for Unity to import everything (this can take a few minutes the first time).

### 6.2 Install Nethereum (Blockchain library for Unity)

1. In Unity, go to **Edit → Project Settings → Package Manager**.
2. Under **Scoped Registries**, click the **`+`** button.
3. Fill in:

   | Field | Value |
   |---|---|
   | Name | `package.openupm.com` |
   | URL | `https://package.openupm.com` |
   | Scope(s) | `com.nethereum.unity` |

4. Click **Save**.
5. Go to **Window → Package Manager**.
6. Click the **`+`** button (top-left) → **Add package by name…**
7. Name: `com.nethereum.unity`
8. Version: `5.0.0`
9. Click **Add** — wait for Unity to download and compile it.

### 6.3 Install TextMeshPro

1. In Unity: **Window → Package Manager**.
2. Search for **TextMeshPro** → click **Install**.
3. When prompted, click **Import TMP Essential Resources**.

### 6.4 Set API Compatibility Level

1. Go to **Edit → Project Settings → Player**.
2. Expand **Other Settings**.
3. Find **Api Compatibility Level** and set it to **`.NET Standard 2.1`**.

---

## 7. Configure Unity for Blockchain

### 7.1 Update `blockchain_config.json`

Open this file in any text editor:

```
UnityProject/Assets/StreamingAssets/blockchain_config.json
```

Find these two lines and replace the placeholder values:

```json
"contractAddress": "PASTE_YOUR_CONTRACT_ADDRESS_FROM_STEP_5_HERE",
"privateKey": "PASTE_YOUR_GANACHE_PRIVATE_KEY_FROM_STEP_4_HERE"
```

For example:
```json
"contractAddress": "0x1234abcd5678ef...",
"privateKey": "0xabc123def456..."
```

**Do not change** `rpcUrl`, `chainId`, or `abi` — those are already set correctly.

Save the file.

---

## 8. Run & Test

### 8.1 Pre-flight check

Before pressing Play, confirm:

- [ ] Ganache is **running** (you can see 10 accounts).
- [ ] You ran `truffle migrate` successfully (Step 5.2).
- [ ] `blockchain_config.json` has your **contract address** and **private key**.
- [ ] Nethereum package is installed in Unity (Step 6.2).
- [ ] API Compatibility is `.NET Standard 2.1` (Step 6.4).

### 8.2 Run the project

1. In Unity, press the **▶ Play** button.
2. Open the **Console** window (**Window → General → Console**) and look for:
   ```
   [BlockchainConfig] RPC URL : http://127.0.0.1:7545
   [Blockchain] Contract loaded at: 0x...
   [ShopBridge] Shop blockchain bridge ready.
   ```
   If you see these messages, the connection is working.

### 8.3 Test a purchase

1. Open the shop in the game.
2. You should see items with prices and an **"Available"** status.
3. Click the **Buy** button on any item.
4. A **loading spinner** will appear while the transaction processes.
5. After a few seconds, the spinner disappears and the item shows **"Owned ✓"**.
6. The Buy button becomes disabled (you cannot buy again).

### 8.4 Verify in Ganache

1. Switch to the Ganache window.
2. Click the **TRANSACTIONS** tab.
3. You should see new transactions with:
   - **From**: your account address.
   - **To**: your contract address.
   - **Status**: ✅ (success).

### 8.5 Re-open test

1. Close the shop and open it again.
2. The item you purchased should still show **"Owned ✓"** — the data is on the blockchain.

---

## 9. How to Test on a Real Network (Sepolia Testnet)

> Sepolia is a **public test network**. It works exactly like the real Ethereum blockchain but uses **free fake ETH**. No real money is involved.

This section is **optional** — your project already works with Ganache (local). Follow these steps only if you want to prove it works on a real network.

### Step 1 — Create an Infura Account (free)

1. Go to [https://app.infura.io/register](https://app.infura.io/register) and sign up.
2. After logging in, click **Create New API Key**.
3. Select **Web3 API**, name it anything (e.g. `BlockchainFinal`).
4. Click **Create** and copy your **API Key** (looks like: `abc123def456...`).

### Step 2 — Install MetaMask and Get Free Sepolia ETH

1. Install the **MetaMask** browser extension: [https://metamask.io](https://metamask.io).
2. Create a wallet (write down your recovery phrase and keep it safe).
3. In MetaMask, click the network dropdown at the top and switch to **Sepolia Test Network**.
   - If you don't see it, go to **Settings → Advanced → Show test networks** and turn it ON.
4. Copy your MetaMask wallet address (click on it to copy).

#### Get Free Sepolia ETH (Mining/Faucet)

You need free test ETH to pay for transactions on Sepolia. Use any of these faucets:

| Faucet | Link | Notes |
|---|---|---|
| **Google Cloud Faucet** | [https://cloud.google.com/application/web3/faucet/ethereum/sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) | No login required, gives 0.05 ETH |
| **Alchemy Faucet** | [https://www.alchemy.com/faucets/ethereum-sepolia](https://www.alchemy.com/faucets/ethereum-sepolia) | Requires free Alchemy account |
| **Infura Faucet** | [https://www.infura.io/faucet/sepolia](https://www.infura.io/faucet/sepolia) | Requires Infura login (you made one in Step 1) |

1. Open any faucet link above.
2. Paste your **MetaMask wallet address**.
3. Click **Send** / **Request ETH**.
4. Wait about 1 minute — check MetaMask to see the ETH arrive.

> 💡 If one faucet doesn't work or has a long queue, try a different one.

### Step 3 — Export Your MetaMask Private Key

1. In MetaMask, click the **three dots (⋮)** → **Account Details**.
2. Click **Export Private Key**.
3. Enter your MetaMask password.
4. Copy the private key (starts with `0x...`).

> ⚠️ Never share this key publicly, even on a testnet.

### Step 4 — Set the Private Key as an Environment Variable

Open a terminal and run:

**Windows (PowerShell):**
```powershell
$env:ETH_PRIVATE_KEY = "0xYourMetaMaskPrivateKeyHere"
```

**Mac / Linux:**
```bash
export ETH_PRIVATE_KEY="0xYourMetaMaskPrivateKeyHere"
```

> Use the **same terminal window** for the next step — the variable only lasts for that session.

### Step 5 — Deploy the Contract to Sepolia

In the same terminal, run:

```
truffle migrate --network sepolia
```

This takes about 30–60 seconds. You will see:

```
Deploying 'SimpleStorage'
  > transaction hash:   0xabc...
  > contract address:   0xdef...   ← COPY THIS
  > block number:       ...
```

**Copy the contract address.**

### Step 6 — Update `blockchain_config.json` for Sepolia

Open `UnityProject/Assets/StreamingAssets/blockchain_config.json` and change:

```json
"rpcUrl": "https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY",
"chainId": 11155111,
"contractAddress": "0xYourNewSepoliaContractAddress",
"privateKey": "0xYourMetaMaskPrivateKey"
```

Replace:
- `YOUR_INFURA_API_KEY` → the API key from Step 1.
- `0xYourNewSepoliaContractAddress` → the address from Step 5.
- `0xYourMetaMaskPrivateKey` → the key from Step 3.

### Step 7 — Run and Verify Online

1. Press **Play** in Unity.
2. Test a purchase in the shop.
3. Open [https://sepolia.etherscan.io](https://sepolia.etherscan.io) in your browser.
4. Paste your **contract address** in the search bar.
5. You should see your transactions listed on the public blockchain!

> 🎉 This proves the project works on a real blockchain network.

### Switching Back to Ganache

To go back to local testing, change `blockchain_config.json` back to:

```json
"rpcUrl": "http://127.0.0.1:7545",
"chainId": 1337,
"contractAddress": "YOUR_GANACHE_CONTRACT_ADDRESS",
"privateKey": "YOUR_GANACHE_PRIVATE_KEY"
```

---

## 10. Troubleshooting

| Error Message | What It Means | How to Fix |
|---|---|---|
| `Connection refused` | Ganache is not running | Open Ganache and click **QUICKSTART** |
| `Contract not deployed` | Wrong contract address in config | Re-run `truffle migrate --network development` and copy the new address |
| `Nonce too low` | Ganache was restarted after deploying | Click **QUICKSTART** in Ganache again, then re-run `truffle migrate` |
| `Gas exceeds limit` | Gas limit too low | In `blockchain_config.json`, set `gasLimit` to `3000000` |
| `ABI mismatch` | Contract changed but ABI not updated | Run `truffle compile` then `truffle migrate`, copy new ABI from `build/contracts/SimpleStorage.json` |
| `async void not supported` | Wrong API compatibility level | Set to `.NET Standard 2.1` (Step 6.4) |
| `Newtonsoft.Json conflict` | Duplicate DLL in Unity | Delete `Newtonsoft.Json.dll` from `Assets/Plugins/` |
| Items show "Not connected" | `BlockchainManager` missing in scene | Make sure the `BlockchainManager` GameObject exists with `BlockchainConfig` + `BlockchainInteraction` components |
| Spinner stays visible | An error occurred during the transaction | Check the Unity Console for red error messages |

### Still stuck?

1. Open the **Unity Console** (**Window → General → Console**).
2. Look for any **red error messages** — they tell you exactly what went wrong.
3. Double-check that `blockchain_config.json` has the correct `contractAddress` and `privateKey`.
4. Make sure **Ganache is open and running** while Unity is in Play mode.
