// @ts-nocheck
import React from "react";
import { ethers } from "ethers";
import _ from "lodash";

import { DashboardLayout } from "@/layouts";
import { GetServerSideProps, NextPage } from "next";
import { getHotels } from "@/utils/hotels";

import nftAbi from "@/abi/nft.json";
import { NFT } from "@/types/nft";
import { formatNftResponse } from "@/utils/nfts";
import { NftCard } from "@/components";

type NFTWithHotelName = NFT & {
  hotelName: string;
};

const Collection: React.FC<{
  nftCategories: Record<string, NFTWithHotelName[]>;
}> = ({ nftCategories }) => {
  const categories = Object.keys(nftCategories);

  const [activeTab, setActiveTab] = React.useState<string | null>(
    categories[0]
  );

  return (
    <main className="bg-base-200 min-h-screen">
      <div className="container mx-auto py-16">
        <header className="mb-10">
          <h2 className="text-3xl text-bold mb-4">Your collection</h2>
          <p className="text-base text-neutral-content">
            Show these NFTs at respective hotels to avail benefits
          </p>
        </header>

        {!!categories.length && !!activeTab ? (
          <>
            <section className="mb-6">
              <div role="tablist" className="tabs tabs-lifted">
                {categories.map((tab) => (
                  <a
                    key={tab}
                    role="tab"
                    className={"tab" + (tab === activeTab ? " tab-active" : "")}
                    onClick={() => setActiveTab(tab)}
                  >
                    {_.capitalize(tab)}
                  </a>
                ))}
              </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {nftCategories[activeTab].map((nft) => (
                <NftCard key={nft.id} {...nft}>
                  <div className="flex items-center justify-between">
                    <h6>{nft.points} LP</h6>
                    <small>{nft.hotelName}</small>
                  </div>
                </NftCard>
              ))}
            </section>
          </>
        ) : (
          <h4 className="text-base text-white">No NFTs found for minting.</h4>
        )}
      </div>
    </main>
  );
};

Collection.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = (async (ctx) => {
  const userAddress = ctx.req.cookies["user-address"];

  if (!userAddress) {
    return {
      notFound: true,
    };
  }

  const hotels = await getHotels();

  const sepoliaProviderTestnet = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_SCROLL_NET
  );

  const responses = await Promise.allSettled(
    hotels.map((hotel) => {
      const nftContractInstance = new ethers.Contract(
        hotel.nftContractAddress,
        nftAbi,
        sepoliaProviderTestnet
      );
      return nftContractInstance.getNFTInfoForWallet(userAddress);
    })
  );

  const nftsFromHotels = responses.map((r) => formatNftResponse(r.value));

  // add hotel name in each NFT
  nftsFromHotels.forEach((nftsFromHotel, index) => {
    nftsFromHotel.forEach((nft) => {
      nft.hotelName = hotels[index].name;
    });
  });

  return {
    props: {
      nftCategories: _.groupBy(nftsFromHotels.flat(Infinity), "category"),
    },
  };
}) satisfies GetServerSideProps<{
  nftCategories?: Record<string, NFTWithHotelName[]>;
}>;

export default Collection;
