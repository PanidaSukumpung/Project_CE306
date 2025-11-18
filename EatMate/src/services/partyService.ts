import partyData from '../data/partyData.json';
console.log("Party data",partyData)

export interface Party {
    id: string;     
    name:string;   
    img ?:string;     
    restaurantId: string;   
    branchId: string; 
    branchName: string;
    hostName: string;      
    location: string;       
    participants: number;    
    maxParticipants: number; 
    details: string;         
    date: string;            
    time: string; 
    status?: string;
    
}

const STORAGE_KEY = "parties_data";

export const initParties = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    console.log("Initializing parties in localStorage...");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(partyData));
  } else {
    console.log("parties_data already exists in localStorage");
  }
};


const loadParties = (): Party[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  // clone deep จาก JSON
  return JSON.parse(JSON.stringify(partyData));
};

export const saveParties = (parties: Party[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parties));
};

export const getAllParties = (): Party[] => {
  const parties = loadParties();
  return parties;
};


export type UserPartyStatus = "joined" | "left" | "finished";

export interface MyParty extends Party {
  userStatus: UserPartyStatus;
  queueId ?: string;
}

export const getPartyById = (id: string): Party | undefined =>
  loadParties().find(p => p.id === id);

export const createParty = (partyDataInput: Omit<Party, "id" | "participants">): Party => {
  const parties = loadParties();
  const newParty: Party = {
    id: "P" + Date.now(), 
    status:"pending",
    participants: 1,      
    ...partyDataInput,
  };
   console.log("New party:", newParty);
  console.log("Parties before push:", parties.map(p => p.id));

  // ตรวจสอบว่ามี id ซ้ำกันหรือไม่
  if (parties.some(p => p.id === newParty.id)) {
    console.warn("Duplicate ID detected!", newParty.id);
  }
  
  parties.push(newParty);
  saveParties(parties);
  return newParty;
};

export const updateParty = (id: string, data: Partial<Omit<Party, "id">>): Party | null => {
  const parties = loadParties();
  const index = parties.findIndex(p => p.id === id);
  if (index === -1) return null;
  parties[index] = { ...parties[index], ...data };
  saveParties(parties);
  return parties[index];
};

export const deleteParty = (id: string): boolean => {
  const parties = loadParties();
  const index = parties.findIndex(p => p.id === id);
  if (index === -1) return false;
  parties.splice(index, 1);
  saveParties(parties);
  return true;
};

export const resetParties = (): void => {
  saveParties([...partyData]); 
};

// ระบบ My Party
const MY_PARTY_KEY = "my_parties_data";

export const getMyParties = (): MyParty[] => {
  const saved = localStorage.getItem(MY_PARTY_KEY);
  return saved ? (JSON.parse(saved) as MyParty[]) : [];
};

export const joinParty = (party: Party): void => {
  const allParties = getAllParties();
  const target = allParties.find(p => p.id === party.id);
  if (!target) return;

  const myParties = getMyParties();
  if (myParties.some(p => p.id === party.id)) return;

  // อัปเดตจำนวนคนใน Party หลักก่อน
  const updated = updateParty(party.id, {
    participants: target.participants + 1
  });

  // แปลง Party → MyParty แล้วบันทึก
  const joinedParty: MyParty = { ...updated!, userStatus: "joined" };
  myParties.push(joinedParty);
  localStorage.setItem(MY_PARTY_KEY, JSON.stringify(myParties));
};



export const leaveParty = (id: string): void => {
  const myParties = getMyParties();
  const filtered = myParties.filter(p => p.id !== id);
  localStorage.setItem(MY_PARTY_KEY, JSON.stringify(filtered));
};


export const saveMyParty = (party: Party): MyParty[] => {
  // โหลด myParties ปัจจุบัน
  const myParties: MyParty[] = JSON.parse(localStorage.getItem(MY_PARTY_KEY) || "[]");

  // ถ้ามี party เดิมแล้ว ไม่เพิ่มซ้ำ
  if (myParties.some(p => p.id === party.id)) return myParties;

  // แปลง Party → MyParty (participant default = 1, userStatus = "joined")
  const newMyParty: MyParty = {
    ...party,
    participants: party.participants ?? 1,
    userStatus: "joined"
  };

  // เพิ่ม party ใหม่
  const updatedMyParties = [...myParties, newMyParty];

  // บันทึกลง localStorage
  localStorage.setItem(MY_PARTY_KEY, JSON.stringify(updatedMyParties));

  return updatedMyParties;
};

