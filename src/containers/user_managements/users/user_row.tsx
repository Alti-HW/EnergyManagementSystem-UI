import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Box,
  Chip,
  FormControl,
  Select,
  InputLabel,
  Fab,
  Checkbox,
  Avatar,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface UserRowProps {
  row: any;
  index: number;
  isSelected: boolean; // Track if this row is selected
  onSelect: () => void; // Callback to handle row checkbox toggle
  activeRowIndex: number;
  showDetails: boolean;
  onRowClick: (index: number) => void;
  onUserEdit: (index: number) => void;
  onUserDelete: (inded: number) => void;
}
const User = ({
  firstName,
  lastName,
  email,
}: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const getInitials = () => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        sx={{
          bgcolor: "#7e417a", // You can customize the background color here
          width: 40, // Customize the size of the avatar
          height: 40,
          fontSize: "14px", // Customize the size of the avatar
          textDecoration: "none",
        }}
      >
        {getInitials()} {/* Display the initials */}
      </Avatar>
      <Box sx={{ ml: 1 }}>
        <Typography sx={{ fontSize: "12px", color: "#000" }}>
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography sx={{ fontSize: "10px", color: "#777a7a" }}>
          {email}
        </Typography>
      </Box>
    </Box>
  );
};

const roleBGColors = [
  "#EE82EE",
  "#2E8B57",
  "#8B4513",
  "#228B22",
  "#47b2d5",
  "#FF7F50",
  "#FF1493",
  "#00008B",
  "#F0E68C",
  "#DC143C",
];

const Role = ({ role }: { role: string[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "5px",
      }}
    >
      {role?.map((r, index) => (
        <Box
          key={r}
          sx={{
            bgcolor: roleBGColors[index],
            padding: "6px",
            fontSize: "10px",
            color: "#fff",
            borderRadius: "18px",
            width: "fit-content",
            minWidth: "50px",
            textAlign: "center",
          }}
        >
          {r}
        </Box>
      ))}
    </Box>
  );
};
const UserRow: React.FC<UserRowProps> = ({
  row,
  index,
  isSelected,
  onSelect,
  activeRowIndex,
  showDetails,
  onRowClick,
  onUserDelete,
  onUserEdit,
}) => {
  return (
    <>
      <TableRow
        key={index}
        onClick={() => {
          onRowClick(index);
        }}
      >
        <TableCell sx={{ padding: 0.5, width: "45px", textAlign: "center" }}>
          <Checkbox
            sx={{ width: "24px", transform: "scale(0.8)" }}
            checked={isSelected}
            onChange={onSelect}
          />
        </TableCell>
        <TableCell sx={{ padding: 1, width: "30%" }}>
          <User
            firstName={row.firstName}
            lastName={row.lastName}
            email={row.email}
          />
        </TableCell>
        <TableCell sx={{ padding: 1, width: "30%" }}>
          <Role role={["Admin", "Manager", "Floor Admin", "Plumber", "User"]} />
        </TableCell>
        <TableCell sx={{ padding: 0.5, width: "20%", fontSize: "12px" }}>
          {format(parseISO(row.created), "yyyy-MM-dd HH:mm")}
        </TableCell>
        <TableCell sx={{ padding: 0.5, textAlign: "center" }}>
          <IconButton
            sx={{ color: "#192142" }}
            onClick={(e) => {
              e.stopPropagation();
              onUserEdit(index);
            }}
          >
            <BorderColorIcon sx={{ width: "16px", height: "16px" }} />
          </IconButton>
          <IconButton
            sx={{ color: "#192142" }}
            onClick={(e) => {
              e.stopPropagation();
              onUserDelete(index);
            }}
          >
            <DeleteOutlineIcon sx={{ width: "20px", height: "20px" }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          display:
            activeRowIndex === index && showDetails ? "table-row" : "none",
        }}
      >
        <TableCell colSpan={5}>
          <Box>
            <Typography sx={{ fontSize: "16px" }}>Details</Typography>
            <List sx={{ pt: 0 }}>
              <ListItem sx={{ pb: 0 }}>First Name : {row.firstName}</ListItem>
              <ListItem sx={{ pb: 0 }}>Last Name : {row.lastName}</ListItem>
              <ListItem sx={{ pb: 0 }}>User Name : {row.username}</ListItem>
              <ListItem sx={{ pb: 0 }}>
                List of Role : {row?.role?.toString()}
              </ListItem>
            </List>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserRow;
