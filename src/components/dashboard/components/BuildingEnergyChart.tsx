import { Card } from "@mui/material";
import { BarChart, axisClasses } from "@mui/x-charts";
import { MouseEvent, useEffect, useRef, useState } from "react";
import ChartHeading from "./ChartHeading";
import { ChartProps } from "../types";
import FullView from "./FullView";
import CustomContextMenu from "../CustomContextMenu";
import CustomDialog from "../CustomDialog";
import { useBarChartClick } from "../hooks/useBarChartClick";
import {
  normalizeAllBuildingsData,
  normalizeBuildingDrilldownData,
} from "../../../utils/normalizeDashboardAPIData";
import useAxios from "../hooks/useAxiosHook";
import { buildingsDataURL, POST_REQ_HEADERS } from "../../../constants/apis";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

const BuildingEnergyChart = ({ startDate, endDate }: ChartProps) => {
  const [openFullViewModal, setOpenFullViewModal] = useState(false);
  const [buildingsData, setBuildingsData] = useState([]);
  const chartRef = useRef(null);
  const {
    selectedLabel,
    menuPosition,
    handleBarClick,
    handleClose,
    buildingId,
  } = useBarChartClick(buildingsData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [buildingDrillDownData, setBuildingDrillDownData] = useState([]);
  const {
    data: buildingsRawData,
    loading: isBuildingsDataLoading,
    error: buildingsDataError,
    fetchData: fetchBuildingsData,
  } = useAxios(buildingsDataURL, "POST", null, POST_REQ_HEADERS, false);

  const {
    data: buildingsDrillDownRawData,
    loading: isBuildingsDrillDownLoading,
    error: buildingDrillDownDataError,
    fetchData: fetchBuildingsDrillDownData,
  } = useAxios(buildingsDataURL, "POST", null, POST_REQ_HEADERS, false);

  useEffect(() => {
    fetchBuildingsData({ startDate, endDate });
  }, [startDate, endDate]);

  useEffect(() => {
    setBuildingsData(normalizeAllBuildingsData(buildingsRawData?.data));
  }, [buildingsRawData]);

  useEffect(() => {
    if (buildingId) {
      fetchBuildingsDrillDownData({ startDate, endDate, buildingId });
      setDialogOpen(true);
    }
  }, [buildingId]);

  useEffect(() => {
    let data = normalizeBuildingDrilldownData(
      buildingsDrillDownRawData?.data?.[0]
    );
    setBuildingDrillDownData(data);
  }, [buildingsDrillDownRawData]);

  const unitsFormatter = (num: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      notation: "compact", // Use compact notation (e.g., 1K, 1M, 1B, 1T)
      compactDisplay: "short", // Use the short version (e.g., 1K instead of 1 thousand)
    });
    return formatter.format(num);
  };

  const handleChartFullView = () => {
    setOpenFullViewModal(true);
  };

  const closeChartFullView = () => {
    setOpenFullViewModal(false);
  };
  const handleShowDetails = () => {
    setDialogOpen(true);
    handleClose();
  };
  const menuItems = [
    { label: selectedLabel || "No Label", onClick: () => {}, disabled: true },
    { label: `Drill by details ${selectedLabel}`, onClick: handleShowDetails },
  ];

  const renderChart = (fullscreen?: boolean) => (
    <div ref={chartRef}>
      {isBuildingsDataLoading ? (
        <Spinner />
      ) : buildingsDataError ? (
        <ErrorMessage />
      ) : (
        <>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                dataKey: "buildingName",
                tickLabelPlacement: "middle",
                tickLabelStyle: {
                  fontSize: "8px",
                },
                valueFormatter: (name) => {
                  return name.split(" ").join("\n");
                },
                label: "Building name",
                labelStyle: { fontSize: "10px", fontWeight: "700" },
              },
            ]}
            dataset={buildingsData}
            yAxis={[
              {
                label: "Units consumed",
                labelStyle: { fontSize: "10px", fontWeight: "700" },
                valueFormatter: unitsFormatter,
              },
            ]}
            series={[
              {
                dataKey: "totalEnergyConsumedKwh",
                label: "SUM (units consumed)",
              },
            ]}
            height={fullscreen ? 600 : 250}
            sx={{
              [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translate(-10px, 0)",
              },
              [`.MuiChartsAxis-label`]: {
                transform: "translateY(5px)",
              },
            }}
            slotProps={{
              legend: {
                position: {
                  vertical: "top",
                  horizontal: "right",
                },
                itemMarkWidth: 10,
                itemMarkHeight: 10,
                labelStyle: {
                  fontSize: "8px",
                },
              },
            }}
            onItemClick={(event, item) =>
              handleBarClick(event as MouseEvent, item)
            }
            colors={["#59E2C2"]}
          />
          <CustomContextMenu
            menuPosition={menuPosition}
            onClose={handleClose}
            menuItems={menuItems}
          />

          <CustomDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title={`Details for ${selectedLabel}`}
            label={selectedLabel}
            data={buildingDrillDownData}
            isLoading={isBuildingsDrillDownLoading}
            isError={buildingDrillDownDataError}
          />
        </>
      )}
    </div>
  );
  return (
    <Card className="buildingEnergy">
      <ChartHeading
        title="Daily Energy usage"
        onExpandIconClick={handleChartFullView}
        chartRef={chartRef}
      />
      {renderChart()}
      <FullView open={openFullViewModal} onClose={closeChartFullView}>
        {renderChart(true)}
      </FullView>
    </Card>
  );
};

export default BuildingEnergyChart;
