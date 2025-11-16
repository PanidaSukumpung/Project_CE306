import partyData from '../data/partyData.json';
console.log("Party data",partyData)

export interface Party {
    id: string;     
    name:string;   
    img ?:string;     
    restaurantId: string;    
    hostName: string;      
    location: string;       
    participants: number;    
    maxParticipants: number; 
    details: string;         
    date: string;            
    time: string; 
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
  return [...partyData]; 
};

const saveParties = (parties: Party[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parties));
};

export const getAllParties = (): Party[] => {
  console.log("Calling initParties...");
  initParties();
  const parties = loadParties();
  console.log("getAllParties -> parties:", parties);
  return parties;
};


export type PartyStatus = "joined" | "left" | "finished";

export interface MyParty extends Party {
  status: "joined" | "left" | "finished";
}

export interface MyParty extends Party {
  status: PartyStatus;
}


export const getPartyById = (id: string): Party | undefined =>
  loadParties().find(p => p.id === id);

export const createParty = (partyDataInput: Omit<Party, "id" | "participants">): Party => {
  const parties = loadParties();
  const newParty: Party = {
    id: "P" + Date.now(), 
    participants: 1,      
    ...partyDataInput,
  };
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
  const joinedParty: MyParty = { ...updated!, status: "joined" };
  myParties.push(joinedParty);
  localStorage.setItem(MY_PARTY_KEY, JSON.stringify(myParties));
};



export const leaveParty = (id: string): void => {
  const myParties = getMyParties();
  const filtered = myParties.filter(p => p.id !== id);
  localStorage.setItem(MY_PARTY_KEY, JSON.stringify(filtered));
};
