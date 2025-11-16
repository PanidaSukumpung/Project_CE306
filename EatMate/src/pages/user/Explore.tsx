import { useParams } from "react-router-dom";
import RestaurantList from "../../components/RestaurantList";
import { LuDessert } from "react-icons/lu";
import { LuCookingPot } from "react-icons/lu";
import { RiRestaurant2Fill } from "react-icons/ri";

const Explore = () => {
  const { category } = useParams<{ category: string }>();
  let Icon = RiRestaurant2Fill;
  if (category == 'restaurant') {
    Icon = RiRestaurant2Fill;
  } else if (category == 'shabu') {
    Icon = LuCookingPot
  } else if (category == 'dessert') {
    Icon == LuDessert
  }

  return (
    <div>
        <div className="flex flex-col items-center mt-4">
            <Icon className="text-6xl text-red-800"/>
            <h1 className="text-2xl font-bold mb-4">{category?.toUpperCase()}</h1>
        </div>
        
      
      <div className="flex flex-col flex-wrap justify-center items-center mx-auto space-y-6 w-2/3">
        {category ? (
        <RestaurantList filterCategory={category} />
      ) : (
        <RestaurantList /> 
      )}
      </div>
    </div>
  );
};

export default Explore;
