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
    <div className="card bg-base-100 image-full max-h-80 shadow-xl">
      <figure>
        <img
          src={`${process.env.NEXT_PUBLIC_HOTEL_IMAGE_URL_PREFIX}/${bgImg}`}
          alt={name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{name}</h2>
        <p className="text-white text-sm">{description}</p>
        <div className="card-actions items-center justify-between text-white">
          <small>{minted}+ minted</small>
          <Link href={`/dashboard/hotels/${id}`}>
            <button className="btn btn-secondary btn-sm text-white font-medium">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
