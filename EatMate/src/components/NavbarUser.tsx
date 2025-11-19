import { Link } from "react-router-dom";
import Button from "../components/Button";

const NavbarUser = () => {
  return (
    <nav className="flex items-center w-full h-20 justify-evenly md:justify-between bg-gradient-to-r from-black via-red-500 to-white bg-[length:400%_400%]
       shadow-red-400 px-10 fixed top-0 shadow-md z-50">
        <Link to="/" className="font-bold text-md sm:text-lg md:text-xl text-red-600">
          EatMate
        </Link>
        <div className="flex space-x-5 sm:space-x-10 md:space-x-20 items-center">
          <Link to="/myparty" className="text-center text-white hover:text-red-600 text-md sm:text-lg md:text-xl">
            My Party
          </Link>
          <Link to="/signin" >
            <Button variant="secondary" className="text-md sm:text-lg md:text-xl">Sign in</Button>
          </Link> 
        </div>
      </nav>
  );
};

export default NavbarUser;
