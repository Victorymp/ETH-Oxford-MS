# Real Estate AI Portfolio Manager REAI powered by MMS

A sophisticated real estate AI agent for easy portfolio management. Leverages AI for market analysis according to the top news titles in a chosen location, XRP for investment channels. Built for the ETH Oxford Hackathon 2025.

## 🏗️ Project Overview

This platform revolutionizes real estate investment by combining:
- AI-powered market analysis using real-time news data
- Secure investment channels through XRP's trustline system
- Interactive city-based property analysis
- Political sentiment analysis for market insights

## 🚀 Key Features

### News Analysis & AI Agent
The system aggregates news from multiple sources (BBC, CNN, Guardian) for selected UK cities and processes them through our AI agent to:
- Extract market trends and property valuations
- Analyze political impact on real estate markets
- Generate investment recommendations
- Calculate area desirability scores

### Ripple Investment Channel
Implements a secure investment relationship system using XRP's trustline feature:
- Creates trustlines between investors and investment firms
- Manages investment limits and token issuance
- Processes both RLUSD and custom token payments

## 🛠️ Technical Architecture

### Frontend Components
- Location selector with search functionality
- Political scale analyzer
- News extraction system
- AI analysis dashboard
- XRP investment channel setup interface

### Backend Services
```
src/
├── services/
│   ├── trustline/          # XRP trustline management
│   ├── ai/                 # AI recommendation engine
│   ├── payment/            # Payment processing
│   └── storage/            # BNB Greenfield integration
```

## 🔧 Setup & Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
```bash
XRPL_NETWORK=testnet
NEWS_API_KEY=your_key
```
4. Start the development server:
```bash
npm start
```

## 🎮 Usage Guide

1. **City Selection**
   - Use the Location dropdown to select target cities
   - Filter cities using the search functionality

2. **News Analysis**
   - Click "Start Extraction" to gather news data
   - Articles are processed in real-time

3. **Market Analysis**
   - Adjust the political scale slider to filter analysis
   - Click "Desirability Analysis" to generate AI insights
   - View comprehensive market reports

4. **Investment Setup**
   - Agent clicks "Setup Investment Channel" to create XRP trustlines using RLUSD
   - Setting up the investment both sets up the payment method in the trustline manager and mints the estate token of the AI agents output 
   - Monitor transaction status in real-time
   - Verify trustline creation on the ripple ledeger

## Marston Microsystems Team
Victory Mpokosa : 
- https://github.com/Victorymp
- https://www.linkedin.com/in/victory-mpokosa/

Yankho Mpokosa : 
- https://github.com/yankhono1
- https://www.linkedin.com/in/yankho-m/


## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## 🏆 Hackathon Notes

This project aims to win the following bounties at ETH Oxford 2025:

- XRP Integration Prize: Creating innovative investment channels using XRPL by leveraging AI

## 📄 License

[MIT License](LICENSE)

## 🙏 Acknowledgments

- ETH Oxford Hackathon organizers
- XRPL documentation and community
- News API providers