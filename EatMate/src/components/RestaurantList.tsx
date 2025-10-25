import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import RestaurantCard from "./RestaurantCard";
import type { RestaurantDataType } from "./RestaurantDataType";


const RestaurantList: React.FC = () => {
    const [restaurants,setRestaurants] = useState<RestaurantDataType[]>([]);
    const [loading , setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetc้hData = async () => {
            try {
                setLoading(true);
                const response = await axios.get<RestaurantDataType[]>("/restaurantData.json")
                console.log(response.data);
                setRestaurants(response.data);
            } catch (error: unknown) {
                console.log('Failed to fetch', error);
            } finally {
                setLoading(false);
            }
        };
        fetc้hData();
    },[]);
    if(loading) {
        return <p>loading</p>
    }
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 justify-items-center ">
            {restaurants.map((r) => (
                <RestaurantCard 
                key = {r.id}
                id = {r.id}
                image = {r.image}
                name = {r.name}
                category= {r.category}
                promotion={r.promotion}
                description={r.description}
                date={r.date}
                party={r.party}
                />
            ))}
        </div>
    )
}

export default RestaurantList;
