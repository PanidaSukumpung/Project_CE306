import React from "react";
import Button from "./Button";
import type { Party } from "../services/partyService";
import { IoIosCloseCircle } from "react-icons/io";
import { joinParty } from "../services/partyService";
import { useState } from "react";
import { getAllParties } from "../services/partyService";

interface PartyDetailProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (party: Party) => void;
  party: Party | null;
}
const PartyDetail: React.FC<PartyDetailProps> = ({
  isOpen,
  onClose,
  onJoin,
  party,
}) => {
  if (!isOpen || !party) return null;


  const handleJoin = () => {
    onJoin(party)
    alert(`เข้าร่วมปาร์ตี้ "${party.name}" แล้ว!`);
    onClose();
  }

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-30 p-6">
      <div className="relative bg-white flex w-10/12 md:w-1/2 justify-between rounded-md shadow-xl p-4">
        <button onClick={onClose} className="absolute right-0 top-0"><IoIosCloseCircle className="text-2xl text-gray-200 hover:text-gray-500" /></button>
      {/* หัว */}
        <div className="flex flex-col w-1/3 font-bold items-center justify-center gap-2 p-4 text-white rounded-md shadow-sm shadow-red-900
        bg-gradient-to-r from-black via-red-500 to-white bg-[length:400%_400%]
      ">
          <p className="text-2xl">{party.name}</p>
          <img
            src="https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg"
            className="w-32 h-32 rounded-full object-cover"
          />
          <p className="text-xl">
            Created by 
            <span className="text-lg font-medium ml-2">
              {party.hostName}
            </span>
          </p>
        </div>
        {/* เนื้อหา */}
        <div className="flex flex-col justify-between flex-1 gap-4 text-gray-800 p-6 w-2/3 ">
          <p className="font-semibold">
            ร้านอาหาร:{" "}
            <span className="text-red-900 font-medium">
              {party.location}
            </span> 
          </p>

          <p>
            วันที่: <span className="text-red-900 font-medium">{party.date}</span>
          </p>

          <p>
            เวลา: <span className="text-red-900 font-medium">{party.time}</span>
          </p>

          <p>
            จำนวนคน:{" "}
            <span className="text-red-900 font-medium">
              {party.participants} / {party.maxParticipants}
            </span>
          </p>

          <p>
            รายละเอียด: <span className="text-red-900 font-medium">{party.details}</span>
          </p>
          {/* ปุ่ม */}
            <div className="flex flex-col w-full  gap-6 mt-6">
                <Button className="w-full" onClick={handleJoin}
                >Join</Button>
            </div>
        </div>

        
      </div>
    </div>
  );
};

export default PartyDetail;
