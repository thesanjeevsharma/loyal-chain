import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  name: string;
  minted: number;
  description: string;
  bgImg: string;
};

const HotelCard = ({ id, name, minted, bgImg, description }: Props) => {
  return (
    <Link href={`/dashboard/hotels/${id}`}>
      <div className="card bg-base-100 image-full h-80 shadow-xl hover:scale-105 hover:shadow-neon transition-all duration-300">
        <figure>
          <img
            src={`${process.env.NEXT_PUBLIC_HOTEL_IMAGE_URL_PREFIX}/${bgImg}`}
            alt={name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-white">{name}</h2>
          <p className="text-white-200 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
