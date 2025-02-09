// src/services/trustline/TrustlineManager.js
const xrpl = require("xrpl");

class TrustlineManager {
    constructor(serverUrl = "wss://s.altnet.rippletest.net:51233") {
        this.client = new xrpl.Client(serverUrl);
    }

    async createInvestmentTrustline(params) {
        const {
            investmentFirmWallet,
            clientWallet,
            investmentLimit,
            currencyCode = "GBP"
        } = params;

        try {
            await this.client.connect();
            console.log("Connected to XRPL");
            console.log("Setting payment method");
            const trustSetTx = {
                "TransactionType": "TrustSet",
                "Account": clientWallet.address,
                "LimitAmount": {
                    "currency": currencyCode,
                    "issuer": investmentFirmWallet.address,
                    "value": investmentLimit
                }
            };
            console.log("Payment method set");

            console.log("Sending payment");
            const prepared = await this.client.autofill(trustSetTx);
            console.log("--");
            const signed = clientWallet.sign(prepared);
            console.log("---");
            const result = await this.client.submitAndWait(signed.tx_blob);
            console.log("Payement sent");
            console.log(result.result.meta.TransactionResult);
            if (result.result.meta.TransactionResult === "tesSUCCESS") {
                return {
                    success: true,
                    trustline: {
                        client: clientWallet.address,
                        investmentFirm: investmentFirmWallet.address,
                        limit: investmentLimit,
                        currency: currencyCode
                    },
                    transactionHash: result.result.hash
                };
            }

            return {
                success: false,
                error: result.result.meta.TransactionResult
            };

        } catch (error) {
            console.error("Trustline creation failed:", error);
            throw error;
        } finally {
            await this.client.disconnect();
        }
    }

    async verifyTrustline(clientAddress, investmentFirmAddress, currency) {
        try {
            await this.client.connect();
            
            const accountLines = await this.client.request({
                command: "account_lines",
                account: clientAddress,
                peer: investmentFirmAddress
            });

            const trustline = accountLines.result.lines.find(
                line => line.currency === currency
            );

            return {
                exists: !!trustline,
                details: trustline || null
            };

        } catch (error) {
            console.error("Trustline verification failed:", error);
            throw error;
        } finally {
            await this.client.disconnect();
        }
    }
}

module.exports = TrustlineManager;