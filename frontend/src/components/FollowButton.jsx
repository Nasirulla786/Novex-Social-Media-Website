import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ServelURL } from '../App';
import { toggleFollow, setFollwingdata } from '../redux/userSlice';

const FollowButton = ({ targetUserID, tailwind }) => {
  const { following, profileData } = useSelector((state) => state.user);
  const isFollowing = following.includes(targetUserID);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${ServelURL}/api/user/follow/${targetUserID}`, {
        withCredentials: true,
      });

      // update your own following list in redux
      dispatch(toggleFollow(targetUserID));

      // ✅ update profileData followers list if currently viewing that user's profile
      if (profileData && profileData._id === targetUserID) {
        dispatch(
          setFollwingdata({
            followers: res.data.followers,
          })
        );
      }
    } catch (error) {
      console.log("Follow error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={tailwind}
      onClick={handleFollow}
      disabled={loading}
    >
      {loading
        ? "Loading..."
        : isFollowing
        ? "Following"
        : "Follow"}
    </button>
  );
};

export default FollowButton;
