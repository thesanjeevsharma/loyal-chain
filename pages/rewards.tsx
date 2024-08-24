// @ts-nocheck
import React from "react";
import { ethers } from "ethers";

import nftAbi from "@/abi/nft.json";

const Rewards = () => {
  const [nftTokenId, setNftTokenId] = React.useState("");
  const [placeAddress, setPlaceAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (isLoading) {
        return;
      }

      setMessage("");
      setIsLoading(true);

      const providerTestnet = new ethers.BrowserProvider(window.ethereum);
      const wallet = await providerTestnet.getSigner();
      const hotelNftContractTestnet = new ethers.Contract(
        placeAddress,
        nftAbi,
        wallet
      );

      const tx = await hotelNftContractTestnet.increaseRewardPoints(
        Number(nftTokenId),
        Number(amount)
      );
      await tx.wait();
      setMessage("Loyalty points added!");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-base-100">
      <form
        className="bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-white-700 text-sm font-bold mb-2"
            htmlFor="nftAddress"
          >
            NFT Token ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nftAddress"
            type="text"
            placeholder="Enter NFT Token ID"
            value={nftTokenId}
            onChange={(e) => setNftTokenId(e.target.value.trim())}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white-700 text-sm font-bold mb-2"
            htmlFor="placeAddress"
          >
            Place Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            id="placeAddress"
            type="text"
            placeholder="Enter Place Address"
            value={placeAddress}
            onChange={(e) => setPlaceAddress(e.target.value.trim())}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Points
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            placeholder="Enter Points"
            value={amount}
            onChange={(e) => setAmount(e.target.value.trim())}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <button className="btn btn-secondary text-white mb-4" type="submit">
            {isLoading ? "Hold on..." : "Add Loyalty Points"}
          </button>
          {!!message && <small className="text-white">{message}</small>}
        </div>
      </form>
    </main>
  );
};

export default Rewards;
