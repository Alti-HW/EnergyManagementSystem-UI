import React, { useState } from "react";
import { Menu, MenuItem, Box, IconButton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const PopoverWithMenu = ({ index, onRoleEdit, onRoleDelete }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        alignItems: "center",
        justifyContent: "center",
        right: 0,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <IconButton onClick={handleMenuOpen}>
        <MoreVertOutlinedIcon
          sx={{ width: "20px", height: "20px", color: "#000" }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <MenuItem
          sx={{ fontSize: "14px" }}
          onClick={(event) => {
            event.stopPropagation();
            onRoleEdit(index);
            handleMenuClose();
          }}
        >
          Edit Role
        </MenuItem>
        <MenuItem
          sx={{ fontSize: "14px" }}
          onClick={(event) => {
            event.stopPropagation();
            onRoleDelete(index);
            handleMenuClose();
          }}
        >
          Delete Role
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PopoverWithMenu;
