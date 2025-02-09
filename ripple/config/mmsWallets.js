// src/config/mmsWallets.js

/**
 * Test Wallet Configuration
 * 
 * This file contains the wallet credentials used for testing our XRPL integration.
 * These wallets should be specifically created for testing purposes and funded
 * on the XRPL testnet.
 * 
 * Important Security Notes:
 * - Never use real mainnet wallets in this file
 * - Keep test seeds secure even though they're on testnet
 * - Don't commit real seeds to version control
 */

module.exports = {
    // Primary investment firm wallet for executing investment transactions
    investmentFirm: {
        address: "rPM6w2QktazAgwARCNyeAg9zrF3YtSPz5g",
        seed: process.env.INVESTMENT_FIRM_SEED,
        initialBalance: "100", // Initial funding amount in XRP
        tag: "Investment-Firm-Main"
    },

    // Client wallet with RLUSD trustline capability
    client: {
        address: "rs4ReVmgGvLPxrsmaEQgagPATf6HpH1AA4",
        seed: process.env.CLIENT_SEED,
        initialBalance: "100", // Initial funding amount in XRP
        tag: "RLUSD-Enabled-Client",
        // This wallet has an approved trustline for RLUSD
        // Transaction Hash: FF9D0DBD713BF72B4E36408D6F1F5BC01DF1CC806AFAA919EA261916BC5718B6
    }
};