import React from "react";
import { Link } from "react-router-dom";

interface RestaurantProps {
    id:number;
    image: string;
    name: string;
    category: string;
    promotion: string;
    description: string;
    date: string;
    party: number;
}

const RestaurantCard: React.FC<RestaurantProps> = ({
    id,
    image,
    name,
    category,
    promotion,
    description,
    date,
    party,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="flex flex-col w-full rounded-lg bg-white shadow-md hover:shadow-xl">
        <div className="rounded-xl">
          <img src={image} className="rounded-lg" />
        </div>
        <section className="flex flex-col p-5">
          <h1 className="font-bold text-2xl">{name}</h1>
          <p className="font-semibold text-xl text-red-500">{promotion}</p>
          <p>{description}</p>
          <div className="flex space-x-6 justify-evenly mt-2 mb-2">
            <p className="text-gray-400">{date}</p>
            <p className="text-blue-300">{party} Party </p>
            <p>{category}</p>
          </div>
        </section>
      </div>
    </Link>
  );
};

export default RestaurantCard;
