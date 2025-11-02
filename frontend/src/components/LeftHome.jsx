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
  const { userData ,  suggestedusers } = useSelector((state) => state.user);
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
        alert("LogOut SuccessFully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hidden sm:block sm:w-[25%] bg-black h-screen text-white">
      <div className="flex justify-between p-[20px] items-center">
        <h1>
          <Logo />
        </h1>
        <Heart className="fill-red-500 text-red-400" />
      </div>

       <div className="bg-gray-700 h-0.5 w-full "></div>

      <div className="flex justify-between items-center    p-[20px]">
        <div className="flex items-center gap-2.5">
          <div className="w-[50px] h-[50px] rounded-full">
            <img
              src={userData?.profileImage || defaultImage}
              alt="None"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <h1 className="font-bold font-sans">{userData?.name}</h1>
            <h1 className="font-semibold text-[12px] text-gray-400">
              {userData?.userName}
            </h1>
          </div>
        </div>

        <h1
          className="text-yellow-400 font-bold cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </h1>
      </div>

      <div className="bg-gray-700 h-0.5 w-full "></div>

      <h1 className="font-bold px-[20px] py-3">Suggested Users</h1>


      <div className=" h-fit p-[20px] ">
        {
          suggestedusers && suggestedusers.slice(0,3).map((value,idx)=> {
            return(
              <div key={idx} className="py-2">

                <OtherProfile   user={value}/>
              </div>
            )
          })

        }

      </div>
    </div>
  );
};

export default LeftHome;
