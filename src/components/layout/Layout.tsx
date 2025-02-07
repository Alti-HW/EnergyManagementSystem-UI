import { Outlet, useLocation } from "react-router";
import Header from "../header/Header";

import "./Layout.scss";
import { useState } from "react";
import { Box } from "@mui/material";

const Layout = () => {
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);
  const location = useLocation();
  const onMenuExpand = (flag: boolean) => {
    setIsMenuMinimized(flag);
  };
  return (
    <div className="">
      <Header onMenuExpand={onMenuExpand} />
      <Box
        sx={{
          padding: !isMenuMinimized ? "0 16px 0 236px" : "0 16px 0 76px",
          minHeight: "100vh",
          backgroundColor:
            location.pathname === "/dashboard" ? "#205c84" : "background.paper",
        }}
        className={`layoutWrapper ${isMenuMinimized ? "fullWidth" : ""}`}
      >
        <Outlet />
      </Box>
      <footer></footer>
    </div>
  );
};

export default Layout;
