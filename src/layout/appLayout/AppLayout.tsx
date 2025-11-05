import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./AppLayout.scss";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-layout__body">
        <Sidebar />
        <main className="app-layout__content">
          <Outlet /> {/* This is where child pages render */}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
