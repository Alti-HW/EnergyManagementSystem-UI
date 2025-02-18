import { Box } from "@mui/material";
import FullView from "./FullView";
import useAxios from "../hooks/useAxiosHook";
import { POST_REQ_HEADERS } from "../../../constants/apis";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";

const ChartDetailedView = ({
  activeChartElement,
  config = {},
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

  const flatDataObject = (data: any, index: number, pathKeys: string[]) => {
    let output: any;
    if (data && Array.isArray(data)) {
      output = [];
      data.forEach((ele: any) => {
        output.push(ele[pathKeys[index]]);
      });
    } else if (data) {
    }
    index++;
    if (pathKeys[index]) {
      return flatDataObject(output?.flat(), index, pathKeys);
    } else {
      return output.flat();
    }
  };

  useEffect(() => {
    const data = chartDetailedData?.data;
    if (data) {
      setTableData(flatDataObject(data, 0, dataKey) ?? []);
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
