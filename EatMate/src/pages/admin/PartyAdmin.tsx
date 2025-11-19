import { useState } from "react";

// ========== TYPES ==========
interface Party {
  id: string;
  name: string; // ชื่อปาร์ตี้/อีเวนต์
  restaurantName: string; // ชื่อร้านอาหารที่จัด
  hostName: string; // ชื่อผู้จัด
  location: string; // สถานที่/โซน
  maxParticipants: string; // จำนวนผู้เข้าร่วมสูงสุด
  participants: number; // จำนวนผู้เข้าร่วมปัจจุบัน (ใช้แสดงผล)
  date: string; // วันที่
  time: string; // เวลา
  details: string; // รายละเอียด
  price: string; // ค่าใช้จ่าย
  image: string; // รูปภาพ
}

// ========== REUSABLE COMPONENTS ==========

// Button Component
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', className = '' }) => {
  const baseStyle = "px-4 py-3 font-bold rounded-xl shadow-lg transition-all active:scale-[0.99] transform";
  // Red/Black theme adapted variants
  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white shadow-red-900/50", // Save/Add
    secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-gray-900/50", // Cancel
    danger: "bg-red-800 hover:bg-red-900 text-white shadow-md", // Delete
    success: "bg-blue-600 hover:bg-blue-700 text-white shadow-md" // Edit (Using blue for contrast with red theme)
  };
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// Input Component
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'tel' | 'number' | 'date' | 'time';
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
        className="w-full h-12 bg-white/20 p-3 rounded-xl text-white placeholder-red-200 outline-none focus:ring-2 focus:ring-red-400"
        type={type}
      />
    </div>
  );
};

// TextArea Component
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

// ImageUploader Component
interface ImageUploaderProps {
  image: string;
  onImageChange: (image: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageChange }) => {
  // Mock image upload logic (converting file to base64)
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
      <label className="text-white font-bold text-lg block mb-2">รูปภาพประกอบปาร์ตี้ (Image)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="text-red-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer file:font-bold"
      />
      {image && (
        <div className="mt-4 relative">
          <img src={image} alt="Preview" className="w-full h-48 object-cover rounded-xl shadow-md border border-white/30" />
          <button
            onClick={() => onImageChange("")}
            className="absolute top-2 right-2 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-lg text-sm font-bold opacity-90 transition-opacity"
          >
            ✖ ลบรูป
          </button>
        </div>
      )}
    </div>
  );
};

