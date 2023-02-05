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
      <div
        name="winter-neva-gradient color-block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(193,226,223,0.5), rgba(255,255,255,0.5))",
        }}
      >
        <Routes>
          {/* Public Route */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Route */}
          <Route element={<Protected />}>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />

            <Route element={<ProtectedAdmin />}>
              <Route path="/userSetting" element={<UserSetting />} />
            </Route>
          </Route>

          {/* 404 NOT FOUND */}
          <Route path="/missing" element={<Missing />} />
        </Routes>

        <footer className="mt-auto py-5 bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white">
              Copyright &copy; www.something.com 2022
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
