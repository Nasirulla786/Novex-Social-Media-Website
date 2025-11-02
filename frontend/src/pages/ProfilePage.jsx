import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServelURL } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setProfiledata, setUserData } from "../redux/userSlice";
import { ArrowBigLeft, Users, User, FileText, Edit3, MessageCircle, LogOut, Loader2 } from "lucide-react";
import dp from "../../public/images/default.jpeg";
import FollowButton from "../components/FollowButton";
import Post from "../components/Post";

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { profileData, userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();
  const {postData} = useSelector(state=>state.post);
  // console.log("thisis post dataa",postData)


  console.log("this is profiledata",profileData)


  // console.log("this is userData",userData?._id);
  // console.log("this is profiledtaa",profileData)
  const handleProfile = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${ServelURL}/api/user/profile/${username}`,
        { withCredentials: true }
      );
      if (result) {
        // console.log(result.data)
        dispatch(setProfiledata(result.data));
      }
    } catch (error) {
      console.log("ERROR ON THIS", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      const res = await axios.get(`${ServelURL}/api/auth/logout`, {
        withCredentials: true,
      });
      if(res){
        dispatch(setUserData(null));
      }

    alert("Logged out successfully");
        navigate("/signup");


    } catch (error) {
      console.log(error);
      setLogoutLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e) => {
    e.target.src = dp;
    setImageLoading(false);
  };

  useEffect(() => {
    if(username) {
      handleProfile();
      // console.log("its is called")
    }
  }, [username, dispatch]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
        <p className="text-gray-300">Loading profile...</p>
      </div>
    </div>
  );

  if (!profileData) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-300 text-lg mb-4">Profile not found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  const isOwnProfile = profileData?._id === userData?._id;
  // console.log(isOwnProfile)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-purple-500/10"></div>

        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
            >
              <ArrowBigLeft size={24} />
              <span className="hidden sm:block">Back</span>
            </button>

            <h1 className="text-2xl font-bold text-white text-center flex-1">
              {profileData?.userName || "New User"}
            </h1>

            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {logoutLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut size={16} />
              )}
              <span className="hidden sm:block">Log Out</span>
            </button>
          </div>

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="relative">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
                </div>
              )}
              <img
                src={profileData?.profileImage || dp}
                alt="Profile"
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`w-28 h-28 object-cover rounded-full border-4 border-yellow-500 shadow-lg ${
                  imageLoading ? "opacity-0" : "opacity-100"
                } transition-opacity duration-200`}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {profileData?.name}
              </h1>
              <p className="text-gray-300 text-lg mb-4">
                {profileData?.profession || "No profession set"}
              </p>
              {profileData?.bio && (
                <p className="text-gray-400 max-w-md">
                  {profileData.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Followers */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <User className="text-yellow-400" size={24} />
              </div>
              <h2 className="text-lg font-semibold text-yellow-400">Followers</h2>
            </div>
            <p className="text-3xl font-bold text-white text-center">
              {profileData?.followers?.length}
            </p>
          </div>

          {/* Following */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Users className="text-yellow-400" size={24} />
              </div>
              <h2 className="text-lg font-semibold text-yellow-400">Following</h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                {profileData?.following?.slice(0, 3).map((user, index) => (
                  <img
                    key={index}
                    src={user.profileImage || dp}
                    alt={`Following ${index + 1}`}
                    className="w-10 h-10 object-cover rounded-full border-2 border-white shadow-lg"
                  />
                ))}
                {profileData?.following?.length > 3 && (
                  <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold shadow-lg">
                    +{profileData?.following?.length - 3}
                  </div>
                )}
              </div>
              <p className="text-3xl font-bold text-white">
                {profileData?.following?.length}
              </p>
            </div>
          </div>

          {/* Posts */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <FileText className="text-yellow-400" size={24} />
              </div>
              <h2 className="text-lg font-semibold text-yellow-400">Posts</h2>
            </div>
            <p className="text-3xl font-bold text-white text-center">
              {profileData?.posts?.length}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 flex justify-center">
        <div className="flex gap-4">
          {isOwnProfile ? (
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg" onClick={()=>navigate("/editprofile")}>
              <Edit3 size={18} />
              Edit Profile
            </button>
          ) : (
            <>
              <FollowButton tailwind={"flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"} targetUserID={profileData?._id} />
              <button className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                <MessageCircle size={18} />
                Message
              </button>
            </>
          )}
        </div>
      </div>


      <div >
      {
  postData.map((p) => {
    if (p.author._id === profileData._id ) {
      return (
        <div key={p._id}>
          <Post post={p} />
        </div>
      );
    }
  })
}



      </div>


    </div>
  );
};

export default ProfilePage;
