import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import "./App.css";

// Import Components
import Footer from "./components/Footer";
import Navbar from "./components/navbar";

// Import Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Posts from "./pages/Posts";
import Sports from "./pages/Sports";
import Account from "./pages/Account";
import Admin from "./pages/admin/Admin";
import Mentions from "./pages/LegalNotice";
import CreatePost from "./pages/CreatePost";
import UserPage from "./pages/user/[id]";
import PostPage from "./pages/post/[id]";
import EditSport from "./pages/editsport/[id]";
import EditUser from "./pages/edituser/[id]";
import EditPost from "./pages/editpost/[id]";

export default function App() {
  const [Cookies] = useCookies(["token"]);
  console.log(
    "%cIt's dangerous to go alone! Take this:🗡️",
    "background: #222; color: #008000"
  );
  console.log(
    "%cWhat are u doing ?",
    "display: inline-block ; background-image: url( 'https://c.tenor.com/GBdIH5sL4XQAAAAC/the-rock-rock.gif' ) ; " +
    "background-size: cover ; padding: 10px 175px 258px 10px ; " +
    "border: 2px solid black ; font-size: 11px ; line-height: 11px ; " +
    "font-family: monospace ;"
  );
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/legalnotice" element={<Mentions />} />
        <Route path="/userpage/:id" element={<UserPage />} />
        <Route path="/post/:id" element={<PostPage />} />

        {Cookies.token ? (
          <>
            <Route path="/chat" element={<Chat />} />
            <Route path="/account" element={<Account />} />
            <Route path="/editsport/:id" element={<EditSport />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/editpost/:id" element={<EditPost />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/createpost" element={<CreatePost />} />

            {Cookies.role === "Skywalker" ? (
              <Route path="/admin" element={<Admin />} />
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </>
        ) : (
          <>
            <Route path="/account" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}
