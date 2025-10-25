
import Home from "./pages/user/Home";
import Explore from "./pages/user/Explore";
import SignIn from "./pages/user/SignIn";
import RestaurantDetail from "./pages/user/RestaurantDetail";
import { Routes, Route, Link } from "react-router-dom";
import Button from "./components/Button";
import "./App.css";

function App() {
  return (
    <>
      <nav className="flex items-center w-full h-20 justify-between bg-white px-10 fixed top-0 shadow-md">
        <Link to="/" className="font-bold text-xl text-red-600">
          EatMate
        </Link>
        <div className="flex space-x-20 items-center">
          <Link to="/explore" className="text-center hover:text-red-600">

            Explore
          </Link>
          <Link to="/signin">
            <Button>Sign in</Button>
          </Link> 
        </div>
      </nav>
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
