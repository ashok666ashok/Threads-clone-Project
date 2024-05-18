import { Box, Button, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./Pages/UserPage";
import PostPage from "./Pages/PostPage";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./Pages/UpdateProfilePage";
import CreatePost from "./Components/CreatePost";
import { useEffect } from "react";
import ChatPage from "./Pages/ChatPage";
import SettingsPage from "./Pages/SettingsPage";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();
  useEffect(() => {}, [user]);

  // console.log(user);
  return (
    <Box position={"relative"} w={"full"}>
      <Container
        maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />} 
          />
          {/* <Route
          path="/posts"
          element={<PostPage/>}
        /> */}
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/" />}
          />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to={"/auth"} />}
          />
        </Routes>

        {user && <CreatePost />}
      </Container>
    </Box> //12:5:00
  );
}

export default App;
