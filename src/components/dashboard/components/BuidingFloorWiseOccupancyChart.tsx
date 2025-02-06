import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { BarChart, axisClasses } from "@mui/x-charts";
import ChartHeading from "./ChartHeading";
import { useEffect, useMemo, useState } from "react";
import { ChartProps } from "../types";
import FullView from "./FullView";
import useAxios from "../hooks/useAxiosHook";
import {
  buildingOccupancyURL,
  POST_REQ_HEADERS,
} from "../../../constants/apis";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { normalizeBuildingOccupancy } from "../../../utils/normalizeDashboardAPIData";

const BuidingFloorWiseOccupancyChart = ({
  startDate,
  endDate,
  buildingsAndFloorsNames,
}: ChartProps) => {
  const [openFullViewModal, setOpenFullViewModal] = useState(false);
  const [buildingId, setBuildingId] = useState("");
  const [floorId, setFloorId] = useState("");
  const [buildingFloorwiseData, setBuildingFloorwiseData] = useState([]);
  const {
    data: buildingsFloorwiseRawData,
    loading: isBuildingsFloorwiseDataLoading,
    error: buildingsFloorwiseDataError,
    fetchData: fetchBuildingFloorwiseData,
  } = useAxios(buildingOccupancyURL, "POST", null, POST_REQ_HEADERS, false);
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
  const handleBuidlingIdChange = (event: any) => {
    console.log(event);
    setBuildingId(event.target.value);
    setFloorId("");
  };
  const handleFloorIdChange = (event: any) => {
    console.log(event);
    setFloorId(event.target.value);
  };

  useEffect(() => {
    setBuildingId(buildingsAndFloorsNames?.[0]?.buildingId ?? "");
  }, [buildingsAndFloorsNames]);

  useEffect(() => {
    if (buildingId !== "") {
      fetchBuildingFloorwiseData({
        startDate,
        endDate,
        buildingId,
        ...(floorId !== "" && { floorId }),
        metricType: "peroccupancy",
      });
    }
  }, [buildingId, floorId, startDate, endDate]);
  useEffect(() => {
    console.log("buildingsFloorwiseRawData", buildingsFloorwiseRawData);
    setBuildingFloorwiseData(
      normalizeBuildingOccupancy(
        buildingsFloorwiseRawData?.data,
        floorId !== ""
      )
    );
  }, [buildingsFloorwiseRawData]);

  const floorList = useMemo(
    () =>
      buildingsAndFloorsNames?.find(
        (building: any) => building.buildingId === buildingId
      )?.floors,
    [buildingId, buildingsAndFloorsNames]
  );
  const selectedBuildingName = useMemo(() => {
    let building = buildingsAndFloorsNames?.find(
      (building: any) => building.buildingId === buildingId
    )?.name;
    let floor = floorList?.find(
      (floor: any) => floor.floorId === floorId
    )?.floorNumber;
    return `${building ? "of " + building : ""} `;
  }, [buildingId, floorId]);

  const renderChart = (fullscreen?: boolean) => (
    <>
      {isBuildingsFloorwiseDataLoading ? (
        <Spinner />
      ) : buildingsFloorwiseDataError ? (
        <ErrorMessage />
      ) : (
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              dataKey: "x",
              tickLabelPlacement: "middle",
              tickLabelStyle: {
                fontSize: "8px",
              },
              label: floorId !== "" ? "Date & Time" : "Floor number",
              labelStyle: { fontSize: "10px", fontWeight: "700" },
            },
          ]}
          dataset={buildingFloorwiseData}
          yAxis={[
            {
              label: "Units consumed per Person",
              labelStyle: { fontSize: "10px", fontWeight: "700" },
              valueFormatter: unitsFormatter,
            },
          ]}
          series={[{ dataKey: "y", label: "Units consumed / SUM(Occupancy)" }]}
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
          colors={["#59E2C2"]}
        />
      )}
    </>
  );

  console.log(buildingFloorwiseData);
  const FilterComponent = () => {
    return (
      <div style={{ padding: "10px" }}>
        <FormControl fullWidth>
          <InputLabel sx={{ fontSize: "12px" }} id="building-id-label">
            Building
          </InputLabel>
          <Select
            labelId="building-id-label"
            id="building-id"
            value={buildingId}
            label="Building"
            onChange={handleBuidlingIdChange}
            sx={{ minWidth: "150px", mb: "20px", fontSize: "12px" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflowY: "auto",
                },
              },
            }}
          >
            {buildingsAndFloorsNames.map((building: any) => (
              <MenuItem
                sx={{ fontSize: "12px" }}
                key={building.buildingId}
                value={building.buildingId}
              >
                {building.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel sx={{ fontSize: "12px" }} id="floor-id-label">
            Floor
          </InputLabel>
          <Select
            labelId="floor-id-label"
            id="floor-id"
            value={floorId}
            label="Floor"
            onChange={handleFloorIdChange}
            sx={{ minWidth: "150px", fontSize: "12px" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflowY: "auto",
                },
              },
            }}
          >
            {floorList.map((floor: any) => (
              <MenuItem
                sx={{ fontSize: "12px" }}
                key={floor.floorId}
                value={floor.floorId}
              >
                {floor.floorNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };
  return (
    <Card className="buildingEnergy">
      <ChartHeading
        title={`Occupant specific energy utilization ${selectedBuildingName}`}
        onExpandIconClick={handleChartFullView}
        FilterComponent={FilterComponent}
      />
      {renderChart()}

      <FullView open={openFullViewModal} onClose={closeChartFullView}>
        {renderChart(true)}
      </FullView>
    </Card>
  );
};

export default BuidingFloorWiseOccupancyChart;
