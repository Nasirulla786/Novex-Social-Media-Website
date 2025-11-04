import React from "react";
import { Logo } from "../pages/Signup";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../public/images/default.jpeg";
import axios from "axios";
import { ServelURL } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import GetCureentUserData from "../hooks/GetCureentUserData";
import OtherProfile from "./OtherProfile";

const LeftHome = () => {
  GetCureentUserData();
  const { userData, suggestedusers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${ServelURL}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/signup");

      if (res) {
        alert("Logged out successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hidden sm:flex sm:flex-col sm:w-[25%] h-screen bg-[#0e0e0e] text-white border-r border-gray-800 shadow-lg overflow-y-auto">
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <Heart className=" text-white cursor-pointer hover:scale-110 transition-transform" />
      </div>

      {/* --- Current User Section --- */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800 hover:bg-[#1a1a1a] transition-all">
        <div className="flex items-center gap-3">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden ring-2 ring-gray-700">
            <img
              src={userData?.profileImage || defaultImage}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg">{userData?.name}</h1>
            <p className="text-gray-400 text-sm">@{userData?.userName}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition"
        >
          Logout
        </button>
      </div>

      {/* --- Suggested Users --- */}
      <div className="px-6 py-4">
        <h2 className="font-semibold text-gray-300 text-lg mb-3 tracking-wide">
          Suggested for you
        </h2>

        <div className="flex flex-col gap-4">
          {suggestedusers && suggestedusers.length > 0 ? (
            suggestedusers.slice(0, 3).map((value, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl hover:bg-[#1a1a1a] transition-all cursor-pointer"
              >
                <OtherProfile user={value} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No suggestions available.</p>
          )}
        </div>
      </div>

      {/* --- Footer (Optional Branding) --- */}
      <div className="mt-auto py-4 text-center border-t border-gray-800 text-xs text-gray-500">
        © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">Novex</span>
      </div>
    </div>
  );
};

export default LeftHome;
