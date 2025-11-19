import type { FC } from "react";
import { useState, useEffect } from "react";
import Button from "./Button";
import { createParty } from "../services/partyService";
import type { Party } from "../services/partyService";
import { getBranchesByRestaurant } from "../services/restaurantService";
import type { Branch } from "../services/restaurantService";
import { getAllParties ,joinParty, saveMyParty} from "../services/partyService";
// import type { MyParty } from "../services/partyService";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  restaurantId?: string;
  restaurantName?: string;
  onCreate?: (newParty: Party) => void;
}

const CreateParty: FC<Props> = ({
  isOpen,
  onClose,
  restaurantId,
  restaurantName,
  onCreate,
}) => {
  const [branch, setBranch] = useState<Branch[]>([]);
  // const [myParties, setMyParties] = useState<MyParty[]>(getMyParties());
  const [formData, setFormData] = useState({
    partyName: "",
    restaurantId: restaurantId || "",
    restaurantName: restaurantName || "",
    hostName: "",
    location: "",
    maxParticipants: 2,
    date: "",
    time: "",
    details: "",
    branchId: "",
    branchName: "",
  });

  useEffect(() => {
    if (restaurantId || restaurantName) {
      setFormData((prev) => ({
        ...prev,
        restaurantId: restaurantId || "",
        restaurantName: restaurantName || "",
      }));
    }
  }, [restaurantId, restaurantName]);
  useEffect(() => {
    if (restaurantId) {
      const branch_data = getBranchesByRestaurant(restaurantId);
      setBranch(branch_data);
    } else {
      setBranch([]);
    }
  }, [restaurantId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "branchId") {
      const selectedBranch = branch.find((b) => b.branchId === value);
      if (selectedBranch) {
        setFormData((prev) => ({
          ...prev,
          branchId: selectedBranch.branchId,
          branchName: selectedBranch.branchName,
        }));
      }
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxParticipants" ? Number(value) : value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.partyName ||
      !formData.restaurantId ||
      !formData.hostName ||
      !formData.branchId ||
      !formData.date ||
      !formData.time
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      console.log("Before createParty in CreateParty", getAllParties().map(p => p.id));
      const newParty = createParty({
        name: formData.partyName,
        restaurantId: formData.restaurantId,
        hostName: formData.hostName,
        location: formData.restaurantName,
        maxParticipants: formData.maxParticipants,
        details: formData.details,
        date: formData.date,
        time: formData.time,
        branchId: formData.branchId,
        branchName: formData.branchName,
      });

      console.log("สร้างปาร์ตี้ใหม่:", newParty);
      onCreate?.(newParty);
      
      joinParty(newParty)
      saveMyParty(newParty);
      // setMyParties(getMyParties()); 


      setFormData({
        partyName: "",
        restaurantId: restaurantId || "",
        restaurantName: restaurantName || "",
        hostName: "",
        location: "",
        maxParticipants: 2,
        date: "",
        time: "",
        details: "",
        branchId: "",
        branchName: "",
      });

      onClose();

      navigate("/myparty");
      
    } catch (err) {
      console.error("Fail", err);
      alert("เกิดข้อผิดพลาดในการสร้างปาร์ตี้");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-30 p-6 ">
      <div className="bg-white flex flex-col w-full md:w-4/6 h-full max-h-[90vh] md:h-3/6 justify-between rounded-md shadow-xl 
">
        {/* หัว */}
        <div className="w-full flex justify-center font-bold text-xl bg-red-600 rounded-t-md">
          <p className="text-white p-4">Create Party</p>
        </div>

        {/* ฟอร์ม */}
        <div className="flex flex-col flex-1 w-full bg-white p-3 md:p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full h-full justify-evenly">
            {/* ชื่อปาร์ตี้ */}
            <div className="flex flex-col">
              <label
                htmlFor="partyName"
                className="font-semibold text-gray-700"
              >
                ชื่อปาร์ตี้
              </label>
              <input
                type="text"
                id="partyName"
                name="partyName"
                placeholder="กรอกชื่อปาร์ตี้"
                value={formData.partyName}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>

            {/* เจ้าของปาร์ตี้ */}
            <div className="flex flex-col">
              <label htmlFor="hostName" className="font-semibold text-gray-700">
                ชื่อเจ้าของปาร์ตี้
              </label>
              <input
                type="text"
                id="hostName"
                name="hostName"
                placeholder="ชื่อเจ้าของปาร์ตี้"
                value={formData.hostName}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>

            {/* วันที่ / เวลา / จำนวน */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col w-full md:w-1/3">
                <label htmlFor="date" className="font-semibold text-gray-700">
                  วันที่
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                />
              </div>

              <div className="flex flex-col w-full md:w-1/3">
                <label htmlFor="time" className="font-semibold text-gray-700">
                  เวลา
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                />
              </div>

              <div className="flex flex-col w-full md:w-1/3">
                <label
                  htmlFor="maxParticipants"
                  className="font-semibold text-gray-700"
                >
                  จำนวนสูงสุด
                </label>
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  min={1}
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                />
              </div>
            </div>

            {/* รายละเอียดเพิ่มเติม */}
            <div className="flex flex-col">
              <label htmlFor="details" className="font-semibold text-gray-700">
                รายละเอียดเพิ่มเติม
              </label>
              <textarea
                id="details"
                name="details"
                rows={3}
                placeholder="เช่น นัดเจอกันที่หน้าร้าน หรือบอกเพิ่มเติม"
                value={formData.details}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center space-x-2">
              {/* ร้านอาหาร (auto fill) */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="restaurantName"
                  className="font-semibold text-gray-700"
                >
                  ร้านอาหาร
                </label>
                <input
                  type="text"
                  id="restaurantName"
                  name="restaurantName"
                  placeholder="ชื่อร้านอาหาร"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  disabled={!!restaurantName}
                  className={`border rounded-md p-2 ${
                    restaurantName ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              {/* เลือกสาขา */}
              <div className="flex flex-col w-full ">
                <label
                  htmlFor="restaurantName"
                  className="font-semibold text-gray-700"
                >
                  สาขา
                </label>
                <select
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                >
                  <option value="">เลือกสาขา</option>
                  {branch.map((b) => (
                    <option key={b.branchId} value={b.branchId}>
                      {b.branchName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ปุ่ม */}
            <div className="flex w-full justify-evenly gap-6 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
              <Button type="submit" size="lg">
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateParty;
