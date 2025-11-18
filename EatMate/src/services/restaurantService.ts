/**
 * นำเข้าข้อมูลร้านอาหารเริ่มต้นจากไฟล์ JSON
 * ใช้เป็นข้อมูลตั้งต้นเมื่อไม่มีข้อมูลใน localStorage
 */
import restaurantsData from '../data/restaurantData.json';
import branch from '../data/branch.json'

/**
 * Interface กำหนดโครงสร้างข้อมูลร้านอาหาร
 * @interface Restaurant
 * @property {string} id - รหัสเฉพาะของร้านอาหาร (Primary Key)
 * @property {string} name - ชื่อร้านอาหาร
 * @property {string} category - ประเภทร้าน (เช่น ชาบู, ของหวาน)
 * @property {string} promotion - โปรโมชั่นที่จัดอยู่
 * @property {string} description - รายละเอียดของโปรโมชั่นหรือร้าน
 * @property {string} date - วันที่อัปเดตข้อมูล
 * @property {number} party - จำนวนคนในปาร์ตี้
 * @property {string} [price] - ราคาหรือข้อความราคา (ไม่บังคับ)
 */
export interface Restaurant {
  id: string;
  image: string;
  name: string;
  category: string;
  promotion: string;
  description: string;
  date: string;
  party: number;
  price?: string;
}

export interface Branch {
  branchId: string;
  restaurantId: string;
  branchName: string;
}

/**
 * คีย์สำหรับเก็บข้อมูลใน localStorage
 */
const STORAGE_KEY = 'restaurant_data';

/**
 * โหลดข้อมูลร้านอาหารจาก localStorage หรือใช้ข้อมูลเริ่มต้นจาก JSON
 */
const loadRestaurants = (): Restaurant[] => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    return JSON.parse(savedData);
  }
  return [...restaurantsData];
};

/**
 * บันทึกข้อมูลร้านอาหารลง localStorage
 */
const saveRestaurants = (restaurants: Restaurant[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
};

/**
 * ดึงข้อมูลร้านอาหารทั้งหมด
 */
export const getAllRestaurants = (): Restaurant[] => {
  return loadRestaurants();
};


/**
 * ค้นหาร้านอาหารจากรหัส (ID)
 */
export const getRestaurantById = (id: string): Restaurant | undefined => {
  const restaurants = loadRestaurants();
  return restaurants.find((r) => r.id === id);
};

/**
 * เพิ่มร้านอาหารใหม่
 */
export const createRestaurant = (
  restaurantData: Omit<Restaurant, 'id'>
): Restaurant => {
  const restaurants = loadRestaurants();

  // สร้าง ID ใหม่ (รันเลขต่อท้ายอัตโนมัติ)
  const newIdNumber =
    Math.max(
      ...restaurants.map((r) =>
        parseInt(r.id.replace(/\D/g, '') || '0', 10)
      )
    ) + 1;
  const newId = `R${String(newIdNumber).padStart(2, '0')}`;

  const newRestaurant: Restaurant = {
    id: newId,
    ...restaurantData,
  };

  restaurants.push(newRestaurant);
  saveRestaurants(restaurants);

  return newRestaurant;
};

/**
 * แก้ไขข้อมูลร้านอาหารที่มีอยู่
 */
export const updateRestaurant = (
  id: string,
  restaurantData: Partial<Omit<Restaurant, 'id'>>
): Restaurant | null => {
  const restaurants = loadRestaurants();
  const index = restaurants.findIndex((r) => r.id === id);
  if (index === -1) return null;

  restaurants[index] = { ...restaurants[index], ...restaurantData };
  saveRestaurants(restaurants);
  return restaurants[index];
};

/**
 * ลบร้านอาหารออกจากระบบ
 */
export const deleteRestaurant = (id: string): boolean => {
  const restaurants = loadRestaurants();
  const index = restaurants.findIndex((r) => r.id === id);
  if (index === -1) return false;

  restaurants.splice(index, 1);
  saveRestaurants(restaurants);
  return true;
};

/**
 * รีเซ็ตข้อมูลร้านอาหารกลับเป็นค่าเริ่มต้น
 */
export const resetRestaurants = (): void => {
  saveRestaurants([...restaurantsData]);
};



/**
 * คีย์สำหรับเก็บข้อมูลใน localStorage
 */
const STORAGE_KEY_BRANCH = 'branches_data';

/**
 * โหลดข้อมูลสาขาจาก localStorage หรือใช้ข้อมูลเริ่มต้น
 * @returns {Branch[]} อาร์เรย์ของสาขาทั้งหมด
 */
const loadBranches = (): Branch[] => {
  const savedData = localStorage.getItem(STORAGE_KEY_BRANCH);
  if (savedData) {
    return JSON.parse(savedData);
  }
  // หากไม่มีข้อมูลใน localStorage ให้ใช้ JSON เริ่มต้น
  return [...branch];
};

/**
 * บันทึกข้อมูลสาขาลง localStorage
 * @param {Branch[]} branches - อาร์เรย์ของสาขาที่ต้องการบันทึก
 */
const saveBranches = (branches: Branch[]): void => {
  localStorage.setItem(STORAGE_KEY_BRANCH, JSON.stringify(branches));
};

/**
 * ดึงสาขาทั้งหมด
 * @returns {Branch[]} อาร์เรย์ของสาขาทั้งหมด
 */
export const getAllBranches = (): Branch[] => {
  return loadBranches();
};

/**
 * ดึงสาขาของร้านอาหารเฉพาะ
 * @param {string} restaurantId - รหัสร้านอาหาร
 * @returns {Branch[]} อาร์เรย์ของสาขาที่ตรงกับร้านนั้น
 */
export const getBranchesByRestaurant = (restaurantId: string): Branch[] => {
  return loadBranches().filter(b => b.restaurantId === restaurantId);
};

/**
 * เพิ่มหรือแก้ไขสาขา
 * @param {Branch} branch - ข้อมูลสาขาที่ต้องการบันทึก
 */
export const saveBranch = (branch: Branch): void => {
  const branches = loadBranches();
  const index = branches.findIndex(b => b.branchId === branch.branchId);

  if (index !== -1) {
    branches[index] = branch; // update
  } else {
    branches.push(branch); // add new
  }

  saveBranches(branches);
};

/**
 * ลบสาขา
 * @param {string} branchId - รหัสสาขาที่ต้องการลบ
 */
export const deleteBranch = (branchId: string): void => {
  const branches = loadBranches().filter(b => b.branchId !== branchId);
  saveBranches(branches);
};
