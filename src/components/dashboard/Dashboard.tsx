import "./Dashboard.scss";
import { Box, Button, Typography } from "@mui/material";
import ChartWrapper from "./components/ChartWrapper";
import Alarms from "./components/Alarms";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FeatureAccessControl from "../../authorization/feature.access.control";
import userAccess from "../../authorization/user.access.constants";
import { ComponentConfig } from "./types";

const Dashboard = ({ defaultConfig }: any) => {
  const [enalbeEditDashboard, setEnalbeEditDashboard] = useState(false);
  const [deleteDashboard, setDeleteDashboard] = useState(false);
  const [config, setConfig] = useState(defaultConfig);

  const onComponentDelete = (deletedItemIndex: number) => {
    console.log(deletedItemIndex);
    const components = config?.components;
    delete components[deletedItemIndex];
    // components?.splice(deletedItemIndex, 1);
    setConfig({ ...config, components });
  };

  const handleDeleteDashboard = () => {
    setConfig((active: any) => ({ ...active, components: [] }));
    setDeleteDashboard(true);
  };
  const componentMapper = (componentData: any, componentIndex: number) => {
    switch (componentData?.type) {
      case "chart":
        return (
          <ChartWrapper
            key={`${componentIndex}_chart`}
            enalbeEditDashboard={enalbeEditDashboard}
            onComponentDelete={onComponentDelete}
            componentIndex={componentIndex}
            {...componentData}
          />
        );
      case "alarms":
        return (
          <Alarms
            enalbeEditDashboard={enalbeEditDashboard}
            onComponentDelete={onComponentDelete}
            componentIndex={componentIndex}
          />
        );
    }
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          component={"h1"}
          sx={{ ml: 0.5, color: "#fff", fontSize: "24px", flex: 1 }}
        >
          {config?.title}
        </Typography>
        {!deleteDashboard && (
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
        )}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {config?.components?.map((component: ComponentConfig, index: number) =>
          componentMapper(component, index)
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
