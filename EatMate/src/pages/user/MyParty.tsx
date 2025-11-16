import { useState, useEffect } from "react";
import {
  getMyParties,
  joinParty,
  leaveParty,
  getAllParties,
  updateParty,
} from "../../services/partyService";
import type { MyParty, Party } from "../../services/partyService";
import PartyCard from "../../components/PartyCard";
import { IoIosChatbubbles } from "react-icons/io";
import { TbShovelPitchforks } from "react-icons/tb";
import { IoChatbubble } from "react-icons/io5";

const MyPartys = () => {
  const [myParty, setMyParty] = useState<MyParty[]>([]);
  const [selectedParty, setSelectedParty] = useState<MyParty | null>(null);

  useEffect(() => {
    setMyParty(getMyParties());
  }, []);

  const handleLeave = (party: MyParty) => {
    const allParties = getAllParties();
    const target = allParties.find(p => p.id === party.id);
    if (target) {
      updateParty(party.id, { participants: Math.max(target.participants - 1, 0) });

      // ลบจาก localStorage
      leaveParty(party.id);

      // ลบจาก state
      setMyParty(prev => prev.filter(p => p.id !== party.id));

      if (selectedParty?.id === party.id) {
        setSelectedParty(null);
      }
    }
  };

  const handleJoin = (party: Party) => {
    const allParties = getAllParties();
    const target = allParties.find(p => p.id === party.id);
    if (target && target.participants < target.maxParticipants) {
      updateParty(party.id, { participants: target.participants + 1 });

      // เพิ่ม party เข้า localStorage + state
      joinParty(party);
      const newMyParty: MyParty = { ...party, status: "joined" };
      setMyParty(prev => [...prev, newMyParty]);

      // เปิด modal
      setSelectedParty(newMyParty);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-red-900 to-red-700 shadow-red-400">
      <IoIosChatbubbles className="absolute left-0 top-1/2 text-white text-7xl sm:text-9xl"/>
      <IoChatbubble className="absolute right-0 top-1/4 text-6xl sm:text-8xl scale-x-[-1] text-red-500"/>
      
      <div className="flex gap-6 p-4 justify-center shadow-md mb-5 bg-white">
        <TbShovelPitchforks className="text-2xl sm:text-4xl text-red-800"/>
        <p className="font-bold text-xl">My Parties</p>
        <TbShovelPitchforks className="text-2xl sm:text-4xl rotate-180"/>
      </div>

      {myParty.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">ยังไม่มีปาร์ตี้</p>
      ) : (
        <div className="flex flex-col gap-4 w-full items-center">
          {myParty.map(p => {
            const joined = p.participants > 0;
            return (
              <div key={p.id} className="flex w-1/2">
                <PartyCard
                  party={p}
                  joined={joined}
                  onButtonClick={() => joined ? handleLeave(p) : handleJoin(p)}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Modal แสดงรายละเอียด partyDetail */}
      {selectedParty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-1/2 relative">
            <h2 className="text-2xl font-bold mb-4">{selectedParty.name}</h2>
            <p>Host: {selectedParty.hostName}</p>
            <p>Location: {selectedParty.location}</p>
            <p>Date: {selectedParty.date}</p>
            <p>Time: {selectedParty.time}</p>
            <p>
              Participants: {selectedParty.participants} / {selectedParty.maxParticipants}
            </p>
            <p>Details: {selectedParty.details}</p>
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={() => setSelectedParty(null)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPartys;
