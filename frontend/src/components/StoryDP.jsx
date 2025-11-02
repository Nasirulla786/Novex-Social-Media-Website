import React from 'react'
import { useSelector } from 'react-redux'
import dp from "../../public/images/default.jpeg"
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StoryDP = ({ profileImage, username, story }) => {
  // console.log("th isis story",story)
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();

  const isStoryEmpty = !story || Object.keys(story).length === 0;

  const handleClick = () => {
    if (isStoryEmpty && username === "your story") {
      navigate("/uploadpost");
    }
    else if (!isStoryEmpty && username === "your story") {
      navigate(`/story/${userData?.userName}`);
    }
    else {
      navigate(`/story/${username}`);
      // console.log("thi is route hide")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-2 cursor-pointer' onClick={handleClick}>
      <div
        className={`w-[90px] h-[90px] rounded-full relative ${
          !isStoryEmpty ? "border-[5px] border-pink-800" : ""
        }`}
      >
        <img
          src={profileImage || userData?.profileImage || dp}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />

        {username === "your story" && (
          <PlusIcon className='bg-white text-black w-6 h-6 rounded-full absolute bottom-0 right-0' />
        )}
      </div>

      <h1>{username || userData?.userName}</h1>
    </div>
  )
}

export default StoryDP;
