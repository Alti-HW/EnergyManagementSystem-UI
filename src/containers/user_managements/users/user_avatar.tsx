import { Avatar, Box, Typography } from "@mui/material";

const UserAvatar = ({
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
        <Typography
          sx={{ fontSize: "12px", color: "#000", wordBreak: "break-all" }}
        >
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography sx={{ fontSize: "10px", color: "#777a7a" }}>
          {email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserAvatar;
