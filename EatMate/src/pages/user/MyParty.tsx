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
import Button from "../../components/Button";
import { MdDelete } from "react-icons/md";
import restaurants from "../../data/restaurantData.json";

const MyPartys = () => {
  const [myParty, setMyParty] = useState<MyParty[]>([]);


  useEffect(() => {
    setMyParty(getMyParties());
  }, []);

  const handleConfirm = (party: MyParty) => {
    if (!party.branchId || !party.restaurantId) {
      alert("ยังไม่ได้เลือกสาขาหรือร้านอาหาร");
      return;
    }

     const restaurant = restaurants.find(r => r.id === party.restaurantId);

  let updatedFields: Partial<MyParty> = { status: "confirmed" };
  let queueId: string | null = null;

  if (restaurant?.category === "dessert") {
    alert("ยืนยันปาร์ตี้แล้ว สามารถ walk-in ได้เลย");
  } else {
    const q = addQueue(party.restaurantId, party.branchId, party.id);
    queueId = q.queueId;
    updatedFields.queueId = queueId;
    if ( (restaurant?.category === "restaurant")) {
      alert(`คุณได้โต๊ะที่ ${queueId}`);
     
    } else {
      alert(`คุณได้คิวที่ ${queueId}`);
    }
    
  }

  setMyParty(prev =>
    prev.map(p =>
      p.id === party.id ? { ...p, ...updatedFields } : p
    )
  );

  const myParties: MyParty[] = JSON.parse(
    localStorage.getItem("my_parties_data") || "[]"
  );
  const updatedMyParties = myParties.map(p =>
    p.id === party.id ? { ...p, ...updatedFields } : p
  );
  localStorage.setItem("my_parties_data", JSON.stringify(updatedMyParties));


  const allParties: Party[] = JSON.parse(
    localStorage.getItem("parties_data") || "[]"
  );
  const updatedAllParties = allParties.map(p =>
    p.id === party.id ? { ...p, ...updatedFields } : p
  );
  localStorage.setItem("parties_data", JSON.stringify(updatedAllParties));
};

  const handleLeave = (party: MyParty) => {
    const allParties = getAllParties();
    const target = allParties.find((p) => p.id === party.id);
    if (target) {
      updateParty(party.id, {
        participants: Math.max(target.participants - 1, 0),
      });
      leaveParty(party.id);
      setMyParty((prev) => prev.filter((p) => p.id !== party.id));
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
    }
  };

  const handleDelete = (party: MyParty) => {
    // ลบข้อมูลออกจาก ปาร์ตี้ทั้งหมด
    const allParties: Party[] = JSON.parse(
      localStorage.getItem("parties_data") || "[]"
    );
    const newAllParties = allParties.filter((p) => p.id !== party.id);
    localStorage.setItem("parties_data", JSON.stringify(newAllParties));

    // ลยข้อมูลออกจาก myParty (local)
    const myParties: MyParty[] = JSON.parse(
      localStorage.getItem("my_parties_data") || "[]"
    );
    const newMyParties = myParties.filter((p) => p.id !== party.id);
    localStorage.setItem("my_parties_data", JSON.stringify(newMyParties));

    // 3) อัปเดต state
    setMyParty(newMyParties);
  };

  const [tab, setTab] = useState<"upcoming" | "history">("upcoming");
  const upcomingParty = myParty.filter((p) => p.status !== "confirmed");
  const historyParty = myParty.filter((p) => p.status === "confirmed");

 

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-red-900 to-red-700 shadow-red-400">
      <IoIosChatbubbles className="absolute left-0 top-1/2 text-white text-7xl sm:text-9xl z-0 " />
      <IoChatbubble className="absolute right-0 top-1/4 text-6xl sm:text-8xl scale-x-[-1] text-red-500 z-0" />

      <div className="flex gap-6 p-4 justify-center shadow-md mb-5 bg-white">
        <TbShovelPitchforks className="text-2xl sm:text-4xl text-red-800" />

        {/* <p className="font-bold text-xl">My Parties</p> */}
        <button
          className={`px-4 py-2 rounded transition-all duration-300 ${
            tab === "upcoming"
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-green-500 hover:text-white"
          }`}
          onClick={() => setTab("upcoming")}
        >
          upcoming
        </button>

        <button
          className={`px-4 py-2 rounded transition-all duration-300 ${
            tab === "history"
              ? "bg-red-600 text-white"
              : "bg-gray-200 hover:bg-red-500 hover:text-white"
          }`}
          onClick={() => setTab("history")}
        >
          history
        </button>

        <TbShovelPitchforks className="text-2xl sm:text-4xl rotate-180" />
      </div >
      {tab === "upcoming" &&
        (upcomingParty.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">ยังไม่มีปาร์ตี้</p>
        ) : (
          <div className="flex flex-col gap-4 w-full items-center z-10">
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
                  <div className="flex w-full gap-2">
                    <Button
                      variant="secondary"
                      className="w-1/2 flex justify-center"
                      onClick={() => handleDelete(p)}
                    >
                      <MdDelete className="text-2xl" />
                    </Button>
                    <Button
                      variant="success"
                      className="w-1/2 flex justify-center items-center "
                      onClick={() => handleConfirm(p)}
                    >
                      {" "}
                      <FaCheck />
                    </Button>
                  </div>
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
          <div className="flex flex-col gap-2 w-3/4 items-center mx-auto z-10">
          
            {[...historyParty]
              .sort(
                (a, b) =>
                  new Date(`${b.date} ${b.time}`).getTime() -
                  new Date(`${a.date} ${a.time}`).getTime()
              )
              .map((p) => {
                return (
                  <div className="w-full ">
                    {/* card */}
                    <div
                      key={p.id}
                      className="flex flex-col w-full max-w-lg bg-white rounded-xl 
                p-5 shadow-lg border border-gray-100 mb-4 mx-auto
                  "
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
                            {p.location}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-500 mr-3">
                              สาขา :
                          </span>
                          <span className="font-medium text-red-300">
                            {p.branchName}
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
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
};

export default MyPartys;
