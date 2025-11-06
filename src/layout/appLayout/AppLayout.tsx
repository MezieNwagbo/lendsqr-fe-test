import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

import ResponsiveSidebar from "../sidebar/responsiveSidebar/ResponsiveSidebar";
import "./AppLayout.scss";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-layout__body">
        <ResponsiveSidebar />
        <main className="app-layout__content">
          <Outlet /> {/* This is where child pages render */}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
