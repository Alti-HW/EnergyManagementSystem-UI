import React from "react";

import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Profile = () => {
  const [profileMenu, setProfileMenu] =
    React.useState<HTMLButtonElement | null>(null);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setProfileMenu(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenu(null);
  };

  const open = Boolean(profileMenu);
  return (
    <Box className="profile" sx={{ position: "relative" }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        id="profile-button"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleProfileMenuOpen}
        className="profileIcon"
        sx={{ position: "absolute", right: 0 }}
      >
        <PersonOutlineOutlinedIcon />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={profileMenu}
        open={open}
        onClose={handleProfileMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
