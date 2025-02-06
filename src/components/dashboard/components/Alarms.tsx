import { Card } from "@mui/material";
import ChartHeading from "./ChartHeading";
import { useState } from "react";
import FullView from "./FullView";

const Alarms = () => {
  const [openFullViewModal, setOpenFullViewModal] = useState(false);
  const openFullView = () => {
    setOpenFullViewModal(true);
  };
  const closeFullView = () => {
    setOpenFullViewModal(false);
  };
  return (
    <Card className="buildingEnergy">
      <ChartHeading title="Alerms" onExpandIconClick={openFullView} />
      <p className="noAlermsText">Currently no active Alarms</p>
      <FullView open={openFullViewModal} onClose={closeFullView}>
        <p className="noAlermsText">Currently no active Alarms</p>
      </FullView>
    </Card>
  );
};

export default Alarms;
