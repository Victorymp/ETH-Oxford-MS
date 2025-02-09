const xrpl = require("xrpl");
const TrustlineManager = require('../services/trustline/TrustlineManager');
const { mintToken } = require('../../token/estate');


const TESTNET_URL = "wss://s.altnet.rippletest.net:51233";

async function test() {
    try {
        // Create wallets
        const client = new xrpl.Client(TESTNET_URL);
        await client.connect();
        
        console.log("Creating test wallets...");
        const investmentFirm = xrpl.Wallet.generate();
        const investor = xrpl.Wallet.generate();
        
        // Fund the wallets
        console.log("\nFunding the wallets...");
        const fundResult = await client.fundWallet();
        const investorFund = await client.fundWallet();
        
        console.log(`Investment Firm Address: ${investmentFirm.address}`);
        console.log(`Investor Address: ${investor.address}`);

        // ensure the wallets are funded
        const investmentFirmBalance = await client.getXrpBalance(investmentFirm.address);
        const investorBalance = await client.getXrpBalance(investor.address);

        console.log(`Investment Firm Balance: ${investmentFirmBalance} XRP`);
        console.log(`Investor Balance: ${investorBalance} XRP`);

        // Test Trustline Creation
        console.log("\nTesting Trustline Creation...");
        const trustlineManager = new TrustlineManager(TESTNET_URL);
        const trustlineResult = await trustlineManager.createInvestmentTrustline({
            investmentFirmWallet: investmentFirm,
            clientWallet: investor,
            investmentLimit: "1000000",
            currencyCode: "GBP" // Hex for REAI
        });
        
        console.log("Trustline Result:", trustlineResult);

        //mint token
        console.log("\nMinting Token...");
        const tokenResult = await mintToken();
        console.log("Token Result:", tokenResult);

        // Create Batch transaction
        console.log("\nCreating Batch transaction...");
        const batchTransaction = {
            "TransactionType": "Batch",
            "Account": investmentFirm.address,
            "Batch": [
                trustlineTransaction,
                mintTokenTransaction
            ]
        };

        // Sign and submit the Batch transaction
        console.log("\nSigning and submitting Batch transaction...");
        const signedBatchTransaction = investmentFirm.sign(batchTransaction);
        const batchResult = await client.submitAndWait(signedBatchTransaction.tx_blob);

        console.log("Batch Transaction Result:", batchResult);


    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        client.disconnect();
    }
}

test();