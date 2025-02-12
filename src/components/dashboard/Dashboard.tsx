import "./Dashboard.scss";
import { Box, Typography } from "@mui/material";
import ChartWrapper from "./newComponents/ChartWrapper";
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
      <Typography
        component={"h1"}
        sx={{ ml: 0.5, mb: 2, color: "#fff", fontSize: "24px" }}
      >
        {config?.title}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {config?.components?.map((component: any) =>
          componentMapper(component)
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
