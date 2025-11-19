import { useState } from "react";

// ========== TYPES ==========
// โครงสร้างข้อมูลสำหรับร้านอาหารแต่ละร้าน
interface Restaurant {
  id: string; // ID เฉพาะของร้าน (R01, R02,...)
  name: string; // ชื่อร้านอาหาร
  category: string; // หมวดหมู่ เช่น ชาบู, Desert
  promotion: string; // โปรโมชั่นของร้าน
  description: string; // รายละเอียดเกี่ยวกับร้าน
  date: string; // วันที่หรือช่วงเวลา เช่น ตุลาคม 2024
  party: string; // จำนวนที่นั่ง/กลุ่ม
  price: string; // ราคาหรือเงื่อนไข เช่น ฟรี, 299 บาท
  image: string; // URL รูปภาพ (ใช้ base64 จาก ImageUploader)
}

// ========== REUSABLE COMPONENTS ==========

// Button Component (ปุ่มกดแบบมีสไตล์)
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', className = '' }) => {
  // สไตล์พื้นฐานสำหรับปุ่ม (ทำให้มีเงา, ขอบมน, มีแอนิเมชันตอนกด)
  const baseStyle = "px-4 py-3 font-bold rounded-xl shadow-lg transition-all active:scale-[0.99] transform";
  // สไตล์สีที่แตกต่างกันตาม variant
  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white shadow-red-900/50",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-gray-900/50",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-md",
    success: "bg-blue-600 hover:bg-blue-700 text-white shadow-md" // ใช้สีน้ำเงินแทนเขียวเพื่อให้เข้ากับธีมแดง-ดำ
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// Input Component (ช่องกรอกข้อความทั่วไป)
interface InputProps {
  label: string; // ข้อความกำกับ (Label)
  value: string; // ค่าปัจจุบัน
  onChange: (value: string) => void; // ฟังก์ชันเมื่อค่ามีการเปลี่ยนแปลง
  placeholder: string; // ข้อความตัวอย่างในช่องกรอก
  type?: 'text' | 'tel';
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, type = 'text', className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="text-white font-bold text-lg block mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        // สไตล์ช่องกรอก: พื้นหลังโปร่งใส, ขอบมน, ตัวอักษรสีขาว
        className="w-full h-12 bg-white/20 p-3 rounded-xl text-white placeholder-red-200 outline-none focus:ring-2 focus:ring-red-400"
        type={type}
      />
    </div>
  );
};

// TextArea Component (ช่องกรอกข้อความหลายบรรทัด)
interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, placeholder, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="text-white font-bold text-lg block mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-24 bg-white/20 p-3 rounded-xl text-white placeholder-red-200 outline-none focus:ring-2 focus:ring-red-400 resize-none"
      />
    </div>
  );
};

// Select Component (ช่องเลือกจากตัวเลือก)
interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; icon?: string }[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, className = '' }) => {
  // ใช้ SVG data-uri เป็นไอคอนลูกศร dropdown เพื่อให้สอดคล้องกับธีม
  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1.5em 1.5em',
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="text-white font-bold text-lg block mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // appearance-none เพื่อซ่อนลูกศร default แล้วใช้ไอคอน SVG แทน
        className="w-full h-12 bg-white/20 p-3 rounded-xl text-white outline-none appearance-none focus:ring-2 focus:ring-red-400"
        style={selectStyle}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-800 text-white">
            {option.icon && `${option.icon} `}{option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// ImageUploader Component (สำหรับอัปโหลดและแสดงรูปภาพ)
interface ImageUploaderProps {
  image: string; // รูปภาพที่ถูกแปลงเป็น Base64 string
  onImageChange: (image: string) => void; // ฟังก์ชันเมื่อรูปภาพเปลี่ยน/ถูกลบ
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageChange }) => {
  // เมื่อมีการเลือกไฟล์ (ใช้ FileReader แปลงเป็น Base64)
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6 col-span-1 md:col-span-2">
      <label className="text-white font-bold text-lg block mb-2">รูปภาพร้านอาหาร (Image)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        // สไตล์ปุ่มเลือกไฟล์
        className="text-red-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer file:font-bold"
      />
      {image && (
        <div className="mt-4 relative">
          <img src={image} alt="Preview" className="w-full h-48 object-cover rounded-xl shadow-md" />
          {/* ปุ่มสำหรับลบรูปภาพที่เลือก */}
          <button
            onClick={() => onImageChange("")}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-bold opacity-90 transition-opacity"
          >
            ✖ ลบรูป
          </button>
        </div>
      )}
    </div>
  );
};

