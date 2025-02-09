// src/services/trustline/trustlineService.js
// 
const TrustlineManager = require('./TrustlineManager');

async function setupInvestmentRelationship(aiRecommendation, firmWallet, clientWallet) {
    const trustlineManager = new TrustlineManager();
    
    try {
        const trustlineResult = await trustlineManager.createInvestmentTrustline({
            investmentFirmWallet: firmWallet,
            clientWallet: clientWallet,
            investmentLimit: aiRecommendation.recommendedInvestmentLimit,
            currencyCode: "REAI"
        });

        return trustlineResult;
    } catch (error) {
        console.error("Failed to setup investment relationship:", error);
        throw error;
    }
}

module.exports = {
    setupInvestmentRelationship
};