// src/services/trustline/TrustlineManager.js
const xrpl = require("xrpl");

// Utils
function toHexCurrency(currency) {
    if (/^[A-F0-9]{40}$/.test(currency)) {
        return currency;
    }
    if (currency.length < 3 || currency.length > 6) {
        throw new Error("Currency code must be 3 to 6 characters long.");
    }
    let hex = Buffer.from(currency, "ascii").toString("hex").toUpperCase();
    return hex.padEnd(40, '0'); // Fill with 0 to achieve 160 bits
}

class TrustlineManager {
    constructor(serverUrl = "wss://s.altnet.rippletest.net:51233") {
        this.client = new xrpl.Client(serverUrl);
    }

    async createInvestmentTrustlineTransaction(params) {
        const {
            investmentFirmWallet,
            clientWallet,
            investmentLimit,
            currencyCode = "RLUSD"
        } = params;

        try {
            await this.client.connect();
            console.log("Connected to XRPL");

            console.log("Setting payment method");
            const trustSetTx = {
                "TransactionType": "TrustSet",
                "Account": clientWallet.address,
                "LimitAmount": {
                    "currency": toHexCurrency(currencyCode),
                    "issuer": investmentFirmWallet.address,
                    "value": investmentLimit
                }
            };
            console.log("Payment method set");
            const prepared = await this.client.autofill(trustSetTx);
            console.log("Payment method prepared");
            const signed = clientWallet.sign(prepared);

            console.log("Payment method signed");
            return signed.tx_json; // Return the signed transaction objecect instead of submitting it


        } catch (error) {
            console.error("Trustline creation failed:", error);
            throw error;
        } finally {
            await this.client.disconnect();
        }
    }
}

module.exports = TrustlineManager;