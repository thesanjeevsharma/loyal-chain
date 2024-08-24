# **NFT Loyalty Program Platform**

## **Overview**
Our platform revolutionizes loyalty programs for cafes, restaurants, and hotels by leveraging NFTs. Businesses can register and issue NFT collections, which users can purchase to earn loyalty points. These points unlock exclusive offers and can be traded for monetary value.

## **Problem Statement**
Traditional loyalty programs are fragmented and often lack transparency and flexibility. Users are forced to manage multiple cards or apps, and the rewards are often limited to specific businesses. Our platform aims to unify these programs into a single, user-friendly system that enhances customer engagement and retention.

## **Solution**
We provide a decentralized platform where:
- **Businesses**: Register and create NFT collections representing their loyalty programs.
- **Users**: Purchase NFTs to earn loyalty points. These points are tied to the NFT token ID in our contract, allowing users to redeem offers or trade their assets.

### **Key Features**
- **Unified Platform**: All participating businesses are listed, making it easy for users to discover new loyalty opportunities.
- **NFT-Based System**: NFTs represent loyalty points, offering transparency and security.
- **Flexible Rewards**: Users can redeem points for offers or trade their NFTs for money.
- **Smart Contracts**: All transactions are securely managed by smart contracts, ensuring fairness and trust.

## Software Architecture
```mermaid
graph TD;
A[Company] -->|Registers| B[Registry Contract];
B -->|Stores| C[Information];
C -->|Includes| D[NFT Collection Address];
E[User] -->|Views| B;
E -->|Buys NFT| F[RewardNFT Contract];
F -->|Mints| G[Loyalty NFT];
G -->|Mapped to| H[Reward Points];
E -->|Visits Place| I[Increase Loyalty];
I -->|Updates| H;
J[Hotel Owner] -->|Mints NFTs| F;
J -->|Sets Price| F;
E -->|Views Own NFTs| K[NFT Information];
K -->|Includes| L[Token ID];
K -->|Includes| M[Category];
K -->|Includes| N[Reward Points];
K -->|Includes| O[For Sale Status];
K -->|Includes| P[Price];
style B fill:#f9f,stroke:#333,stroke-width:2px;
style F fill:#bbf,stroke:#333,stroke-width:2px;
```

## **Technology Stack**
- **Frontend**: Next.js
- **Blockchain**: Ethereum, Solidity, BNB Greenfield
- **Smart Contracts**: ERC-721 standard for NFTs
- **Deployment**: Vercel

## **How It Works**
1. **Business Registration**: Cafes, restaurants, and hotels register on our platform via contract and create their NFT collections.
2. **User Interaction**: Users browse the platform, purchase NFTs, and earn loyalty points mapped to the NFT token ID.
3. **Redeem & Trade**: Users can redeem points for offers or trade their NFTs on supported marketplaces.

## **Setup Instructions**
1. Clone the repository: `git clone https://github.com/thesanjeevsharma/loyal-chain`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Deploy the smart contracts: Follow the instructions in the `https://github.com/thesanjeevsharma/loyal-chain/tree/main/web3-link`.

## **Bounty Usage**
1. Scroll Contracts - [0x4B5Cf880D79360F8f39376d7A456Fe1c3f109EBD](https://sepolia.scrollscan.com/address/0x4B5Cf880D79360F8f39376d7A456Fe1c3f109EBD)
2. Binance Contract - [0x6BA806b09539b6E37e7A7C41017f563BA43562De](https://testnet.bscscan.com/address/0x6BA806b09539b6E37e7A7C41017f563BA43562De)
3. BNB Greenfield - All Assets are stored in greenfield [example](https://gnfd-testnet-sp1.bnbchain.org/view/sakura-3stays/nft6.webp)
4. ENS Usage - [Line 21-38](https://github.com/thesanjeevsharma/loyal-chain/blob/main/components/NavBar/index.tsx)

## **Future Enhancements**
- Integration with additional blockchain networks.
- Mobile app development for on-the-go access.
- AI-powered recommendation engine for personalized offers.

## **Contributors**
- [Sanjeev Sharma](https://github.com/thesanjeevsharma)
- [Ravish Sharma](https://github.com/ravish1729)

## **License**
This project is licensed under the MIT License.

## **Contact**
For any inquiries, please contact us at [https://thesanjeevsharma.vercel.app](https://thesanjeevsharma.vercel.app).
