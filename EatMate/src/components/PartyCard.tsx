import Button from "./Button";
import type { Party } from "../services/partyService";

interface PartyCardProps {
    party: Party;
    joined: boolean;
    onButtonClick: () => void;
}

const PartyCard: React.FC<PartyCardProps> = ({ party, joined, onButtonClick }) => {
  return (
    <div className="flex w-full bg-white p-4 rounded-xl shadow-md shadow-gray-300">
      {/* ครึ่งซ้าย */}
      <div className="flex flex-col mx-auto items-center gap-4">
        <img
          src={party.img || "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg"}
          className="w-32 h-32 rounded-full object-cover"
        />
        <p>{party.hostName}</p>
      </div>

      {/* ครึ่งขวา */}
      <div className="mx-auto">
        <h1 className="font-bold text-xl text-center">{party.name}</h1>
        <p>สถานที่: {party.location}</p>
        <p>วันที่: {party.date}</p>
        <p>เวลา: {party.time}</p>
        <p>จำนวนคน: {party.participants} / {party.maxParticipants}</p>
        <p className="text-gray-400">รายละเอียด: {party.details}</p>
        <Button
          className="w-full"
          onClick={onButtonClick}
          disabled={party.participants >= party.maxParticipants && !joined}
        >
          {joined ? "Leave" : "Join"}
        </Button>
      </div>
    </div>
  );
};

export default PartyCard;
