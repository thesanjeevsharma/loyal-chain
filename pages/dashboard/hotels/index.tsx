import React from "react";
import { ethers } from "ethers";

import type { GetServerSideProps } from "next";

import { DashboardLayout } from "@/layouts";
import { HotelCard } from "@/components";
import { Hotel } from "@/types/hotel";
import hotelsAbi from "@/abi/hotels.json";

const Hotels: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => {
  return (
    <main className="bg-base-200 min-h-screen ">
      <div className="container mx-auto py-16">
        <header className="mb-10">
          <h2 className="text-3xl text-bold mb-4">Explore Hotels</h2>
          <p className="text-base text-neutral-content">
            Buy NFTs to enter loyalty programs for Food, Stays, and Taxi
            services
          </p>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.contractAddress}
              id={hotel.id}
              name={hotel.name}
              description={hotel.description}
              minted={90}
              bgImg={hotel.imgUrl}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

Hotels.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = (async () => {
  const providerTestnet = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_BNB_NET
  );
  const contractTestnet = new ethers.Contract(
    process.env.HOTELS_CONTRACT_ADDRESS!,
    hotelsAbi,
    providerTestnet
  );

  const hotelCount = Number(await contractTestnet.getTotalHotels());
  const requests = Array.from({ length: hotelCount }, (_, index) =>
    contractTestnet.getHotelMetadata(index + 1)
  );
  const responses = await Promise.allSettled<Promise<string[]>>(requests);

  const hotels = responses
    // attaching id on promise object, so it doesn't get changed during filtering
    .map((r, i) => {
      r.id = i + 1;
      return r;
    })
    .filter(
      (r): r is PromiseFulfilledResult<string[]> => r.status === "fulfilled"
    )
    .map((r) => {
      const [contractAddress, name, description, imgUrl] = r.value;
      return {
        id: r.id,
        contractAddress,
        name,
        description,
        imgUrl,
      };
    });

  return {
    props: { hotels },
  };
}) satisfies GetServerSideProps<{ hotels: Hotel[] }>;

export default Hotels;
