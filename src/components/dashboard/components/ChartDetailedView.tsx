import { Box } from "@mui/material";
import FullView from "./FullView";
import useAxios from "../hooks/useAxiosHook";
import { POST_REQ_HEADERS } from "../../../constants/apis";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";

const ChartDetailedView = ({
  activeChartElement,
  config,
  onClose,
  startDate,
  endDate,
}: any) => {
  console.log("config", config);
  const { dataApi = "", apiMethod, keyToBeRead, dataKey, tableConfig } = config;
  const {
    data: chartDetailedData,
    loading,
    error,
    fetchData,
  } = useAxios(dataApi, apiMethod ?? "POST", null, POST_REQ_HEADERS, false);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData({
      startDate,
      endDate,
      [keyToBeRead]: activeChartElement[keyToBeRead],
    });
  }, []);

  const normalizeData = (data: any, dataKey: string, secondLevel: string) => {
    console.log(data);
    const keys = dataKey.split(".");
    let normalizedData: any = [];

    data.forEach((item: any) => {
      let nestedData = item;

      for (let key of keys) {
        let obj = nestedData[key];
        if (!obj) break;
        else nestedData = obj;
      }

      if (Array.isArray(nestedData)) {
        nestedData.forEach((detail) => {
          let keys = secondLevel.split(".");
          for (let key of keys) {
            let obj = detail[key];
            if (!obj) break;
            else detail = obj;
          }
          if (Array.isArray(detail)) {
            detail.forEach((subDetail) => {
              normalizedData.push({
                ...subDetail,
              });
            });
          } else {
            normalizedData.push({
              ...detail,
            });
          }
        });
      }
    });

    return normalizedData;
  };

  useEffect(() => {
    const data = chartDetailedData?.data;
    if (data) {
      setTableData(normalizeData(data, "floorConsumptions", "floorDetails"));
    }
  }, [chartDetailedData]);

  return (
    <FullView open onClose={onClose}>
      <Box>
        {loading && <Spinner />}
        {tableData.length > 0 && (
          <DataTable data={tableData} config={tableConfig} />
        )}
      </Box>
    </FullView>
  );
};

export default ChartDetailedView;
