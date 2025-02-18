import { Card, Typography } from "@mui/material";
import ChartHeading from "./ChartHeading";
import { useState } from "react";
import FullView from "./FullView";

const Alarms = ({
  enalbeEditDashboard,
  onComponentDelete,
  componentIndex,
}: {
  enalbeEditDashboard: boolean;
  onComponentDelete: (index: number) => void;
  componentIndex: number;
}) => {
  const [openFullViewModal, setOpenFullViewModal] = useState(false);
  const openFullView = () => {
    setOpenFullViewModal(true);
  };
  const closeFullView = () => {
    setOpenFullViewModal(false);
  };
  return (
    <Card
      sx={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        p: 2,
        width: "calc(50% - 8px)",
        boxSizing: "border-box",
      }}
    >
      <ChartHeading
        enalbeEditDashboard={enalbeEditDashboard}
        onComponentDelete={onComponentDelete}
        componentIndex={componentIndex}
        title="Alarms"
        onExpandIconClick={openFullView}
      />
      <Typography sx={{ fontSize: "14px", textAlign: "center", mt: 5 }}>
        Currently no active Alarms
      </Typography>
      <FullView open={openFullViewModal} onClose={closeFullView}>
        <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
          Currently no active Alarms
        </Typography>
      </FullView>
    </Card>
  );
};

export default Alarms;
