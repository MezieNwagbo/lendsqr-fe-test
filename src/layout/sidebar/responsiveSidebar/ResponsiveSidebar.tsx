import { Drawer } from "@mui/material";

import { useSidebar } from "../../../context/SidebarContext";

import Sidebar from "../Sidebar";
import "./ResponsiveSidebar.scss";

const ResponsiveSidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  return (
    <>
      {/* Hamburger Icon (visible only on mobile) */}
      {/* <div className="responsive-sidebar__hamburger">
        <IconButton onClick={toggleDrawer(true)}>X</IconButton>
      </div> */}

      {/* Permanent Sidebar for large screens */}
      <div className="responsive-sidebar__desktop">
        <Sidebar />
      </div>

      {/* Drawer Sidebar for mobile */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={closeSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#fff",
            boxShadow: "0px 5px 20px rgba(0,0,0,0.04)",
          },
        }}
      >
        <Sidebar />
      </Drawer>
    </>
  );
};

export default ResponsiveSidebar;
