# Setup Guide — Blockchain Final Project

Follow every step in order and you will have the project running on your laptop.

---

## What You Need to Install First

Install these four tools **before** doing anything else. If you already have one installed, skip it.

| Tool | Version | Download Link |
|---|---|---|
| **Node.js** | v18 or higher | https://nodejs.org/ (choose LTS) |
| **Truffle** | v5.x | installed via npm (see below) |
| **Ganache** | latest | https://trufflesuite.com/ganache/ |
| **Unity** | 2022.3 LTS | https://unity.com/download |

### Install Truffle (after Node.js is installed)

Open **PowerShell** or **Command Prompt** and run:

```bash
npm install -g truffle
```

Verify it worked:

```bash
truffle version
node -v
```

You should see something like:
```
Truffle v5.11.x
Node v18.x.x
```

---

## Step 1 — Clone the Repository

Open **PowerShell** or **Command Prompt**, navigate to wherever you want to save the project, then run:

```bash
git clone https://github.com/Anuwbies/Day-One.git
```

> This automatically creates a `Day-One/` folder for you — **do NOT create a folder manually**.

After cloning, enter the folder:

```bash
cd Day-One
```

---

## Step 2 — Install Node Dependencies

You should now be inside the `Day-One/` folder in your terminal. Run:

```bash
npm install
```

This installs Truffle and all project dependencies into `node_modules/`. Wait for it to finish (can take 1–2 minutes).

---

## Step 3 — Set Up Ganache (Local Blockchain)

Ganache is a fake local Ethereum blockchain that runs only on your machine.

### 3.1 Open Ganache

Launch the **Ganache** app you installed. Click **QUICKSTART (Ethereum)**.

You will see 10 accounts, each with 100 fake ETH — this is normal.

### 3.2 Check the port

In Ganache, click the **⚙ Settings** (gear icon, top right) → **SERVER** tab.

Make sure:

| Setting | Value |
|---|---|
| **Hostname** | `127.0.0.1` |
| **Port Number** | `7545` |
| **Network ID** | `1337` |

If they are different, change them to match and click **SAVE AND RESTART**.

> ⚠️ **Keep Ganache open** the entire time you are working on this project. If you close it, Unity can't connect.

### 3.3 Copy a private key

You need a private key from Ganache to sign transactions. Here's how:

1. In Ganache, click the **🔑 key icon** on the right side of **any account** (Account #1 is fine).
2. Copy the **Private Key** shown (it starts with `0x...`).
3. **Save it** — you will need it in Step 5.

---

## ⚙️ Step 4 — Compile and Deploy the Smart Contract

Still inside the `Day-One/` folder in your terminal:

### 4.1 Compile

```bash
npm run compile
```

Expected output:
```
Compiling your contracts...
> Compiled successfully
```

### 4.2 Deploy (Migrate)

```bash
npm run migrate
```

Expected output (yours will have different addresses):
```
Deploying 'SimpleStorage'
  > transaction hash:    0x...
  > contract address:    0xABC123...    ← COPY THIS ADDRESS
  > account:             0x...
```

> ⚠️ **Copy the `contract address`** — you need it in the next step.

---

## Step 5 — Update `blockchain_config.json`

Open this file in any text editor (Notepad is fine):

```
Day-One/UnityProject/Assets/StreamingAssets/blockchain_config.json
```

Replace **only these two values**:

```json
"contractAddress": "0xPASTE_YOUR_CONTRACT_ADDRESS_HERE",
"privateKey":      "0xPASTE_YOUR_GANACHE_PRIVATE_KEY_HERE"
```

**Leave everything else exactly as it is.** The file should look like this when done:

```json
{
    "rpcUrl": "http://127.0.0.1:7545",
    "chainId": 1337,
    "contractAddress": "0xYourNewContractAddress",
    "privateKey": "0xYourGanachePrivateKey",
    "gasLimit": 3000000,
    "abi": [ ... ]
}
```

> ✅ **Why?** Every time Ganache deploys a contract it gets a brand new address. The address in the repo belongs to Joshua's machine — it won't work on yours.

---

## 🎮 Step 6 — Open the Unity Project

1. Open **Unity Hub**.
2. Click **Add project from disk**.
3. Navigate to `Day-One/UnityProject/` and select it.
4. Open the project (Unity 2022.3 LTS recommended).
5. Wait for Unity to finish importing assets.

### 6.1 Verify Nethereum is installed

1. Go to **Window → Package Manager**.
2. Look for **`com.nethereum.unity`** in the list.
3. If it is **missing**, install it:
   - Click **`+`** → **Add package by name…**
   - Name: `com.nethereum.unity`
   - Version: `5.0.0`
   - Click **Add** and wait.

### 6.2 Verify API Compatibility Level

1. Go to **Edit → Project Settings → Player → Other Settings**.
2. Check that **Api Compatibility Level** is set to **`.NET Standard 2.1`**.
3. If not, change it and let Unity recompile.

---

## ▶️ Step 7 — Run and Test

1. Make sure **Ganache is still open** (from Step 3).
2. Press **▶ Play** in Unity.
3. Open the **Console** window (Window → General → Console).

You should see these messages in the Console:
```
[BlockchainConfig] RPC URL : http://127.0.0.1:7545
[Blockchain] Connected to Ganache. Chain ID: 1337
[Blockchain] Contract loaded at: 0x...
[ShopBridge] Shop blockchain bridge ready.
```

4. Open the in-game shop and click **Buy** on any item.
5. Switch to Ganache → **TRANSACTIONS** tab — you should see new transactions appear.

---

## ❌ Common Errors and Fixes

| Error in Unity Console | Most Likely Cause | Fix |
|---|---|---|
| `Connection refused` | Ganache is not running | Start Ganache first, then press Play |
| `Contract not deployed` | Wrong contract address in config | Re-run `npm run migrate`, copy new address |
| `Nonce too low` | Ganache was restarted without resetting | Click **QUICKSTART** in Ganache to fully reset |
| `ABI mismatch` | Contract changed but ABI not updated | Re-run `npm run compile` + `npm run migrate` |
| `ShopItemCard shows "Not connected"` | Config values are wrong | Double-check `contractAddress` and `privateKey` |
| Spinner stays visible forever | An exception occurred during the transaction | Check Unity Console for red error messages |

---

## 📋 Quick Reference Checklist

Use this to make sure you haven't missed anything:

```
[ ] Node.js v18+ installed           → node -v
[ ] Truffle installed globally        → truffle version
[ ] Ganache installed and OPEN        → see 10 accounts
[ ] Ganache port = 7545, ID = 1337   → Settings → Server tab
[ ] npm install completed             → node_modules/ folder exists
[ ] npm run compile succeeded         → no red errors
[ ] npm run migrate succeeded         → contract address printed
[ ] blockchain_config.json updated    → contractAddress + privateKey replaced
[ ] Unity project opened              → UnityProject/ folder
[ ] Nethereum installed in UPM        → com.nethereum.unity v5.0.0
[ ] API Compatibility = .NET Std 2.1  → Project Settings → Player
[ ] Press Play in Unity               → Console shows "[Blockchain] Connected"
[ ] Click Buy in shop                 → Ganache shows a new transaction
```

**If every box is checked, the project is running correctly on your machine! 🎉**

---
