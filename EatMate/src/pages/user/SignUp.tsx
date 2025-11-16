import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggledPasswordVisibilty = () => setShowPassword(!showPassword);
  const EyeToggleIcon = showPassword ? FaRegEyeSlash : FaRegEye;
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center  bg-gray-50  ">
      <div className="w-full mt-20 max-w-2xl p-8 bg-red-100 rounded-2xl flex flex-col items-center shadow-2xl shadow-red-900  ">
        <h1 className="text-3xl font-bold mb-16 text-red-600">SignUp</h1>

        <div className="w-full mb-8">
          <div className="flex h-12 items-center bg-red-200 p-3 rounded-xl gap-3 shadow-inner shadow-red-300">
            {/* h-10 p-2 gap-2 -> h-12 p-3 gap-3 rounded-xl */}
            <FaRegUserCircle className="text-red-600 text-xl" />
            {/* เพิ่มขนาด icon */}
            <input
              type="Name"
              placeholder="Name"
              className="bg-transparent border-0 w-full outline-none text-red-800 placeholder-red-800 " // ปรับสี text และ placeholder
            />
          </div>
        </div>
        <div className="w-full mb-8">
          <div className="flex h-12 items-center bg-red-200 p-3 rounded-xl gap-3 shadow-inner shadow-red-300">
            {/* h-10 p-2 gap-2 -> h-12 p-3 gap-3 rounded-xl */}
            <FaRegUserCircle className="text-red-600 text-xl" />
            {/* เพิ่มขนาด icon */}
            <input
              type="date"
              className="bg-transparent border-0 w-full outline-none text-red-800 placeholder-red-400 " // ปรับสี text และ placeholder
            />
          </div>
        </div>
        <div className="w-full mb-8">
          <div className="flex h-12 items-center bg-red-200 p-3 rounded-xl gap-3 shadow-inner shadow-red-300">
            {/* h-10 p-2 gap-2 -> h-12 p-3 gap-3 rounded-xl */}
            <MdOutlineAlternateEmail className="text-red-600 text-xl" />
            {/* เพิ่มขนาด icon */}
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-transparent border-0 w-full outline-none text-red-800 placeholder-red-800 " // ปรับสี text และ placeholder
            />
          </div>
        </div>
        {/* ปรับ w-11/12 และเพิ่ม mb-6 */}
        <div className="w-full mb-8">
          <div className="flex h-12 items-center bg-red-200 p-3 rounded-xl gap-3 relative shadow-inner shadow-red-300">
            {" "}
            {/* h-10 p-2 gap-2 -> h-12 p-3 gap-3 rounded-xl */}
            <FaFingerprint className="text-red-600 text-xl" />{" "}
            {/* เพิ่มขนาด icon */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="bg-transparent border-0 w-full outline-none text-red-800 placeholder-red-800 " // ปรับสี text และ placeholder
            />
            <EyeToggleIcon
              className="absolute right-3 cursor-pointer text-red-600 text-xl"
              onClick={toggledPasswordVisibilty}
            />
          </div>
        </div>
        <div className="w-full mb-8">
          <div className="flex h-12 items-center bg-red-200 p-3 rounded-xl gap-3 relative shadow-inner shadow-red-300">
            {" "}
            {/* h-10 p-2 gap-2 -> h-12 p-3 gap-3 rounded-xl */}
            <FaFingerprint className="text-red-600 text-xl" />{" "}
            {/* เพิ่มขนาด icon */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="bg-transparent border-0 w-full outline-none text-red-800 placeholder-red-800 " // ปรับสี text และ placeholder
            />
            <EyeToggleIcon
              className="absolute right-3 cursor-pointer text-red-600 text-xl"
              onClick={toggledPasswordVisibilty}
            />
          </div>
        </div>
        <div className="w-full -mb-2"></div>
        <button className="w-full p-2 bg-red-600 rounded-xl mt-3 hover:bg-red-700 text-sm md:text-base text-white ">
          SignUp
        </button>
        <div className="relative w-full flex item-center justify-center py-3">
          <div className="w-2/3 mt-5 h-[2px] bg-gray-400"></div>
          <h2 className="text-xs mt-3 md:text-sm px-4 text-gray-600">Or</h2>
          <div className="w-2/3 mt-5 h-[2px] bg-gray-400"></div>
        </div>

        <span
          className="text-red-600 font-semibold cursor-pointer hover:underline -translate-x-64 translate-y-6"
          onClick={() => navigate("/signin")}
        >
          Back
        </span>
      </div>
    </div>
  );
};

export default SignUp;
