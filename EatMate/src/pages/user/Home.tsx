import SearchBar from "../../components/SearchBar";
import background_banner from "../../assets/background_banner.svg";
import RestaurantList from "../../components/RestaurantList";
//import { useNavigate } from "react-router-dom";



const Home = () => {
  //const navigate = useNavigate();
  
  return (
    <div>
      <div
        className="h-80 bg-gray-50 flex justify-center items-center flex-col bg-cover bg-center"
        style={{ backgroundImage: `url(${background_banner})` }}
      >
        <section className="p-4 flex flex-col justify-center items-center">
          <p className="text-4xl text-red-600 font-bold">หาเพื่อนกิน</p>
          <p className="text-xl">ค้นหาร้านอาหารหรือปาร์ตี้ที่คุณอยากร่วมด้วย</p>
        </section>
        <div className="flex w-full justify-center">
          <SearchBar />
        </div>
      </div>
      {/* Card Restaurant */}
      <div className="flex flex-col flex-wrap justify-center items-center mt-10 mx-auto space-y-6 w-2/3">
        <h1 className="font-bold text-3xl">Recommendation</h1>
        <RestaurantList />
      </div>
      
    </div>
  );
};
export default Home;
