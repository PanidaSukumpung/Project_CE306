import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import CreateParty from "../../components/CreateParty";
import type { RestaurantDataType } from "../../components/RestaurantDataType";
import axios from "axios";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>(); //ดึง id จากURL -> string
  const [restaurant,setRestaurant] = useState<RestaurantDataType| null >(null);
  const [loading , setLoading] = useState(true);
  const [openModal,setOpenModal] = useState(false);

  
  useEffect (() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await axios.get<RestaurantDataType[]>("/restaurantData.json");
        const found = response.data.find(r=> r.id == Number(id));// หาidจากไฟล์json(r.id)ที่ตรงกับidที่ดึงมา(Number(id))
        setRestaurant(found || null)

      } catch (error) {
        console.log('Fail to fetch restaurant' , error)
      } finally {
        setLoading(false)
      }
    };
    fetchRestaurant();
  }, [id]) //ทำงานเมื่อค่า id เปลี่ยน

  if (loading) {
    return <p className="text-center mt-10">loading...</p>;
  }

  if (!restaurant) {
    return <p className="text-center mt-10">ไม่พบข้อมูลร้านนี้</p>;
  }

  return (
    <div className=" bg-gray-50 p-4 space-y-4" >
        <div className="w-full flex justify-center"><SearchBar /></div>
        
        <div className="gap-4 flex">
            {/* ครึ่งซ้าย */}
            <div className="flex flex-col w-2/3 p-4 bg-white ">
            
                <div className="flex flex-col justify-center items-center space-y-6">
                    
                    <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-auto object-cover rounded-xl bg-cover "
                    />
                </div>
                
                <h1 className="text-3xl font-bold mt-4">{restaurant.name}</h1>
                <p className="text-gray-600 mt-2">{restaurant.description}</p>
                <p className="mt-4 font-semibold">📍 ที่อยู่: {restaurant.date}</p>
                <p className="mt-2">⭐ คะแนน: {restaurant.party}</p>
                </div>

            {/* ครึ่งขวา */}
            <div className="w-1/3 bg-white flex flex-col items-center">
                <div className="w-full flex flex-col items-center p-4">
                    <h1 className="text-red-600 fond-bold text-2xl">ชวนเพื่อกินด้วยกัน</h1>
                    <p>สร้างปาร์ตี้ใหม่หรือเข้าร่วมปาร์ตี้ที่คนอื่นสร้างไว้แล้ว</p>
                </div>
                <Button onClick={() => setOpenModal(true)} variant="secondary">Create Party</Button>
            </div>
            <CreateParty isOpen={openModal}
            onClose={()=> setOpenModal(false)}/>
            
        </div>
        
  
  
    </div>
  );
};

export default RestaurantDetail;
