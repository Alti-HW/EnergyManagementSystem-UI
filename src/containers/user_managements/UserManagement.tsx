import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const UserManagement = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location?.pathname?.includes("users") ? "users" : "roles"
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  return (
    <Box sx={{ padding: "16px", bgcolor: "#F6F7FB", minHeight: "100vh" }}>
      <Typography sx={{ fontSize: "20px" }}>User Management</Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{
          backgroundColor: "background.paper",
          mt: 2,
          ml: -2,
          mr: -2,
          pl: 2,
        }}
      >
        <Tab
          sx={{ fontSize: "14px", padding: 0, textTransform: "none" }}
          value="users"
          label="Users"
          component={Link}
          to="/userManagement/users"
        />
        <Tab
          sx={{ fontSize: "14px", textTransform: "none" }}
          value="roles"
          label="Roles"
          component={Link}
          to="/userManagement/roles"
        />
      </Tabs>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserManagement;
