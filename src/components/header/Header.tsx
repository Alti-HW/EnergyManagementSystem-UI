import React, { useEffect, useState } from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { HeaderProps } from "./types";
import "./Header.scss";
import { useUser } from "../../context/user.context";

const Header = ({ onMenuExpand, menuOptions }: HeaderProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);
  const [openSubNav, setOpenSubNav] = useState<{ [key: string]: boolean }>({});
  const { user } = useUser();
  const location = useLocation();

  const handleActiveRoute = (
    { isActive, href }: any,
    basePath: string
  ): string => {
    // Check if the current href starts with the base path (e.g., /userManagement, /admin)
    const isInBasePath = location?.pathname?.startsWith(basePath);
    return `menu ${isActive || isInBasePath ? "activeMenu" : ""}`;
  };

  const handleMenuMinimize = () => {
    setIsMenuMinimized((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // Toggle submenu visibility
  const toggleSubNav = (routeName: string) => {
    setOpenSubNav((prevState) => ({
      ...prevState,
      [routeName]: !prevState[routeName],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (onMenuExpand) {
      onMenuExpand(isMenuMinimized);
    }
  }, [isMenuMinimized]);

  const isUserHasPermittedToRoutes = (permissions: any) => {
    if (permissions.length <= 0) return true;
    return permissions?.some((role: string) =>
      user?.resource_access?.EMS?.roles?.includes(role)
    );
  };

  return (
    <>
      {isMobile && (
        <AppBar className="mobileHeader">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <img
            className="logo"
            src="https://www.altimetrik.com/storage/2023/07/Altimetrik-logo_4.png"
            alt="Logo"
          />
        </AppBar>
      )}

      <Drawer
        sx={{
          width: isMenuMinimized ? "60px" : "220px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "75%" : isMenuMinimized ? "60px" : "220px",
            boxSizing: "border-box",
            backgroundColor: "#192142",
            color: "#fff",
            bottom: 0,
          },
        }}
        anchor="left"
        open={isMobile ? openDrawer : true}
        variant={isMobile ? "temporary" : "persistent"}
        onClose={handleCloseDrawer}
      >
        {!isMobile && (
          <div className="logoWrapper">
            {!isMenuMinimized && (
              <img className="logo" src="/altimetrik.png" alt="Logo" />
            )}
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="close drawer"
              sx={{ mr: 2 }}
              onClick={handleMenuMinimize}
            >
              {isMenuMinimized ? (
                <KeyboardDoubleArrowRightIcon />
              ) : (
                <KeyboardDoubleArrowLeftIcon />
              )}
            </IconButton>
          </div>
        )}
        {isMobile && (
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="close drawer"
            sx={{ mr: 2 }}
            onClick={handleCloseDrawer}
            className="closeDrawer"
          >
            <ClearIcon />
          </IconButton>
        )}
        <MenuList
          sx={{ "&.MuiList-root": { marginTop: isMobile ? "32px" : "0" } }}
        >
          {menuOptions.map(
            ({ path, label, Icon, permissions, basePath }: any) =>
              isUserHasPermittedToRoutes(permissions) && (
                <MenuItem key={path} sx={{ marginLeft: "-10px" }}>
                  <NavLink
                    onClick={handleCloseDrawer}
                    className={(e) => handleActiveRoute(e, basePath)}
                    to={path}
                  >
                    <Tooltip title={label} placement="right-start">
                      {Icon && (
                        <Icon sx={{ width: "16px", verticalAlign: "bottom" }} />
                      )}
                    </Tooltip>
                    {!isMenuMinimized && (
                      <Typography
                        variant="body1"
                        sx={{ display: "inline-block", ml: 1 }}
                      >
                        {" "}
                        {label}{" "}
                      </Typography>
                    )}
                  </NavLink>
                </MenuItem>
              )
          )}
          {/* <Divider className="divider" />
          {adminRoutes.map(({ path, label, Icon, subRoutes }) => (
      <MenuItem key={path} sx={{ marginLeft: "-10px" }}>
        <NavLink
          onClick={handleCloseDrawer}
          className={handleActiveRoute}
          to={path}
        >
          <Tooltip title={label} placement="right-start">
            {Icon && (
              <Icon sx={{ width: "16px", verticalAlign: "bottom" }} />
            )}
          </Tooltip>
          {!isMenuMinimized && (
            <Typography
              variant="body1"
              sx={{ display: "inline-block", ml: 1 }}
            >
              {label}
            </Typography>
          )}
        </NavLink>
      </MenuItem>

    ))
  } */}
        </MenuList>
      </Drawer>
    </>
  );
};

export default Header;
