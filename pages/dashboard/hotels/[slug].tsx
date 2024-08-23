import React from "react";

import { DashboardLayout } from "@/layouts";
import { Stats } from "@/components";
import Image from "next/image";

type Tab = "ALL" | "FOOD" | "STAY" | "TAXI";

const tabs: { label: string; value: Tab }[] = [
  { label: "All", value: "ALL" },
  { label: "Food", value: "FOOD" },
  { label: "Stay", value: "STAY" },
  { label: "Taxi", value: "TAXI" },
];

const HotelDetails = () => {
  const hotel = {
    name: "The Leela Palace",
    description: "Luxury at it's finest",
    imgUrl: "/hotels/leela.jpg",
    minted: 20,
  };

  const nfts = [
    {
      id: 1,
      name: "Breakfast",
      price: 20,
      imgUrl: "https://picsum.photos/300/300",
    },
    {
      id: 1,
      name: "All Meals",
      price: 50,
      imgUrl: "https://picsum.photos/300/300",
    },
  ];

  const [activeTab, setActiveTab] = React.useState<Tab>("ALL");

  return (
    <main className="bg-base-200 min-h-screen ">
      <div className="container mx-auto py-16">
        <header className="mb-10">
          <h2 className="text-3xl text-bold mb-4">{hotel.name}</h2>
          <p className="text-base text-neutral-content">{hotel.description}</p>
        </header>
        <section className="flex flex-col md:flex-row gap-10 mb-10">
          <div className="rounded-md overflow-hidden flex-[2] max-h-[400px]">
            <img className="w-full" alt={hotel.name} src={hotel.imgUrl} />
          </div>
          <div className="grid grid-cols-2 gap-2 flex-1">
            <Stats label="Minted" value="20+" />
            <Stats label="Categories" value="3" />
            <Stats label="Total Value" value="10M+" />
            <Stats label="Views" value="1024" />
            <Stats label="Last minted at" value="Aug 22, 2024" />
          </div>
        </section>
        <section className="mb-6">
          <div role="tablist" className="tabs tabs-lifted">
            {tabs.map((tab) => (
              <a
                key={tab.value}
                role="tab"
                className={
                  "tab" + (tab.value === activeTab ? " tab-active" : "")
                }
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="overflow-hidden rounded-md relative cursor-pointer"
            >
              <Image alt={nft.name} src={nft.imgUrl} height={300} width={300} />
              <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-gray-950 from-30%">
                <h4 className="font-semibold text-2xl mb-2">{nft.name}</h4>
                <div className="flex items-center justify-between">
                  <h6>{nft.price}ETH</h6>
                  <button className="btn btn-sm btn-secondary font-medium text-white">
                    Mint
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

HotelDetails.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HotelDetails;
