import React from "react";
import { ethers } from "ethers";
import _ from "lodash";
import Image from "next/image";

import { DashboardLayout } from "@/layouts";
import { Stats } from "@/components";
import hotelsAbi from "@/abi/hotels.json";
import nftAbi from "@/abi/nft.json";

import type { GetServerSideProps } from "next";
import type { Hotel } from "@/types/hotel";
import type { NFT } from "@/types/nft";

const HotelDetails: React.FC<{
  hotel: Hotel;
  mintCount: string;
  nftCategories: Record<string, NFT[]>;
}> = ({ hotel, mintCount, nftCategories }) => {
  const categories = Object.keys(nftCategories);
  const [activeTab, setActiveTab] = React.useState<string | null>(
    categories[0]
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showToast, setShowToast] = React.useState<string>("");

  const handleBuyNFT = async (tokenId: string) => {
    try {
      setIsLoading(true);
      const providerTestnet = new ethers.BrowserProvider(window.ethereum);
      const wallet = await providerTestnet.getSigner();
      const hotelContractTestnet = new ethers.Contract(
        hotel.nftContractAddress,
        nftAbi,
        wallet
      );

      const tx = await hotelContractTestnet.buyNFT(tokenId);
      const result = await tx.wait();
      console.log({ result });
      setShowToast("success");
    } catch (err) {
      console.log(err);
      setShowToast("error");
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowToast(""), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-base-100 flex items-center justify-center py-20">
        <span className="loading loading-ring loading-lg text-secondary"></span>
        <small className="ml-2">Minting...</small>
      </div>
    );
  }

  return (
    <>
      <div className="toast toast-top toast-end z-50">
        {showToast === "success" && (
          <div className="alert alert-success text-white">
            <span>NFT minted successfully.</span>
          </div>
        )}
        {showToast === "error" && (
          <div className="alert alert-error text-white">
            <span>Something went wrong.</span>
          </div>
        )}
      </div>
      <main className="bg-base-200 min-h-screen ">
        <div className="container mx-auto py-16">
          <header className="mb-10">
            <h2 className="text-3xl text-bold mb-4">{hotel.name}</h2>
            <p className="text-base text-neutral-content">
              {hotel.description}
            </p>
          </header>
          <section className="flex flex-col md:flex-row gap-10 mb-10">
            <div className="rounded-md overflow-hidden flex-[2] max-h-[400px]">
              <img
                className="w-full"
                alt={hotel.name}
                src={`${process.env.NEXT_PUBLIC_HOTEL_IMAGE_URL_PREFIX}/${hotel.imgUrl}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              <Stats label="Minted*" value={mintCount} />
              <Stats label="Categories*" value={`${categories.length}`} />
              <Stats label="Total Value" value="10M+" />
              <Stats label="Views" value="1024" />
              <Stats label="Last minted at" value="Aug 22, 2024" />
            </div>
          </section>
          {!!categories.length && !!activeTab ? (
            <>
              <section className="mb-6">
                <div role="tablist" className="tabs tabs-lifted">
                  {categories.map((tab) => (
                    <a
                      key={tab}
                      role="tab"
                      className={
                        "tab" + (tab === activeTab ? " tab-active" : "")
                      }
                      onClick={() => setActiveTab(tab)}
                    >
                      {_.capitalize(tab)}
                    </a>
                  ))}
                </div>
              </section>
              <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {nftCategories[activeTab].map((nft) => (
                  <div
                    key={nft.id}
                    className="overflow-hidden rounded-md relative cursor-pointer"
                  >
                    <Image
                      alt={nft.id}
                      src={`${process.env.NEXT_PUBLIC_HOTEL_IMAGE_URL_PREFIX}/${nft.imgUrl}`}
                      height={300}
                      width={300}
                    />
                    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-gray-950 from-30%">
                      <h4 className="font-semibold text-2xl mb-2">#{nft.id}</h4>
                      <div className="flex items-center justify-between">
                        <h6>{nft.price}ETH</h6>
                        {nft.isForSale ? (
                          <button
                            onClick={() => handleBuyNFT(nft.id)}
                            className="btn btn-sm btn-secondary font-medium text-white"
                          >
                            Mint
                          </button>
                        ) : (
                          <button className="btn btn-sm btn-disabled">
                            Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </>
          ) : (
            <h4 className="text-base text-white">No NFTs found for minting.</h4>
          )}
        </div>
      </main>
    </>
  );
};

HotelDetails.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = (async (ctx) => {
  const bnbProviderTestnet = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_BNB_NET
  );
  const hotelsContractTestnet = new ethers.Contract(
    process.env.HOTELS_CONTRACT_ADDRESS!,
    hotelsAbi,
    bnbProviderTestnet
  );

  const result = await hotelsContractTestnet.getHotelMetadata(
    Number(ctx.params.id)
  );

  if (!result) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  const [nftContractAddress, name, description, imgUrl, hotelOwnerAddress] =
    result;

  const hotel = {
    id: Number(ctx.params.id),
    nftContractAddress,
    name,
    description,
    imgUrl,
  };

  console.log({ hotel });

  const seploiaProviderTestnet = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_SCROLL_NET
  );

  const hotelNftContractTestnet = new ethers.Contract(
    nftContractAddress,
    nftAbi,
    seploiaProviderTestnet
  );
  const counterResult = Number(
    await hotelNftContractTestnet.getTokenIdCounter()
  );

  const nftsResponse = await hotelNftContractTestnet.getNFTInfoForWallet(
    hotelOwnerAddress
  );

  const [firstArr] = nftsResponse;
  const nfts = [];

  if (firstArr.length) {
    for (let i = 0; i < firstArr.length; i++) {
      nfts.push({});
    }

    nftsResponse.forEach(() => {
      for (let i = 0; i < firstArr.length; i++) {
        nfts[i].id = Number(nftsResponse[0][i]);
        nfts[i].category = nftsResponse[1][i];
        nfts[i].reward = Number(nftsResponse[2][i]);
        nfts[i].imgUrl = nftsResponse[3][i];
        nfts[i].isForSale = nftsResponse[4][i];
        nfts[i].price = Number(nftsResponse[5][i]) * Math.pow(10, -8);
      }
    });
  }

  console.log(nfts, hotel, counterResult, _.groupBy(nfts, "category"));

  return {
    props: {
      hotel,
      mintCount: counterResult.toString(),
      nftCategories: _.groupBy(nfts, "category"),
    },
  };
}) satisfies GetServerSideProps<{
  notFound?: boolean;
  hotel?: Hotel;
  mintCount?: string;
  nftCategories?: Record<string, NFT[]>;
}>;

export default HotelDetails;
