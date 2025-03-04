import "./Dashboard.scss";
import { Box, Typography } from "@mui/material";
import ChartWrapper from "./components/ChartWrapper";
import Alarms from "./components/Alarms";

const componentMapper = (componentData: any) => {
  switch (componentData?.type) {
    case "chart":
      return <ChartWrapper {...componentData} />;
    case "alarms":
      return <Alarms />;
  }
};
const Dashboard = ({ config }: any) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          component={"h1"}
          sx={{ ml: 0.5, color: "#fff", fontSize: "24px", flex: 1 }}
        >
          {config?.title}
        </Typography>
        {/* {!deleteDashboard && (
          <>
            <FeatureAccessControl
              requiredRoles={[...userAccess.EDIT_DASHBOARD]}
            >
              <Button
                sx={{
                  fontSize: "14px",
                  color: "#fff",
                  textTransform: "none",
                }}
                onClick={() => setEnalbeEditDashboard((flag) => !flag)}
              >
                {enalbeEditDashboard ? (
                  <CloseIcon />
                ) : (
                  <>
                    Edit
                    <EditIcon sx={{ width: "16px", height: "16px", ml: 0.5 }} />
                  </>
                )}
              </Button>
            </FeatureAccessControl>
            <FeatureAccessControl
              requiredRoles={[...userAccess.DELETE_DASHBOARD]}
            >
              <Button
                sx={{
                  fontSize: "14px",
                  color: "#fff",
                  textTransform: "none",
                }}
                onClick={handleDeleteDashboard}
              >
                Delete
                <DeleteIcon sx={{ width: "16px", height: "16px", ml: 0.5 }} />
              </Button>
            </FeatureAccessControl>
          </>
        )} */}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {config?.components?.map((component: any) =>
          componentMapper(component)
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
