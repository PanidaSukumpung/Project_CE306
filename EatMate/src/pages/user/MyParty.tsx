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
import { addQueue } from "../../services/queueService";
import { FaCheck } from "react-icons/fa";

function canConfirmParty(party: Party) {
  const now = new Date();
  const partyDateTime = new Date(`${party.date}T${party.time}`);

  const oneHourBefore = new Date(partyDateTime.getTime() - 60 * 60 * 1000);

  return now >= oneHourBefore; 
}

const MyPartys = () => {
  const [myParty, setMyParty] = useState<MyParty[]>([]);
  const [selectedParty, setSelectedParty] = useState<MyParty | null>(null);

  useEffect(() => {
    setMyParty(getMyParties());
  }, []);

  const handleConfirm = (party: MyParty) => {
    if (!party.branchId || !party.restaurantId) {
      alert("ยังไม่ได้เลือกสาขาหรือร้านอาหาร");
      return;
    }
    const q = addQueue(party.restaurantId, party.branchId, party.id);

    alert(`คุณได้คิว ${q.queueId}`);
    setMyParty((prev) => {
      const updated = prev.map((p) =>
        p.id === party.id
          ? { ...p, status: "confirmed", queueId: q.queueId }
          : p
      );

      localStorage.setItem("my_parties_data", JSON.stringify(updated));
      return updated;
    });


    const allParties: Party[] = JSON.parse(
      localStorage.getItem("parties_data") || "[]"
    );

    const updateAllParty = allParties.map((p) =>
      p.id === party.id ? { ...p, status: "confirmed", queueId: q.queueId } : p
    );
    localStorage.setItem("parties_data", JSON.stringify(updateAllParty));
 
  };

  const myPartiesFromStorage = getMyParties();
  console.log("Updated MyParties:", myPartiesFromStorage);


  const handleLeave = (party: MyParty) => {
    const allParties = getAllParties();
    const target = allParties.find((p) => p.id === party.id);
    if (target) {
      updateParty(party.id, {
        participants: Math.max(target.participants - 1, 0),
      });
      leaveParty(party.id);
      setMyParty((prev) => prev.filter((p) => p.id !== party.id));

      if (selectedParty?.id === party.id) {
        setSelectedParty(null);
      }
    }
  };

  const handleJoin = (party: Party) => {
    const allParties = getAllParties();
    const target = allParties.find((p) => p.id === party.id);
    if (target && target.participants < target.maxParticipants) {
      updateParty(party.id, { participants: target.participants + 1 });

      joinParty(party);
      const newMyParty: MyParty = { ...party, userStatus: "joined" };
      setMyParty((prev) => [...prev, newMyParty]);

      
      setSelectedParty(newMyParty);
    }
  };
  const [tab, setTab] = useState<"upcoming" | "history">("upcoming");
  const upcomingParty = myParty.filter((p) => p.status !== "confirmed");
  const historyParty = myParty.filter((p) => p.status === "confirmed");

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-red-900 to-red-700 shadow-red-400">
      <IoIosChatbubbles className="absolute left-0 top-1/2 text-white text-7xl sm:text-9xl " />
      <IoChatbubble className="absolute right-0 top-1/4 text-6xl sm:text-8xl scale-x-[-1] text-red-500 z-0" />

      <div className="flex gap-6 p-4 justify-center shadow-md mb-5 bg-white">
        <TbShovelPitchforks className="text-2xl sm:text-4xl text-red-800" />

        {/* <p className="font-bold text-xl">My Parties</p> */}
        <button
          className={`px-4 py-2 rounded transition-all duration-300 ${
            tab === "upcoming" ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-green-500 hover:text-white" 
          }`}
          onClick={() => setTab("upcoming")}
        >
          upcoming
        </button>

        <button
          className={`px-4 py-2 rounded transition-all duration-300 ${
            tab === "history" ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-red-500 hover:text-white"
          }`}
          onClick={() => setTab("history")}
        >
          history
        </button>

        <TbShovelPitchforks className="text-2xl sm:text-4xl rotate-180" />
      </div>
      {tab === "upcoming" &&
        (upcomingParty.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">ยังไม่มีปาร์ตี้</p>
        ) : (
          <div className="flex flex-col gap-4 w-full items-center">
            {upcomingParty.map((p) => {
              const joined = p.participants > 0;
              return (
                <div
                  key={p.id}
                  className="flex flex-col w-4/5 md:w-1/2 bg-white rounded-2xl mb-2 gap-2"
                >
                  <PartyCard
                    party={p}
                    joined={joined}
                    onButtonClick={() =>
                      joined ? handleLeave(p) : handleJoin(p)
                    }
                  />
                  {canConfirmParty(p) && (
                    <button
                      onClick={() => handleConfirm(p)}
                      className="bg-green-600 hover:bg-green-700 p-2 border-2 border-white rounded-xl
                font-semibold text-white flex justify-center
                transition-all duration-300 ease-in-out"
                    >
                      <FaCheck />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}

      {tab === "history" &&
        (historyParty.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            ยังไม่มีร้านอาหารที่จอง
          </p>
        ) : (
          <div className="flex flex-col gap-2 w-3/4 items-center mx-auto">
            {[...historyParty]
              .sort(
                (a, b) =>
                  new Date(`${b.date} ${b.time}`).getTime() -
                  new Date(`${a.date} ${a.time}`).getTime()
              )
              .map((p) => {
                return (
                  <div
                    key={p.id}
                    className="flex flex-col w-full max-w-lg bg-white rounded-xl 
                p-5 shadow-lg border border-gray-100 mb-4 
                transition duration-300 hover:shadow-xl"
                  >
                    <div className="mb-3 pb-2 border-b border-red-200">
                      <p className="text-xl font-extrabold text-red-700 text-center">
                        {p.name}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                      <div>
                        <span className="font-semibold text-gray-500 mr-3">
                           วันที่ & เวลา :
                        </span>
                        <span className="font-medium text-red-300">
                          {p.date} {p.time}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-gray-500 mr-3">
                           ร้านอาหาร :
                        </span>
                        <span className="font-medium text-red-300">
                          {p.restaurantId}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-gray-500 mr-3">
                          ⏳ คิว/การจอง
                        </span>
                        <span className="text-lg font-bold text-red-600">
                          {p.queueId}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}

    </div>
  );
};

export default MyPartys;
