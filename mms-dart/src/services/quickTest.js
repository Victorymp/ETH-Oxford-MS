const xrpl = require("xrpl");
const TrustlineManager = require('./TrustlineManager.js');
const { mintToken } = require('./estate.js');

const TESTNET_URL = "wss://s.altnet.rippletest.net:51233";

export const test = async () => {
    let client;
    try {
        // Create wallets
        client = new xrpl.Client(TESTNET_URL);
        await client.connect();
        
        console.log("Creating test wallets...");
        const investmentFirm = xrpl.Wallet.generate();
        const investor = xrpl.Wallet.generate();
        
        // Fund the wallets
        console.log("\nFunding the wallets...");
        const fundResult = await client.fundWallet({ wallet: investmentFirm });
        const investorFund = await client.fundWallet({ wallet: investor });
        
        console.log(`Investment Firm Address: ${investmentFirm.address}`);
        console.log(`Investor Address: ${investor.address}`);

        // Ensure the wallets are funded
        const investmentFirmBalance = await client.getXrpBalance(investmentFirm.address);
        const investorBalance = await client.getXrpBalance(investor.address);

        console.log(`Investment Firm Balance: ${investmentFirmBalance} XRP`);
        console.log(`Investor Balance: ${investorBalance} XRP`);

        // Test Trustline Creation
        console.log("\nTesting Trustline Creation...");
        const trustlineManager = new TrustlineManager(TESTNET_URL);
        const trustlineResult = await trustlineManager.createInvestmentTrustlineTransaction({
            investmentFirmWallet: investmentFirm,
            clientWallet: investor,
            investmentLimit: "1000000",
            currencyCode: "RLUSD"
        });
        
        console.log("Trustline Result:", trustlineResult);

        // Mint Token
        console.log("\nMinting Token...");
        const tokenResult = await mintToken();
        console.log("Token Result:", tokenResult);

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        if (client) {
            client.disconnect();    
        }
    }
}

test();