import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccessTime } from "react-icons/md";

interface RestaurantProps {
    id:string;
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
  let category_color = '';
  if (category == 'shabu') {
    category_color = 'bg-orange-300'
  } else if (category == 'dessert') {
    category_color = 'bg-red-300'
  } else if (category === 'restaurant') {
    category_color = 'bg-blue-300'
  } else {
    category_color = 'bg-gray-300'
  }
    
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="flex flex-col w-full max-w-96 rounded-lg bg-white shadow-lg h-full
      hover:ring-2 hover:ring-red-700 hover:shadow-lg
      hover:shadow-red-900  hover:scale-105
      transition-all duration-700 ease-in-out">
        <div className="rounded-xl">
          <img src={image} className="rounded-lg w-full h-48 object-cover" />
        </div>
        <section className="flex flex-col p-5 justify-between flex-1">
          <div className="gap-4">
            <p className={` w-fit mb-2 text-white px-2 font-semibold rounded-lg ${category_color}`}>{category}</p>
            <h1 className="font-bold text-2xl">{name}</h1>
            <p className="font-semibold text-xl text-red-500">{promotion}</p>
            <p>{description}</p>
          </div>
          <div className="flex space-x-6 justify-evenly mt-2 mb-2">
            <div className="flex items-center gap-2 text-gray-400">
              <MdOutlineAccessTime className="text-xl"/>
              <p className="text-gray-400">{date}</p>
            </div>
            
            <p className="text-blue-300">{party} Party </p>
          </div>
        </section>
      </div>
    </Link>
  );
};

export default RestaurantCard;
