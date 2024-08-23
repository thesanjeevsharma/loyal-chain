import React from "react";

import { DashboardLayout } from "@/layouts";
import { HotelCard } from "@/components";
import Link from "next/link";

const Hotels = () => {
  return (
    <main className="bg-base-200 min-h-screen ">
      <div className="container mx-auto py-16">
        <header className="mb-10">
          <h2 className="text-3xl text-bold mb-4">Explore Hotels</h2>
          <p className="text-base text-neutral-content">Find your next stay</p>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HotelCard
            name="The Leela Palace"
            description="A taste of India's royal luxuries."
            minted={90}
            bgImg="/hotels/taj.jpg"
          />
          <HotelCard
            name="The Leela Palace"
            description="Luxury at it's finest."
            minted={10}
            bgImg="/hotels/leela.jpg"
          />
          <HotelCard
            name="Henn Na"
            description="SEA's largest hotel chain"
            minted={150}
            bgImg="/hotels/henn-na.webp"
          />
          <HotelCard
            name="Bali International"
            description="Your dream getaway in Bali"
            minted={250}
            bgImg="/hotels/bali-international.jpg"
          />
        </section>
      </div>
    </main>
  );
};

Hotels.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Hotels;
