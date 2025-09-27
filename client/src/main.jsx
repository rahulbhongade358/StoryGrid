import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./View/User/Login/Login.jsx";
import Signup from "./View/User/Signup/Signup.jsx";
import Bloglist from "./View/Bloglist/Bloglist.jsx";
import Blogedit from "./View/Blogedit/Blogedit.jsx";
import Blogdetails from "./View/Blogdetails/Blogdetails.jsx";
import Blogadd from "./View/Blogadd/Blogadd.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/bloglist" element={<Bloglist />} />
      <Route path="/blogadd" element={<Blogadd />} />
      <Route path="/blogdetails/:slug" element={<Blogdetails />} />
      <Route path="/blogedit/:slug" element={<Blogedit />} />
    </Routes>
  </BrowserRouter>
);
