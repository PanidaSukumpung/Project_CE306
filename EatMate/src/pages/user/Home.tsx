import SearchBar from "../../components/SearchBar";
import RestaurantList from "../../components/RestaurantList";
import { RiRestaurant2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LuDessert } from "react-icons/lu";
import { LuCookingPot } from "react-icons/lu";
import { IoIosChatbubbles } from "react-icons/io";
import { TbShovelPitchforks } from "react-icons/tb";
import { IoChatbubble } from "react-icons/io5";

const Home = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (category: string) => {
    navigate(`/explore/${category}`);
  };

  return (
    <div>
      <div className="relative flex flex-col items-center mt-10 mb-10">
        <IoIosChatbubbles className="absolute left-0 text-7xl sm:text-9xl"/>
        <IoChatbubble className="absolute right-0 top-0 text-6xl sm:text-8xl scale-x-[-1] text-red-800"/>

        <section className="flex items-center justify-center gap-3 w-full px-4 mb-4">
          <TbShovelPitchforks className="text-4xl sm:text-6xl text-red-800" />

          <div className="text-center">
            <p className="text-3xl sm:text-5xl text-red-600 font-bold">หาเพื่อนกิน</p>
            <p className="text-xl">ค้นหาร้านอาหารที่อยากกิน</p>
          </div>

          <TbShovelPitchforks className="text-4xl sm:text-6xl rotate-180" />
        </section>

        <div className="flex w-full sm:w-1/2 justify-center items-center mt-3">
          <SearchBar />
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col items-center mt-4 gap-2">
        <h1 className="font-bold text-3xl">Category</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 p-2">
          {/* card */}
          <div
            onClick={() => handleCategoryClick("Restaurant")}
            className="flex flex-col items-center p-4 rounded-xl shadow-red-200 shadow-lg gap-2 w-[150px]
        bg-gradient-to-r from-black via-red-500 to-white bg-[length:400%_400%]
        hover:scale-110 hover:shadow-red-900 hover:shadow-xl
        transition-all duration-700 ease-in-out
  "
          >
            {/* icon */}
            <div
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center 
          bg-gradient-to-r from-gray-50 via-red-300 to-white bg-[length:400%_400%]
        text-white shadow-md shadow-red-200
          transition-all duration-700 ease-in-out"
            >
              <RiRestaurant2Fill className="text-5xl text-red-900 " />
            </div>
            <p className="font-semibold text-xl text-red-300">Restaurant</p>
          </div>

          {/* card */}
          <div
            onClick={() => handleCategoryClick("shabu")}
            className="flex flex-col items-center p-4 rounded-xl shadow-red-200 shadow-lg gap-2 w-[150px]
        bg-gradient-to-r from-black via-red-500 to-white bg-[length:400%_400%]
        hover:scale-110 hover:shadow-red-900 hover:shadow-xl
        transition-all duration-700 ease-in-out
  "
          >
            {/* icon */}
            <div
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center 
          bg-gradient-to-r from-gray-50 via-red-300 to-white bg-[length:400%_400%]
        text-white shadow-md shadow-red-200
          transition-all duration-700 ease-in-out"
            >
              <LuCookingPot className="text-5xl text-red-900 " />
            </div>
            <p className="font-semibold text-xl text-red-300">Shabu</p>
          </div>

          {/* card */}
          <div
            onClick={() => handleCategoryClick("dessert")}
            className="flex flex-col items-center p-4 rounded-xl shadow-red-200 shadow-lg gap-2 w-[150px]
        bg-gradient-to-r from-black via-red-500 to-white bg-[length:400%_400%]
        hover:scale-110 hover:shadow-red-900 hover:shadow-xl
        transition-all duration-700 ease-in-out
  "
          >
            {/* icon */}
            <div
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center 
          bg-gradient-to-r from-gray-50 via-red-300 to-white bg-[length:400%_400%]
        text-white shadow-md shadow-red-200
          transition-all duration-700 ease-in-out"
            >
              <LuDessert className="text-5xl text-red-900 " />
            </div>
            <p className="font-semibold text-xl text-red-300">Dessert</p>
          </div>
        </div>
      </div>

      {/* Card Restaurant */}
      <div className="flex flex-col flex-wrap justify-center items-center mt-10 mx-auto space-y-6 max-w-6xl px-12">
        <h1 className="font-bold text-3xl drop-shadow-md drop-">
          Recommendation
        </h1>
        <RestaurantList />
      </div>
    </div>
  );
};
export default Home;
