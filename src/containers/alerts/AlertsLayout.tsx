import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
// import FeatureAccessControl from "../../../../authorization/feature.access.control";
// import userAccess from "../../../../authorization/user.access.constants";

const AlertsLayout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location?.pathname?.includes("rules") ? "rules" : "history"
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  return (
    <Box sx={{ padding: "16px", bgcolor: "#F6F7FB", minHeight: "100vh" }}>
      <Typography variant="h6" sx={{ color: "#6e6e6e" }}>
        Alerts
      </Typography>
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
        {/* <FeatureAccessControl requiredRoles={userAccess.VIEW_USERS}> */}
        <Tab
          sx={{ fontSize: "14px", padding: 0, textTransform: "none" }}
          value="rules"
          label="Rules"
          component={Link}
          to="/alerts/rules"
        />
        {/* </FeatureAccessControl> */}
        {/* <FeatureAccessControl requiredRoles={userAccess.VIEW_ROLES}> */}
        <Tab
          sx={{ fontSize: "14px", textTransform: "none" }}
          value="history"
          label="Alerts history"
          component={Link}
          to="/alerts/history"
        />
        {/* </FeatureAccessControl> */}
      </Tabs>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AlertsLayout;