// RestaurantCard Component (แสดงข้อมูลร้านอาหารแต่ละร้าน)
interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onEdit, onDelete }) => {
  return (
    // การ์ดที่แสดงข้อมูลร้าน
    <div className="bg-white/10 p-4 rounded-lg border border-white/20 transition-all hover:bg-white/20">
      {restaurant.image && (
        // รูปภาพร้านอาหาร (ถ้ามี)
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-inner shadow-black/30"
        />
      )}

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          {/* แสดง ID ร้านและข้อมูลอื่นๆ */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-600/50 text-white">
              ID: {restaurant.id}
            </span>
          </div>

          <p className="text-white font-extrabold text-xl mb-2">{restaurant.name}</p>
          <p className="text-red-200 text-sm">🗂️ หมวดหมู่: {restaurant.category || "ไม่ระบุ"}</p>

          {/* แสดงรายละเอียดเฉพาะเมื่อมีข้อมูล */}
          {restaurant.promotion && (
            <p className="text-yellow-300 text-sm font-semibold">🎁 โปรโมชั่น: {restaurant.promotion}</p>
          )}
          {restaurant.description && (
            <p className="text-red-200 text-sm">📝 {restaurant.description}</p>
          )}
          {restaurant.date && (
            <p className="text-red-200 text-sm">📅 วันที่: {restaurant.date}</p>
          )}
          {restaurant.party && (
            <p className="text-red-200 text-sm">👥 จำนวนที่นั่ง: {restaurant.party}</p>
          )}
          {restaurant.price && (
            <p className="text-green-300 text-sm font-bold">💰 ราคา: {restaurant.price}</p>
          )}
        </div>

        {/* ปุ่ม แก้ไข/ลบ */}
        <div className="flex gap-2 self-start md:self-center">
          <Button onClick={() => onEdit(restaurant.id)} variant="success" className="text-sm px-4 py-2">
            ✏️ แก้ไข
          </Button>
          <Button onClick={() => onDelete(restaurant.id)} variant="danger" className="text-sm px-4 py-2">
            🗑️ ลบ
          </Button>
        </div>
      </div>
    </div>
  );
};

// RestaurantForm Component (ฟอร์มสำหรับเพิ่ม/แก้ไข ร้านอาหาร)
interface RestaurantFormProps {
  formData: Omit<Restaurant, 'id'>;
  onFormChange: (field: keyof Omit<Restaurant, 'id'>, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing: boolean; // สถานะว่ากำลังแก้ไขอยู่หรือไม่
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ formData, onFormChange, onSave, onCancel, isEditing }) => {
  // ตัวเลือกสำหรับหมวดหมู่
  const categoryOptions = [
    { value: "ชาบู", label: "ชาบู", icon: "🍲" },
    { value: "Desert", label: "Desert", icon: "☕" }
  ];

  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white/10 p-8 rounded-xl shadow-2xl border border-red-500/50 mb-8">
      <h3 className="text-2xl font-bold text-white mb-6">
        {isEditing ? "แก้ไขข้อมูลร้านอาหาร" : "เพิ่มร้านอาหารใหม่"}
      </h3>

      {/* Layout แบบ Grid 2 คอลัมน์สำหรับฟอร์ม */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ใช้ col-span-2 สำหรับช่องที่ต้องการความกว้างเต็ม */}
        <Input
          label="ชื่อร้านอาหาร (Name)"
          value={formData.name}
          onChange={(val) => onFormChange('name', val)}
          placeholder="ชื่อร้านอาหาร"
          className="col-span-1 md:col-span-2"
        />

        <Select
          label="หมวดหมู่ (Category)"
          value={formData.category}
          onChange={(val) => onFormChange('category', val)}
          options={categoryOptions}
        />

        <Input
          label="โปรโมชั่น (Promotion)"
          value={formData.promotion}
          onChange={(val) => onFormChange('promotion', val)}
          placeholder="เช่น ลด 20% สำหรับนักเรียน"
        />

        <TextArea
          label="คำอธิบาย (Description)"
          value={formData.description}
          onChange={(val) => onFormChange('description', val)}
          placeholder="รายละเอียดเกี่ยวกับร้านอาหาร"
          className="col-span-1 md:col-span-2"
        />

        <Input
          label="วันที่/เดือน (Date)"
          value={formData.date}
          onChange={(val) => onFormChange('date', val)}
          placeholder="เช่น ตุลาคม 2024"
        />

        <Input
          label="จำนวนที่นั่ง (Party)"
          value={formData.party}
          onChange={(val) => onFormChange('party', val)}
          placeholder="เช่น 4-6 ท่าน"
        />

        <Input
          label="ราคา (Price)"
          value={formData.price}
          onChange={(val) => onFormChange('price', val)}
          placeholder="เช่น ฟรี หรือ 299 บาท"
          className="col-span-1 md:col-span-2"
        />
      </div>

      <ImageUploader image={formData.image} onImageChange={(val) => onFormChange('image', val)} />

      <div className="flex gap-4">
        {/* ปุ่มบันทึก (เพิ่ม/แก้ไข) */}
        <Button onClick={onSave} variant="primary" className="flex-1">
          {isEditing ? "💾 บันทึกการแก้ไข" : "➕ เพิ่มร้านอาหาร"}
        </Button>
        {/* ปุ่มยกเลิก จะแสดงเฉพาะตอนกำลังแก้ไข */}
        {isEditing && (
          <Button onClick={onCancel} variant="secondary" className="px-6">
            ✖ ยกเลิก
          </Button>
        )}
      </div>
    </div>
  );
};

