// @ts-nocheck
import React from "react";

import type { GetServerSideProps } from "next";

import { DashboardLayout } from "@/layouts";
import { HotelCard } from "@/components";
import { Hotel } from "@/types/hotel";
import { getHotels } from "@/utils/hotels";

const Hotels: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => {
  return (
    <main className="bg-base-200 min-h-screen ">
      <div className="container mx-auto py-16">
        <header className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Explore Places</h2>
          <p className="text-base text-neutral-content">
            Buy NFTs to enter loyalty programs for Food, Drinks, Rooms, Taxi
            services and more
          </p>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.nftContractAddress}
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
  const hotels = await getHotels();

  return {
    props: { hotels },
  };
}) satisfies GetServerSideProps<{ hotels: Hotel[] }>;

export default Hotels;