// PartyCard Component
interface PartyCardProps {
  party: Party;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PartyCard: React.FC<PartyCardProps> = ({ party, onEdit, onDelete }) => {
  return (
    <div className="bg-white/10 p-4 rounded-xl border border-red-500/30 transition-all hover:bg-white/15 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {party.image && (
          <img 
            src={party.image} 
            alt={party.name}
            className="w-full md:w-48 h-48 object-cover rounded-lg shadow-inner shadow-black/30 flex-shrink-0"
          />
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-600/50 text-white">
              ID: {party.id}
            </span>
            <span className="text-sm font-bold text-yellow-300">
              👥 {party.participants}/{party.maxParticipants} ท่าน
            </span>
          </div>
          
          <p className="text-white font-extrabold text-2xl mb-2">{party.name}</p>
          <p className="text-red-200 text-sm">📍 สถานที่: <span className="font-semibold text-white">{party.restaurantName} ({party.location})</span></p>
          
          <p className="text-red-200 text-sm">👤 ผู้จัด: {party.hostName}</p>
          
          <div className="mt-2 text-sm space-y-1">
            <p className="text-white font-bold">📅 วันที่: <span className="text-red-300">{party.date}</span></p>
            <p className="text-white font-bold">⏰ เวลา: <span className="text-red-300">{party.time}</span></p>
            <p className="text-green-300 font-bold">💰 ค่าใช้จ่าย: {party.price}</p>
            <p className="text-red-200 italic mt-2 line-clamp-2">📝 {party.details}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 self-start md:self-center">
          <Button onClick={() => onEdit(party.id)} variant="success" className="text-sm w-full ">
            ✏️ แก้ไข
          </Button>
          <Button onClick={() => onDelete(party.id)} variant="danger" className="text-sm w-full">
            🗑️ ลบ
          </Button>
        </div>
      </div>
    </div>
  );
};

// PartyForm Component
interface PartyFormProps {
  formData: Omit<Party, 'id' | 'participants'>;
  onFormChange: (field: keyof Omit<Party, 'id' | 'participants'>, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const PartyForm: React.FC<PartyFormProps> = ({ formData, onFormChange, onSave, onCancel, isEditing }) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white/10 p-8 rounded-xl shadow-2xl border-2 border-red-500/70 mb-8 backdrop-blur-md">
      <h3 className="text-3xl font-bold text-white mb-6">
        {isEditing ? "แก้ไขข้อมูลปาร์ตี้" : "สร้างปาร์ตี้ใหม่"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Row 1: Name and Host */}
        <Input
          label="ชื่อปาร์ตี้ (Party Name)"
          value={formData.name}
          onChange={(val) => onFormChange('name', val)}
          placeholder="ปาร์ตี้รวมคนชอบชาบู"
        />
        <Input
          label="ชื่อผู้จัด (Host Name)"
          value={formData.hostName}
          onChange={(val) => onFormChange('hostName', val)}
          placeholder="ชื่อของคุณ"
        />

        {/* Row 2: Restaurant Name and Location */}
        <Input
          label="ชื่อร้านอาหารที่จัด (Restaurant Name)"
          value={formData.restaurantName}
          onChange={(val) => onFormChange('restaurantName', val)}
          placeholder="ชาบูอินดี้"
        />
        <Input
          label="สถานที่/โซน (Location)"
          value={formData.location}
          onChange={(val) => onFormChange('location', val)}
          placeholder="เช่น หน้าห้าง "
        />

        {/* Row 3: Date, Time, Max Participants */}
        <Input
          label="วันที่จัด (Date)"
          value={formData.date}
          onChange={(val) => onFormChange('date', val)}
          type="date"
          placeholder="DD/MM/YYYY"
        />
        <Input
          label="เวลา (Time)"
          value={formData.time}
          onChange={(val) => onFormChange('time', val)}
          type="time"
          placeholder="HH:MM"
        />
        <Input
          label="จำนวนผู้เข้าร่วมสูงสุด (Max Seats)"
          value={formData.maxParticipants}
          onChange={(val) => onFormChange('maxParticipants', val)}
          type="number"
          placeholder="เช่น 10"
        />
        
        <Input
          label="ค่าใช้จ่าย (Price)"
          value={formData.price}
          onChange={(val) => onFormChange('price', val)}
          placeholder="เช่น ฟรี, 299 บาท/คน"
        />

        {/* Row 4: Details and Image */}
        <TextArea
          label="รายละเอียดปาร์ตี้ (Details)"
          value={formData.details}
          onChange={(val) => onFormChange('details', val)}
          placeholder="แจ้งรายละเอียดการนัดหมาย หรือข้อความต้อนรับ"
          className="col-span-1 md:col-span-2"
        />
      </div>

      <ImageUploader image={formData.image} onImageChange={(val) => onFormChange('image', val)} />

      <div className="flex gap-4 mt-6">
        <Button onClick={onSave} variant="primary" className="flex-1 text-lg">
          {isEditing ? "💾 บันทึกการแก้ไขปาร์ตี้" : "➕ สร้างปาร์ตี้"}
        </Button>
        {isEditing && (
          <Button onClick={onCancel} variant="secondary" className="px-6 text-lg">
            ✖ ยกเลิก
          </Button>
        )}
      </div>
    </div>
  );
};

// PartyList Component
interface PartyListProps {
  parties: Party[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PartyList: React.FC<PartyListProps> = ({ parties, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white/10 p-8 rounded-xl shadow-2xl border-2 border-red-500/70 backdrop-blur-md">
      <h3 className="text-3xl font-bold text-white mb-6">รายการปาร์ตี้ทั้งหมด</h3>
      
      <div className="bg-red-600/50 p-4 rounded-lg mb-6 flex justify-between items-center border border-red-400">
        <p className="text-red-200 text-base">จำนวนปาร์ตี้ในระบบ</p>
        <p className="text-white text-base font-black">{parties.length} ปาร์ตี้</p>
      </div>

      {parties.length === 0 ? (
        <div className="text-center text-red-200 py-8 text-xl">ยังไม่มีปาร์ตี้ในระบบ ลองสร้างปาร์ตี้แรกดูสิ!</div>
      ) : (
        <div className="space-y-6">
          {parties.map((party) => (
            <PartyCard
              key={party.id}
              party={party}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ========== MAIN COMPONENT (App) ==========
const PartyAdmin: React.FC = () => {
  const initialFormData: Omit<Party, 'id' | 'participants'> = {
    name: "",
    restaurantName: "",
    hostName: "",
    location: "Siam",
    maxParticipants: "",
    date: "",
    time: "",
    details: "",
    price: "",
    image: ""
  };

  const [parties, setParties] = useState<Party[]>([
    { 
      id: "P001", 
      name: "นัดกินบุฟเฟต์วันหยุด", 
      restaurantName: "ร้านเนื้อย่างคิงคอง",
      hostName: "สมชาย จัดให้",
      location: "Ratchada",
      maxParticipants: "8",
      participants: 5,
      date: "2025-12-25",
      time: "19:00",
      details: "นัดรวมตัวคนที่ชอบปิ้งย่าง ใครมาลงชื่อเลยนะครับ! ค่าใช้จ่ายหารตามจริง",
      price: "799 บาท/คน",
      image: "https://placehold.co/400x300/a31c1c/FFFFFF?text=Party+Image"
    }
  ]);

  const [formData, setFormData] = useState<Omit<Party, 'id' | 'participants'>>(initialFormData);
  const [editId, setEditId] = useState<string | null>(null);

  const handleFormChange = (field: keyof Omit<Party, 'id' | 'participants'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.restaurantName || !formData.date || !formData.maxParticipants) {
      // Custom Modal/Message Box replacement for alert
      console.error("กรุณากรอกข้อมูลที่จำเป็น: ชื่อปาร์ตี้, ชื่อร้าน, วันที่, และจำนวนผู้เข้าร่วมสูงสุด");
      // Note: In a real app, you'd show a UI message here instead of console.error
      return;
    }
    
    // Simple logic to ensure maxParticipants is a positive number string
    const maxP = parseInt(formData.maxParticipants);
    const maxParticipantsStr = isNaN(maxP) || maxP <= 0 ? "1" : String(maxP);

    if (editId === null) {
      // Add new party
      const newId = "P" + String(parties.length + 1).padStart(3, '0');
      const newParty: Party = { 
        id: newId, 
        ...formData, 
        maxParticipants: maxParticipantsStr,
        participants: 0 // New party starts with 0 participants
      };
      setParties([...parties, newParty]);
      console.log(`Created new party: ${newId}`);
    } else {
      // Update existing party
      setParties(parties.map(p => 
        p.id === editId ? 
        { 
          ...p, 
          ...formData, 
          maxParticipants: maxParticipantsStr 
        } : p
      ));
      console.log(`Updated party: ${editId}`);
      setEditId(null);
    }

    setFormData(initialFormData);
  };

  const handleEdit = (id: string) => {
    const party = parties.find(p => p.id === id);
    if (party) {
      // Destructure and omit 'id' and 'participants' as they are read-only in the form
      const { id: _, participants: __, ...data } = party; 
      setFormData(data);
      setEditId(id);
      // Scroll to the form for easy editing
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("ต้องการลบร้านนี้ใช่หรือไม่?")) {
      setParties(parties.filter(r => r.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-900 to-red-700 font-sans p-4 sm:p-8">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-black text-white mb-2 tracking-wide drop-shadow-lg"> Party Admin</h2>
        <p className="text-red-300 text-lg">ระบบจัดการปาร์ตี้</p>
      </div>

      <PartyForm
        formData={formData}
        onFormChange={handleFormChange}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={editId !== null}
      />

      <PartyList
        parties={parties}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {/* Optional: Add a simple footer for padding */}
      <div className="h-16"></div>
    </div>
  );
};

export default PartyAdmin;