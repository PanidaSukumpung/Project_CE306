import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import CreateParty from "../../components/CreateParty";
import type { Restaurant } from "../../services/RestaurantService";
import { FaBahtSign } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import PartyList from "../../components/PartyList";
import { getAllRestaurants } from "../../services/RestaurantService";
import { Link } from "react-router-dom";
import {
  joinParty,
  getAllParties,
  createParty,
} from "../../services/partyService";
import type { Party } from "../../services/partyService";
import { initParties } from "../../services/partyService";
import PartyDetail from "../../components/PartyDetail";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>(); //ดึง id จากURL -> string
  console.log("Restaurant ID from URL:", id);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [parties, setParties] = useState<Party[]>([]);

    const handleJoin = (party: Party) => {
       joinParty(party);
      setParties(getAllParties());
   };

  const handleCreateParty = (
    partyDataInput: Omit<Party, "id" | "participants">
  ) => {
    const newParty = createParty(partyDataInput); // createParty จะ save ลง localStorage
    setParties((prev) => [...prev, newParty]); // update state
  };

  useEffect(() => {
    initParties();

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const restaurants = getAllRestaurants(); // ดึงข้อมูลจาก localStorage / default JSON
        const found = restaurants.find((r) => r.id === id);
        setRestaurant(found || null);
      } catch (error) {
        console.log("Fail to fetch restaurant", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();

    const allParties = getAllParties();
    console.log("All parties loaded:", allParties); // ตอนนี้ควรมีข้อมูลจาก partyData.json
    if (id) {
      const filtered = allParties.filter((p) => p.restaurantId === id);
      console.log("Filtered parties:", filtered);
      setParties(filtered);
    }
  }, [id]); //ทำงานเมื่อค่า id เปลี่ยน

  useEffect(() => {
    console.log("useEffect start");

    initParties();
    console.log("After initParties");

    const allParties = getAllParties();
    console.log("All parties loaded:", allParties);

    if (id) {
      const filtered = allParties.filter((p) => p.restaurantId === id);
      console.log("Filtered parties:", filtered);
      setParties(filtered);
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">loading...</p>;
  }

  if (!restaurant) {
    return <p className="text-center mt-10">ไม่พบข้อมูลร้านนี้</p>;
  }

  return (
    <div className=" bg-white p-4 space-y-4 ">
      <div className="relative w-full flex justify-center items-center">
        <Link to="/">
          <MdOutlineKeyboardBackspace
            className="absolute left-4 text-2xl cursor-pointer font-bold
            hover:text-red-500 "
          />
        </Link>
        <div className="w-1/2">
          <SearchBar />
        </div>
      </div>

      <div className="gap-4 flex flex-col items-center md:flex-row md:items-start">
        {/* ครึ่งซ้าย */}
        <div
          className="flex flex-col w-full md:w-3/5 lg:w-2/3 p-4 rounded-2xl shadow-md shadow-gray-400 ring-1 ring-white
            bg-white "
        >
          <div className="flex flex-col justify-center items-center space-y-6 rounded-md">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-auto object-cover rounded-xl bg-cover "
            />
          </div>

          <h1 className="text-3xl font-bold mt-4">{restaurant.name}</h1>
          <p className="text-gray-600 mt-2">{restaurant.description}</p>
          <div className="flex items-center bg-gray-50 w-fit p-2 mt-2 rounded-xl shadow-md">
            <p className="font-semibold text-red-500">{restaurant.promotion}</p>
          </div>
          <div className="flex items-center bg-red-500 w-fit p-2 mt-2 rounded-xl shadow-md text-white">
            <FaBahtSign className="text-lg" />
            <p className="font-semibold">{restaurant.price}</p>
          </div>

          {/* เน้น */}
          <div
            className="flex p-4 gap-4 mt-5 w-full justify-center bg-gradient-to-tr from-black via-red-500 to-red-800
                shadow-md shadow-red-300 "
          >
            <div className="flex items-center gap-2 text-white ">
              <MdOutlineAccessTime className="text-xl" />
              <p className="font-semibold ">{restaurant.date}</p>
            </div>
            <div className="flex items-center text-white"></div>
          </div>
        </div>

        {/* ครึ่งขวา */}
        <div
          className="w-full h-full md:w-2/5 lg:w-1/3 flex flex-col items-center bg-gradient-to-br from-black via-red-500 to-white bg-[length:400%_400%]
            rounded-2xl"
        >
          <div className="w-full flex flex-col items-center p-4">
            <h1 className="text-red-500 fond-bold text-2xl ">
              ชวนเพื่อกินด้วยกัน
            </h1>
            <p className="text-white">
              สร้างปาร์ตี้ใหม่หรือเข้าร่วมปาร์ตี้ที่คนอื่นสร้างไว้แล้ว
            </p>
          </div>
          <Button onClick={() => setOpenModal(true)} variant="secondary">
            Create Party
          </Button>
          <div className="w-full m-2 flex flex-col gap-2">
            <PartyList parties={parties} setParties={setParties} />

          </div>
        </div>

        <CreateParty
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          restaurantId={restaurant.id}
          restaurantName={restaurant.name}
          onCreate={handleCreateParty}
        />

      </div>
    </div>
  );
};

export default RestaurantDetail;
