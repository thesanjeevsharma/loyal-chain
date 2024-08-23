import React from "react";

const NftTile = () => {
  return (
    <div className="card bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
      <div className="card-body">
        <h2 className="card-title">Your NFT Collection</h2>
        <p className="min-h-[5ch]">
          These are NFTs that you&apos;ll collected by staying at hotels or
          traded with other stayers.
        </p>
      </div>
    </div>
  );
};

export default NftTile;
