import { NFT } from "@/types/nft";

export const formatNftResponse = (response: any[][]): NFT[] => {
  const nfts = [];

  response.forEach((record) => {
    const [id, category, points, imgUrl, isForSale, price] = record;

    nfts.push({
      id: Number(id),
      category,
      points: Number(points),
      imgUrl,
      isForSale,
      price: Number(price) * Math.pow(10, -6),
    });
  });

  return nfts;
};
