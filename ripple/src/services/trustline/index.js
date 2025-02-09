// src/services/trustline/index.js
const TrustlineManager = require('./TrustlineManager');
const TrustlineService = require('./TrustlineService');

module.exports = {
    TrustlineManager,
    setupInvestmentRelationship: TrustlineService.setupInvestmentRelationship
};