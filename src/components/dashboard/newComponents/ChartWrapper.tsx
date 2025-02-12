import { Box, Card, Chip } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { useEffect, useRef, useState } from "react";
import ChartHeading from "../components/ChartHeading";
import useAxios from "../hooks/useAxiosHook";
import { POST_REQ_HEADERS } from "../../../constants/apis";
import Chart from "./Chart";

const ChartWrapper: React.FC = ({
  chartType,
  title,
  dataApi,
  xAxisKey,
  xAxisLabel,
  yAxisKey,
  yAxisLabel,
  apiMethod,
  xAxisDataFormatter,
  yAxisDataFormatter,
  filters,
  exportOptions,
  dataApiReqFormat,
}: any): React.ReactNode => {
  const chartRef = useRef(null);
  const handleChartFullView = () => {};

  const [chartData, setChartData] = useState([]);
  const {
    data: chartRawData,
    loading,
    error,
    fetchData,
  } = useAxios(dataApi, apiMethod ?? "POST", null, POST_REQ_HEADERS, false);
  useEffect(() => {
    // Need to figureout this request to get it from config
    fetchData({ endDate: "2024-12-31", startDate: "2024-01-01" });
  }, []);

  useEffect(() => {
    if (chartRawData) {
      let normalizedData = chartRawData?.data?.map((obj: any) => ({
        x: obj[xAxisKey],
        y: obj[yAxisKey],
      }));
      setChartData(normalizedData);
    }
  }, [chartRawData]);
  const dateFilters =
    filters?.find((filter: any) => filter.filterType === "date") ?? {};
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
        title={title}
        onExpandIconClick={handleChartFullView}
        chartRef={chartRef}
        exportOptions={exportOptions}
      />
      <div ref={chartRef}>
        <Chart
          loading={loading}
          type={chartType}
          chartData={chartData}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          yAxisDataFormatter={yAxisDataFormatter}
          xAxisDataFormatter={xAxisDataFormatter}
        />
      </div>
      {dateFilters && dateFilters?.filterValues && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          {dateFilters?.filterValues?.map((filter: any) => (
            <Chip
              sx={{ cursor: "pointer" }}
              label={filter}
              variant="outlined"
            ></Chip>
          ))}
        </Box>
      )}
    </Card>
  );
};

export default ChartWrapper;
