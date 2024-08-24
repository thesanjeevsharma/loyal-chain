import React from "react";

import { DashboardLayout } from "@/layouts";
import { ExploreHotelsTile, NftTile } from "@/components";
import Link from "next/link";

const DashboardHome = () => {
  return (
    <main className="bg-base-200 min-h-screen ">
      <div className="container mx-auto py-16">
        <header className="mb-16">
          <div className="grid grid-cols-2 gap-6">
            <Link href="/dashboard/collection">
              <NftTile />
            </Link>
            <Link href="/dashboard/hotels">
              <ExploreHotelsTile />
            </Link>
          </div>
        </header>
      </div>
    </main>
  );
};

DashboardHome.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardHome;
