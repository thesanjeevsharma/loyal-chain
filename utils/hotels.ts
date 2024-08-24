// @ts-nocheck
import { ethers } from "ethers";

import hotelsAbi from "@/abi/hotels.json";

export const getHotels = async () => {
  const providerTestnet = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_BNB_NET
  );
  const contractTestnet = new ethers.Contract(
    process.env.ORG_CONTRACT_ADDRESS!,
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
      const [nftContractAddress, name, description, imgUrl] = r.value;
      return {
        id: r.id,
        nftContractAddress,
        name,
        description,
        imgUrl,
      };
    });

  return hotels;
};
