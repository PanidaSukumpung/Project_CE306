import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Explore from "./pages/user/Explore";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import RestaurantDetail from "./pages/user/RestaurantDetail";
import MyPartys from "./pages/user/MyParty";
import Admin from "./pages/user/RestaurantsAdmin";
import Button from "./components/Button";
import RestaurantAdmin from "./pages/user/RestaurantsAdmin";
import PartyAdmin from "./pages/user/PartyAddmin";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); // state สำหรับเปิด/ปิดเมนูมือถือ
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] =
    useState<boolean>(false); // state สำหรับเปิด/ปิด dropdown ของ Admin

  const handleNavigate = (page: "signin" | "signup"): void => {
    navigate(`/${page}`); // ฟังก์ชันนำทางไปหน้า SignIn หรือ SignUp
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center w-full h-20 justify-between bg-gradient-to-r from-black via-red-500 to-white bg-[length:400%_400%] shadow-red-400 px-4 md:px-10 fixed top-0 shadow-md z-50">
        {/* โลโก้ */}
        <Link to="/" className="font-bold text-xl text-red-600">
          EatMate
        </Link>

        {/* เมนูสำหรับ Desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          {/* Dropdown ของ Admin */}
          <div
            className="relative"
            onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
          >
            <button className="text-center text-white hover:text-red-600 transition-colors font-semibold">
              Admin
            </button>

            {/* เมนู dropdown */}
            {isAdminDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-sm rounded-lg shadow-xl border border-red-500/30 overflow-hidden"
                onClick={(e) => e.stopPropagation()} // ป้องกันการปิด dropdown เมื่อคลิกภายใน
              >
                <Link
                  to="/restaurantadmin"
                  className="block px-4 py-3 text-white hover:bg-red-600 transition-colors"
                  onClick={() => setIsAdminDropdownOpen(false)} // ปิด dropdown หลังคลิก
                >
                  🍽️ Restaurant Admin
                </Link>
                <Link
                  to="/partyadmin"
                  className="block px-4 py-3 text-white hover:bg-red-600 transition-colors"
                  onClick={() => setIsAdminDropdownOpen(false)}
                >
                  🎉 Party Admin
                </Link>
              </div>
            )}
          </div>

          {/* ลิงก์ My Party */}
          <Link
            to="/myparty"
            className="text-center text-white hover:text-red-600 transition-colors"
          >
            My Party
          </Link>

          {/* ปุ่ม Sign In */}
          <Link to="/signin">
            <Button variant="secondary">Sign In</Button>
          </Link>
        </div>

        {/* ปุ่มเมนูสำหรับมือถือ */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* เมนูมือถือ */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 w-full bg-black/95 backdrop-blur-sm z-40 md:hidden">
          <div className="flex flex-col items-center space-y-4 py-6">
            {/* ส่วน Admin */}
            <div className="w-full">
              <p className="text-white text-center font-semibold mb-2">Admin</p>
              <Link
                to="/restaurantadmin"
                onClick={() => setIsMobileMenuOpen(false)} // ปิดเมนูมือถือหลังคลิก
                className="block text-center text-red-200 hover:text-red-400 transition-colors text-sm py-2"
              >
                Restaurant Admin
              </Link>
              <Link
                to="/partyadmin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center text-red-200 hover:text-red-400 transition-colors text-sm py-2"
              >
                Party Admin
              </Link>
            </div>

            {/* ลิงก์ My Party */}
            <Link
              to="/myparty"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-red-600 transition-colors text-lg"
            >
              My Party
            </Link>

            {/* ปุ่ม Sign In */}
            <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="secondary">Sign In</Button>
            </Link>
          </div>
        </div>
      )}

      {/* ส่วนเนื้อหาหลัก */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/:category" element={<Explore />} />
          <Route
            path="/signin"
            element={<SignIn onNavigate={handleNavigate} />}
          />
          <Route
            path="/signup"
            element={<SignUp onNavigate={handleNavigate} />}
          />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/restaurantadmin" element={<RestaurantAdmin />} />
          <Route path="/partyadmin" element={<PartyAdmin />} />
          <Route path="/myparty" element={<MyPartys />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
