import { Home, Plus, Search, Video } from "lucide-react";

import dp from "../../public/images/default.jpeg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const {userData} = useSelector(state=>state.user)
  const navigate = useNavigate();
  return (
    <div className="w-[90%] lg:w-[40%] h-[80px] bg-yellow-500 flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]">
      <Home />
      <Search />

        <Plus onClick={()=>navigate("/uploadpost")}   />

      <Video   onClick={()=> navigate("/loop")}/>
      <div className="w-[50px]  h-[50px] rounded-full relative" onClick={()=>{
        navigate(`/profile/${userData?.userName}`)
      }}>
        <img
          src= { userData?.profileImage || dp}
          alt="None"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Nav;
