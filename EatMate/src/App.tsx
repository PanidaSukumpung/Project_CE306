
import Home from "./pages/user/Home";
import Explore from "./pages/user/Explore";
import SignIn from "./pages/user/SignIn";
import RestaurantDetail from "./pages/user/RestaurantDetail";
import MyPartys from "./pages/user/MyParty";
import { Routes, Route, Link } from "react-router-dom";
import Button from "./components/Button";
import "./App.css";

function App() {
  return (
    <>
      <nav className="flex items-center w-full h-20 justify-between bg-gradient-to-r from-black via-red-500 to-white bg-[length:400%_400%]
       shadow-red-400 px-10 fixed top-0 shadow-md z-50">
        <Link to="/" className="font-bold text-xl text-red-600">
          EatMate
        </Link>
        <div className="flex space-x-20 items-center">
          <Link to="/myparty" className="text-center text-white hover:text-red-600">
            My party
          </Link>
          <Link to="/signin">
            <Button variant="secondary">Sign in</Button>
          </Link> 
        </div>
      </nav>
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/:category" element={<Explore />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/myparty" element={<MyPartys />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
