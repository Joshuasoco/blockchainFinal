# Setup Guide

This is the fastest way to run the project.

## 1. Install Requirements

- Node.js 18+ (LTS): https://nodejs.org/
- Ganache: https://trufflesuite.com/ganache/
- Unity 2022.3 LTS: https://unity.com/download

Install Truffle globally:

```bash
npm install -g truffle
```

Check versions:

```bash
node -v
truffle version
```

## 2. Install Project Dependencies

From the project root (`blockchainFinal`):

```bash
npm install
```

## 3. Start Ganache

1. Open Ganache and run `Quickstart (Ethereum)`.
2. Confirm:
- Host: `127.0.0.1`
- Port: `7545`
- Network ID / Chain ID: `1337`
3. Copy one account private key (you will need it below).

Keep Ganache open while running Unity.

## 4. Compile and Deploy Contract

From project root:

```bash
npm run compile
npm run migrate
```

Copy the deployed contract address printed by `migrate`.

## 5. Update Unity Blockchain Config

Edit:
`UnityProject/Assets/StreamingAssets/blockchain_config.json`

Set:

```json
"contractAddress": "0xYOUR_DEPLOYED_ADDRESS",
"privateKey": "0xYOUR_GANACHE_PRIVATE_KEY"
```

Do not change `rpcUrl` or `chainId` unless your Ganache settings differ.

## 6. Open Unity Project

1. Open Unity Hub.
2. Add/open folder: `UnityProject/`.
3. Wait for import to finish.
4. Verify package `com.nethereum.unity` is installed.
5. Verify API Compatibility Level is `.NET Standard 2.1`.

## 7. Run

1. Ensure Ganache is still running.
2. Press Play in Unity.
3. Test a shop purchase.
4. Confirm a transaction appears in Ganache.

## Quick Troubleshooting

- `Connection refused`: Ganache is not running or wrong port.
- `Contract not deployed`: Re-run `npm run migrate` and update contract address.
- `ABI mismatch`: Re-run `npm run compile` then `npm run migrate`.
- `Not connected`: Check `contractAddress` and `privateKey` in `blockchain_config.json`.
