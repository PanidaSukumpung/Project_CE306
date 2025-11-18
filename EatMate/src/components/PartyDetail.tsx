import React from "react";
import Button from "./Button";
import type { Party } from "../services/partyService";
import { IoIosCloseCircle } from "react-icons/io";


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
    onJoin(party);
    alert(`เข้าร่วมปาร์ตี้ "${party.name}" แล้ว!`);
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-30 p-6">
      <div className="relative bg-white flex w-10/12 md:w-1/2 justify-between rounded-md shadow-xl ">
        <button onClick={onClose} className="absolute right-0 top-0">
          <IoIosCloseCircle className="text-2xl text-gray-200 hover:text-gray-500" />
        </button>
        {/* หัว */}
        <div className="flex w-full gap-4 ">
          <div className="flex flex-col justify-between flex-1 gap-3 text-gray-800 p-4 bg-white rounded-xl shadow-sm">
            {/* แถวแรก: ร้านอาหาร / วันที่ */}
            <div className="flex justify-center gap-4">
              <div className="flex">
                <p className="font-semibold">ร้านอาหาร:</p>
                <div className="font-medium text-red-700 ml-2">
                  {party.location}
                </div>
              </div>
              <div className="flex">
                <p className="font-semibold">สาขา:</p>
                <div className="font-medium text-red-700 ml-2">
                  {party.branchName}
                </div>
              </div>
              <div className="flex">
                  <p className="font-semibold">วันที่:</p>
                  <div className="font-medium text-red-700 ml-2">
                    {party.date}
                  </div>
                </div>
                <div className="flex">
                  <p className="font-semibold">เวลา:</p>
                  <div className="font-medium text-red-700 ml-2">
                    {party.time}
                  </div>
                </div>
            </div>

            <div className="flex justify-center gap-4">
              <div className="flex">
                <p className="font-semibold">จำนวนคน:</p>
                <div className="font-medium text-red-700 ml-2">
                  {party.participants} / {party.maxParticipants}
                </div>
              </div>
              <div className="flex">
                <p className="font-semibold mb-1">รายละเอียด:</p>
                <div className="text-gray-700">
                  {party.details || "ไม่มีรายละเอียดเพิ่มเติม"}
                </div>
              </div>
            </div>

            <div className="flex w-full mt-4">
              <button className="text-gray-500 w-1/2" onClick={onClose}>
                cancle
              </button>
              <Button
              size="sm"
                className="w-1/2 py-3 text-lg font-bold"
                onClick={handleJoin}
              >
                ยืนยันเข้าร่วมปาร์ตี้
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyDetail;
