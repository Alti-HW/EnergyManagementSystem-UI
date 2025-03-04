import React, { useState } from "react";
import { Menu, MenuItem, Box, IconButton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import FeatureAccessControl from "../../../authorization/feature.access.control";
import userAccess from "../../../authorization/user.access.constants";

const PopoverWithMenu = ({ index, onRoleEdit, onRoleDelete, id }: any) => {
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
        <FeatureAccessControl requiredRoles={userAccess.EDIT_ROLE}>
          <MenuItem
            sx={{ fontSize: "14px" }}
            onClick={(event) => {
              event.stopPropagation();
              onRoleEdit(id);
              handleMenuClose();
            }}
          >
            Edit Role
          </MenuItem>
        </FeatureAccessControl>
        <FeatureAccessControl requiredRoles={userAccess.DELETE_ROLE}>
          <MenuItem
            sx={{ fontSize: "14px" }}
            onClick={(event) => {
              event.stopPropagation();
              onRoleDelete(id);
              handleMenuClose();
            }}
          >
            Delete Role
          </MenuItem>
        </FeatureAccessControl>
      </Menu>
    </Box>
  );
};

export default PopoverWithMenu;
