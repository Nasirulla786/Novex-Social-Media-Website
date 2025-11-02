  import React from "react";
  import { Routes, Route, Navigate } from "react-router-dom";
  import Signup from "./pages/Signup.jsx";
  import Login from "./pages/Login.jsx";
  import ForgetPassword from "./pages/ForgetPassword.jsx";
  import GetCureentUserData from "./hooks/GetCureentUserData.jsx";
  import { useSelector } from "react-redux";
  // import useCurrentUser from "./hooks/useCurrentUser";
  import Home from "./pages/Home.jsx";
import SuggestedUsers from "./hooks/SuggestedUsers.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import UplaodPage from "./pages/UplaodPage.jsx";
import useGetAllPosts from "./hooks/useGetAllPosts.jsx";
import Loop from "./pages/Loop.jsx";
import StoryPage from "./pages/StoryPage.jsx";
import useGetAllFollowersStory from "./hooks/useGetAllFollowersStory.jsx";

  export const ServelURL = "http://localhost:8000";

  const App = () => {
    GetCureentUserData();
    SuggestedUsers();
    useGetAllFollowersStory();
    // useGetAllPosts();
    const { userData } = useSelector((state) => state.user);
    // console.log("thisis chutiyaa user datas", userData);

    // console.log("Redux userData:", GetCureentUserData());

    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/uploadpost" element={userData?<UplaodPage />:"/signup"}/>
        <Route path = "/loop" element={userData?<Loop />:"signup"} />
        <Route path="/story/:username" element={userData?<StoryPage />:"signup"} />
      </Routes>
    );
  };

  export default App;
