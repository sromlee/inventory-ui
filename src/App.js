import "./App.css";
import Home from "./components/pages/Home";
import Inventory from "./components/pages/Inventory/Inventory";
import UserSetting from "./components/pages/UserSetting/UserSetting";
import Login from "./components/pages/Login";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/inc/Navbar";
import Missing from "./components/pages/Missing";
import React from "react";
import Protected from "./components/Protected";
import { useAuth } from "./components/context/AuthProvider";
import Register from "./components/pages/Register";
import ProtectedAdmin from "./components/ProtectedAdmin";
import Unauthorized from "./components/pages/Unauthorized";

const App = () => {
  const { user } = useAuth();
  let logged;

  if (user) {
    console.log("User in APP");

    logged = user.access_token;
    console.log(logged);
  }

  return (
    <div>
      <Navigation />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/unauthorized" element = {<Unauthorized />} />

        {/* Protected Route */}
        <Route element={<Protected />}>
          <Route path="/inventory" element={<Inventory />} />

          <Route element={<ProtectedAdmin  />}>
            <Route path="/userSetting" element={<UserSetting />} />
          </Route>
        </Route>

        {/* 404 NOT FOUND */}
        <Route path="/missing" element={<Missing />} />
      </Routes>
    </div>
  );
};

export default App;
