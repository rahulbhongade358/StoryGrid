import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./View/User/Login/Login.jsx";
import Signup from "./View/User/Signup/Signup.jsx";
import Bloglist from "./View/Bloglist/Bloglist.jsx";
import Blogedit from "./View/Blogedit/Blogedit.jsx";
import Blogdetails from "./View/Blogdetails/Blogdetails.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/bloglist" element={<Bloglist />} />
      <Route path="/blogdetails/:id" element={<Blogdetails />} />
      <Route path="/blogedit/:id" element={<Blogedit />} />
    </Routes>
  </BrowserRouter>
);
