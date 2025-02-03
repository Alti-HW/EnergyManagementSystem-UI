import React from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
interface MenuItemType {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}
interface CustomContextMenuProps {
  menuPosition: { mouseX: number; mouseY: number } | null;
  onClose: () => void;
  menuItems: MenuItemType[];
}
const CustomContextMenu: React.FC<CustomContextMenuProps> = ({
  menuPosition,
  onClose,
  menuItems,
}) => {
  return (
    <Menu
      open={!!menuPosition}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        menuPosition
          ? { top: menuPosition.mouseY, left: menuPosition.mouseX }
          : undefined
      }
    >
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={item.onClick} disabled={item.disabled}>
          <Typography>{item.label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
export default CustomContextMenu;
