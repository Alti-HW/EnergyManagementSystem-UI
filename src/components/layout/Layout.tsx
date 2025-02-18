import { Outlet, useLocation } from "react-router";
import ResponsiveAppBar from './header.layout'
import Header from "../header/Header";

import "./Layout.scss";
import { useState } from "react";
import { Box } from "@mui/material";
import Profile from "../profile/Profile";

const Layout = ({ menuOptions }: any) => {
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);
  const location = useLocation();
  const onMenuExpand = (flag: boolean) => {
    setIsMenuMinimized(flag);
  };
  return (
    <div className="">
      <ResponsiveAppBar />
      <Header onMenuExpand={onMenuExpand} menuOptions={menuOptions} />
      <Box
        sx={{
          padding: !isMenuMinimized ? "0 0 0 220px" : "0 0 0 60px",
          minHeight: "100vh",
          backgroundColor:
            location.pathname === "/dashboard" ? "#205c84" : "background.paper",
        }}
        className={`layoutWrapper ${isMenuMinimized ? "fullWidth" : ""}`}
      >
        <Profile />
        <Outlet />
      </Box>
      <footer></footer>
    </div>
  );
};

export default Layout;
