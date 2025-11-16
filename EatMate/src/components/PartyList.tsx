import { useState } from "react";
import PartyCard from "./PartyCard";
import type { Party, MyParty } from "../services/partyService";
import { getMyParties, joinParty, leaveParty, updateParty } from "../services/partyService";
import PartyDetail from "./PartyDetail";

interface PartyListProps {
  parties: Party[];
  setParties: React.Dispatch<React.SetStateAction<Party[]>>;
}

const PartyList: React.FC<PartyListProps> = ({ parties, setParties }) => {
  const [myParties, setMyParties] = useState<MyParty[]>(getMyParties());
  const [selectedParty, setSelectedParty] = useState<Party | null>(null); // สำหรับ modal

  // Join จาก PartyDetail modal
  const handleJoinFromDetail = (party: Party) => {
    joinParty(party); // บันทึกลง myParties
    updateParty(party.id, { participants: party.participants + 1 });
    setParties(prev =>
      prev.map(p => (p.id === party.id ? { ...p, participants: p.participants + 1 } : p))
    );
    setMyParties(getMyParties());
  };

  const handleLeave = (party: Party) => {
    leaveParty(party.id);
    updateParty(party.id, { participants: Math.max(party.participants - 1, 0) });
    setParties(prev => prev.map(p => (p.id === party.id ? { ...p, participants: p.participants - 1 } : p)));
    setMyParties(getMyParties());
  };

  return (
    <div className="flex flex-col gap-4">
      {parties.map((p) => {
        const joined = myParties.some(mp => mp.id === p.id && mp.status === "joined");
        return (
          <div key={p.id}>
            <PartyCard
              party={p}
              joined={joined}
              onButtonClick={() => setSelectedParty(p)} // เปิด modal แทน join/leave ตรงนี้
            />
          </div>
        );
      })}

      {/* Modal PartyDetail */}
      {selectedParty && (
        <PartyDetail
          isOpen={!!selectedParty}
          onClose={() => setSelectedParty(null)}
          party={selectedParty}
          onJoin={(party) => {
            handleJoinFromDetail(party);
            setSelectedParty(null); // ปิด modal หลัง join
          }}
        />
      )}
    </div>
  );
};

export default PartyList;
