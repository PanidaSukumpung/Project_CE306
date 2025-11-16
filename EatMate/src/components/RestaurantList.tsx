import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import type { Restaurant } from "../services/RestaurantService";
import { getAllRestaurants } from "../services/RestaurantService";
import { getAllParties } from "../services/partyService";

interface RestaurantListProps {
  restaurants?: Restaurant[];         
  filterCategory?: string;           
  filterPromotion?: string;          
  searchText?: string;              
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  filterCategory = "",
  filterPromotion = "",
  searchText = "",
}) => {
  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [countParty, setCountParty] = useState<any[]>([])

  useEffect(() => {
    if (restaurants) {
      setRestaurantsList(restaurants);
      setLoading(false);
    } else {
      try {
        setLoading(true);
        const data = getAllRestaurants();
        const partyData = getAllParties();
        setRestaurantsList(data);
        setCountParty(partyData)
      } catch (error) {
        console.error("Failed to load restaurants:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [restaurants]);

  if (loading) return <p>Loading...</p>;

  const filteredRestaurants = restaurantsList.filter((r) => {
    const matchCategory = filterCategory ? r.category === filterCategory : true;
    const matchPromotion = filterPromotion ? r.promotion === filterPromotion : true;
    const matchSearch = searchText
      ? r.name.toLowerCase().includes(searchText.toLowerCase())
      : true;
    return matchCategory && matchPromotion && matchSearch;
  });

  if (filteredRestaurants.length === 0) {
    return <p className="text-center text-gray-500">No restaurants found.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-6 justify-items-center ">
      {filteredRestaurants.map((r) => {
        const partyCount = countParty.filter(p => p.restaurantId === r.id).length;
        return(
            <RestaurantCard
          key={r.id}
          id={r.id}
          image={r.image}
          name={r.name}
          category={r.category}
          promotion={r.promotion}
          description={r.description}
          date={r.date}
          party={partyCount}
        />
        )
      })}
    </div>
  );
};

export default RestaurantList;
