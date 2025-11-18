import Button from "./Button";
import type { Party } from "../services/partyService";

interface PartyCardProps {
  party: Party;
  joined: boolean;
  onButtonClick: () => void;
}

const PartyCard: React.FC<PartyCardProps> = ({
  party,
  joined,
  onButtonClick,
}) => {
  return (
    <div
      className="flex flex-col md:flex-row w-full bg-white rounded-2xl border
    border-1 border-red-500 shadow-md shadow-red-400 "
    >
      {/* ครึ่งซ้าย */}
      <div
        className="flex flex-col items-center justify-center p-5 md:w-1/4 min-w-40 
      rounded-2xl
      bg-red-100 border-1 border-red-500 shadow-md shadow-red-400 "
      >
        <img
          src={
            party.img ||
            "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg"
          }
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-red-600 shadow-md"
        />
        <div className="flex flex-col text-center">
          <p className="mt-3 text-sm font-medium text-gray-600">Host:</p>
          <p className="text-lg font-bold text-red-700 truncate max-w-full">
            {party.hostName}
          </p>
        </div>
      </div>

          {/* ครึ่งขวา */}
      <div className="p-4 w-full flex flex-col justify-between">
        <h1 className="font-bold text-xl text-center mb-2 text-red-600">{party.name}</h1>

        <div className="flex flex-col text-base text-gray-500 mb-6">
          <div className="flex">
            <p className="font-semibold text-gray-500 w-20">สถานที่:</p>
            <p className="font-medium text-gray-800">{party.location}</p>
          </div>

          <div className="flex">
            <p className="font-semibold text-gray-500 w-20">สาขา:</p>
            <p className="font-medium text-gray-800">{party.branchName}</p>
          </div>

          <div className="flex">
            <p className="font-semibold text-gray-500 w-20">วันที่:</p>
            <p className="font-medium text-gray-800">{party.date}</p>
          </div>

          <div className="flex">
            <p className="font-semibold text-gray-500 w-20">เวลา:</p>
            <p className="font-medium text-gray-800">{party.time}</p>
          </div>

          <div className="flex">
            <p className="font-semibold text-gray-500 w-20">จำนวน:</p>
            <p className="font-bold text-gray-800">
              {party.participants} / {party.maxParticipants}
            </p>
          </div>
        </div>

        <div className="flex text-sm text-gray-700 mb-4 ">
          <p className="font-semibold text-gray-500 w-20">รายละเอียด:</p>
          <p className="text-gray-800 flex-1">
            {party.details || "ไม่มีรายละเอียดเพิ่มเติม"}
          </p>
        </div>

        <Button
          className="w-full py-3 font-bold"
          onClick={onButtonClick}
          disabled={party.participants >= party.maxParticipants && !joined}
        >
          {party.participants >= party.maxParticipants && !joined
            ? "เต็มแล้ว"
            : joined
            ? "Leave"
            : "Join"}
        </Button>
      </div>
    </div>
  );
};

export default PartyCard;
