// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardNFT is ERC721, Ownable {
    // Mapping from token ID to reward points
    mapping(uint256 => uint256) private _rewardPoints;
    mapping(uint256 => string) private _tokenCategories;
    mapping(uint256 => string) private _tokenPath;
    mapping(uint256 => bool) private _tokenForSale;
    mapping(uint256 => uint256) private _tokenPrices;

    struct NFTInfo {
        uint256 tokenId;
        string category;
        uint256 rewardPoints;
        string tokenPath;
        bool forSale;
        uint256 price;
    }

    // Counter for token IDs
    uint256 private _tokenIdCounter;

    constructor(string memory name, string memory symbol, address initialOwner) ERC721(name, symbol) Ownable(initialOwner) {
        _tokenIdCounter = 0;
    }

    // Function to mint a new NFT
    function mint(uint256 price, string memory category, string memory tokenPath) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(owner(), tokenId);
        _rewardPoints[tokenId] = 0; // Initialize reward points to 0
        _tokenCategories[tokenId] = category;
        _tokenPath[tokenId] = tokenPath;
        _tokenForSale[tokenId] = true;
        _tokenPrices[tokenId] = price;
        _tokenIdCounter++;
    }

    // Function for users to buy NFTs
    function buyNFT(uint256 tokenId) public payable {
        require(_tokenForSale[tokenId], "Token is not for sale");
        // require(msg.value >= _tokenPrices[tokenId], "Insufficient payment");
        address owner = ownerOf(tokenId);
        _transfer(owner, msg.sender, tokenId);
        _tokenForSale[tokenId] = false;
        payable(owner).transfer(msg.value);
    }

    // Function to check if a token is for sale
    function isTokenForSale(uint256 tokenId) public view returns (bool) {
        return _tokenForSale[tokenId];
    }

    // Function to get the price of a token
    function getTokenPrice(uint256 tokenId) public view returns (uint256) {
        return _tokenPrices[tokenId];
    }

    // Function to increase reward points for a token
    function increaseRewardPoints(uint256 tokenId, uint256 amount) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        _rewardPoints[tokenId] += amount;
    }

    // Function to get reward points for a token
    function getRewardPoints(uint256 tokenId) public view returns (uint256) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _rewardPoints[tokenId];
    }

    function getCategory(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _tokenCategories[tokenId];
    }

    function getTokenIdCounter() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // New function to get all NFT information for a wallet address
    // New function to get all NFT information for a wallet address
    function getNFTInfoForWallet(address wallet) public view returns (NFTInfo[] memory) {
        uint256 balance = balanceOf(wallet);
        NFTInfo[] memory nftInfos = new NFTInfo[](balance);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (_ownerOf(i) == wallet) {
                nftInfos[currentIndex] = NFTInfo({
                    tokenId: i,
                    category: _tokenCategories[i],
                    rewardPoints: _rewardPoints[i],
                    tokenPath: _tokenPath[i],
                    forSale: _tokenForSale[i],
                    price: _tokenPrices[i]
                });
                currentIndex++;
            }
        }

        return nftInfos;
    }
}