// RestaurantList Component (แสดงรายการร้านอาหารทั้งหมด)
interface RestaurantListProps {
  restaurants: Restaurant[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white/10 p-8 rounded-xl shadow-2xl border border-red-500/50 ">
      <h3 className="text-2xl font-bold text-white mb-6">รายการร้านอาหารทั้งหมด</h3>

      {/* กล่องแสดงจำนวนร้านทั้งหมด */}
      <div className="bg-red-600/50 p-4 rounded-lg mb-6 flex justify-between items-center border border-red-400">
        <p className="text-red-200 text-base">จำนวนร้านทั้งหมด</p>
        <p className="text-white text-base font-black">{restaurants.length} ร้าน</p>
      </div>

      {restaurants.length === 0 ? (
        <div className="text-center text-red-200 py-8">ยังไม่มีร้านอาหารในระบบ</div>
      ) : (
        <div className="space-y-4">
          {/* วนลูปแสดง RestaurantCard สำหรับแต่ละร้าน */}
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ========== MAIN COMPONENT ==========
// คอมโพเนนต์หลัก: ระบบจัดการร้านอาหารทั้งหมด
const RestaurantAdmin: React.FC = () => {
  // ข้อมูลเริ่มต้นสำหรับฟอร์มเปล่า
  const initialFormData: Omit<Restaurant, 'id'> = {
    name: "",
    category: "ชาบู",
    promotion: "",
    description: "",
    date: "",
    party: "",
    price: "",
    image: ""
  };

  // State สำหรับเก็บรายการร้านอาหารทั้งหมด (มีข้อมูล mock เริ่มต้น 1 รายการ)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: "R01",
      name: "ร้านอาหารไทยโบราณ",
      category: "ชาบู",
      promotion: "ส่วนลด 10% ทุกวันจันทร์",
      description: "ร้านอาหารไทยต้นตำรับรสชาติดั้งเดิม",
      date: "ตุลาคม 2024",
      party: "4-6 ท่าน",
      price: "ฟรี",
      image: ""
    }
  ]);

  // State สำหรับข้อมูลในฟอร์มปัจจุบัน (เพิ่ม/แก้ไข)
  const [formData, setFormData] = useState<Omit<Restaurant, 'id'>>(initialFormData);
  // State สำหรับเก็บ ID ของร้านที่กำลังแก้ไข (เป็น null ถ้าเป็นการเพิ่มใหม่)
  const [editId, setEditId] = useState<string | null>(null);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าในฟอร์ม
  const handleFormChange = (field: keyof Omit<Restaurant, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ฟังก์ชันจัดการการบันทึกข้อมูล (เพิ่มใหม่ หรือ บันทึกการแก้ไข)
  const handleSave = () => {
    // ตรวจสอบความถูกต้องของข้อมูลเบื้องต้น
    if (formData.name === "") {
      // ควรใช้ custom modal แทน alert()
      console.error("กรุณากรอกชื่อร้าน");
      return;
    }

    if (editId === null) {
      // 1. การเพิ่มใหม่: สร้าง ID ใหม่ (R02, R03, ...)
      const newId = "R" + String(restaurants.length + 1).padStart(2, '0');
      setRestaurants([...restaurants, { id: newId, ...formData }]);
    } else {
      // 2. การแก้ไข: อัปเดตข้อมูลร้านเดิมด้วย ID ที่ตรงกัน
      setRestaurants(restaurants.map(r => r.id === editId ? { id: editId, ...formData } : r));
      setEditId(null); // รีเซ็ตสถานะการแก้ไข
    }

    // ล้างฟอร์มหลังจากบันทึกเสร็จ
    setFormData(initialFormData);
  };

  // ฟังก์ชันสำหรับเริ่มการแก้ไข: โหลดข้อมูลร้านลงในฟอร์ม
  const handleEdit = (id: string) => {
    const restaurant = restaurants.find(r => r.id === id);
    if (restaurant) {
      // โหลดข้อมูล (ยกเว้น id) ลงใน state ของฟอร์ม
      const { id: _, ...data } = restaurant;
      setFormData(data);
      setEditId(id);
      // เลื่อนหน้าจอไปด้านบนเพื่อให้เห็นฟอร์มทันทีที่กดแก้ไข
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ฟังก์ชันสำหรับลบร้านอาหาร
  const handleDelete = (id: string) => {
    // ใช้ confirm() ชั่วคราว (แต่ควรใช้ custom modal)
    if (confirm("ต้องการลบร้านนี้ใช่หรือไม่?")) {
      setRestaurants(restaurants.filter(r => r.id !== id)); // กรองร้านที่ถูกลบออก
    }
  };

  // ฟังก์ชันสำหรับยกเลิกการแก้ไข/เคลียร์ฟอร์ม
  const handleCancel = () => {
    setFormData(initialFormData);
    setEditId(null);
  };

  return (
    // กำหนดสไตล์พื้นหลังให้ดูน่าสนใจและตอบสนองต่อทุกขนาดหน้าจอ
    <div className="min-h-screen bg-gradient-to-b from-black via-red-900 to-red-700 font-sans p-4 sm:p-8">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-black text-white mb-2 tracking-wide drop-shadow-lg">Restaurant Admin</h2>
        <p className="text-red-300 text-lg">ระบบจัดการร้านอาหาร</p>
      </div>

      {/* ฟอร์มสำหรับเพิ่ม/แก้ไขร้านอาหาร (จะแสดงสถานะตามค่า editId) */}
      <RestaurantForm
        formData={formData}
        onFormChange={handleFormChange}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={editId !== null}
      />

      {/* รายการร้านอาหารทั้งหมด */}
      <RestaurantList
        restaurants={restaurants}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RestaurantAdmin;