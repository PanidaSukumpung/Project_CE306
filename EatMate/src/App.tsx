import Home from "./pages/user/Home";
import Explore from "./pages/user/Explore";
import SignIn from "./pages/user/SignIn";
import RestaurantDetail from "./pages/user/RestaurantDetail";
import MyPartys from "./pages/user/MyParty";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavbarAdmin from "./components/NavbarAdmin";
import NavbarUser from "./components/NavbarUser";
import { useState } from "react";
import RestaurantAdmin from "./pages/admin/RestaurantAdmin";
import PartyAdmin from "./pages/admin/PartyAdmin";

import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (role: "admin" | "user") => {
    setIsAdmin(role === "admin");
  };

  return (
    <div>
      {/* Navbar */}
      {isAdmin ? <NavbarAdmin onLogout={() => setIsAdmin(false)} /> : <NavbarUser />}

      <main className="pt-20">
        <Routes>
          {/* USER PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/explore/:category" element={<Explore />} />
          <Route
            path="/signin"
            element={
              <SignIn
                onNavigate={(p) => {
                  if (p === "admin") navigate("/restaurantadmin");
                  else if (p === "user") navigate("/");
                  else navigate(`/${p}`);
                }}
                onLogin={handleLogin}
              />
            }
          />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/myparty" element={<MyPartys />} />

          {/* ADMIN PAGES */}
          {isAdmin && (
            <>
              <Route path="/restaurantadmin" element={<RestaurantAdmin />} />
              <Route path="/partyadmin" element={<PartyAdmin />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
