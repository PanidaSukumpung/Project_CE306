import type { FC } from "react";
import { useState, useEffect } from "react";
import Button from "./Button";
import { createParty } from "../services/partyService"; 
import type { Party } from "../services/partyService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  restaurantId?: string;
  restaurantName?: string;
  onCreate?: (newParty: Party) => void;
}

const CreateParty: FC<Props> = ({ isOpen, onClose, restaurantId, restaurantName,onCreate }) => {
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
  });

//ตั้งrestaurantName ให้เป็น auto fill
  useEffect(() => {
    if (restaurantId || restaurantName) {
      setFormData((prev) => ({
        ...prev,
        restaurantId: restaurantId || "",
        restaurantName: restaurantName || "",
      }));
    }
  }, [restaurantId, restaurantName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxParticipants" ? Number(value) : value,
      
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ ตรวจสอบฟิลด์ที่จำเป็น
    if (!formData.partyName || !formData.restaurantId || !formData.hostName) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      
        const newParty = createParty({
        name: formData.partyName,
        restaurantId: formData.restaurantId,
        hostName: formData.hostName,
        location: formData.location,
        maxParticipants: formData.maxParticipants,
        details: formData.details,
        date: formData.date,
        time: formData.time,
      });

      console.log("สร้างปาร์ตี้ใหม่:", newParty);
      onCreate?.(newParty);

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
    });

      onClose();
    } catch (err) {
      console.error("Fail", err);
      alert("เกิดข้อผิดพลาดในการสร้างปาร์ตี้");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-30 p-6">
      <div className="bg-white flex flex-col w-10/12 md:w-1/2 justify-between rounded-md shadow-xl">
        {/* หัว */}
        <div className="w-full flex justify-center font-bold text-xl bg-red-600 rounded-t-md">
          <p className="text-white p-4">Create Party</p>
        </div>

        {/* ฟอร์ม */}
        <div className="flex flex-col bg-white w-full p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ชื่อปาร์ตี้ */}
            <div className="flex flex-col">
              <label htmlFor="partyName" className="font-semibold text-gray-700">
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

            {/* ร้านอาหาร (auto fill) */}
            <div className="flex flex-col">
              <label htmlFor="restaurantName" className="font-semibold text-gray-700">
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
                className={`border rounded-md p-2 ${restaurantName ? "bg-gray-100" : ""}`}
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

            {/* สถานที่ */}
            <div className="flex flex-col">
              <label htmlFor="location" className="font-semibold text-gray-700">
                สถานที่
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="สถานที่นัดเจอ"
                value={formData.location}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>

            {/* วันที่ / เวลา / จำนวน */}
            <div className="flex justify-between gap-4">
              <div className="flex flex-col w-1/3">
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

              <div className="flex flex-col w-1/3">
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

              <div className="flex flex-col w-1/3">
                <label htmlFor="maxParticipants" className="font-semibold text-gray-700">
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

            {/* ปุ่ม */}
            <div className="flex w-full justify-evenly gap-6 mt-6">
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
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
