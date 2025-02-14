import {
  Box,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { useEffect, useRef, useState } from "react";
import ChartHeading from "./ChartHeading";
import useAxios from "../hooks/useAxiosHook";
import { POST_REQ_HEADERS } from "../../../constants/apis";
import Chart from "./Chart";
import {
  getDates,
  getUpdatedEndDate,
  getUpdatedStartDate,
} from "../utils/getDates";
import ChartComponent from "./RChart";
import FullView from "./FullView";
import DateFilter from "./DateFilter";
import ChartDetailedView from "./ChartDetailedView";
import Spinner from "./Spinner";
import dayjs from "dayjs";

const ChartWrapper: React.FC = ({
  chartType,
  title,
  dataApi,
  xAxisKey,
  xAxisLabel,
  yAxisKey,
  yAxisLabel,
  xAxisDataFormatter,
  yAxisDataFormatter,
  filters: filtersConfig,
  dateFilter: dateFilterConfig,
  exportOptions,
  dataApiReqFormat,
  color,
  detailedViewConfig,
  enableDetailedView,
  enableScrollInFullview,
}: any): React.ReactNode => {
  const chartRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [fullView, setFullView] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState(
    dateFilterConfig?.filterValues?.[0]
  );
  const [chartData, setChartData] = useState(undefined);
  const [activeChartElement, setActiveChartElement] = useState<any>(null);
  const chartDataApi = dataApi?.find((api: any) => api.userFor === "chartData");
  const filtersDataApi = dataApi?.find((api: any) => api.userFor === "filters");
  const {
    data: chartRawData,
    loading,
    error,
    fetchData,
  } = useAxios(
    chartDataApi.url,
    chartDataApi.method ?? "POST",
    null,
    POST_REQ_HEADERS,
    false
  );

  const {
    data: filtersRawData,
    loading: filtersLoading,
    error: filtersError,
    fetchData: fetchFiltersData,
  } = useAxios(
    filtersDataApi?.url,
    filtersDataApi?.method ?? "POST",
    null,
    POST_REQ_HEADERS,
    false
  );

  const initilizeFilters = (filters: any) => {
    return filters?.map((filter: any) => {
      return {
        id: filter.filterId,
        value: "",
        options: [],
        label: filter.filterLabel,
        dataPath: filter.dataPath,
        filterDataValueKey: filter.filterDataValueKey,
        filterDataLabelKey: filter.filterDataLabelKey,
      };
    });
  };

  const [filters, setFilters] = useState(initilizeFilters(filtersConfig));

  const handleChartFullView = () => {
    setFullView(true);
  };

  const closeChartFullView = () => {
    setFullView(false);
    const { start, end } = getDates(selectedDateFilter);
    setStartDate(start);
    setEndDate(end);
  };
  const handleTimeFilterChange = (dateStr: string) => {
    setSelectedDateFilter(dateStr);
  };

  const handleChartClick = (elements: any) => {
    if (enableDetailedView === "true") {
      setActiveChartElement(chartRawData?.data?.[elements?.[0]?.index]);
    }
  };

  useEffect(() => {
    if (filtersDataApi) fetchFiltersData();
  }, []);

  useEffect(() => {
    if (filtersRawData) {
      let filters = filtersConfig;
      // let filters = filtersConfig?.filter(
      //   (filter: any) => filter.filterType === "dropdown"
      // );
      let [parentFilter, childFilter] = filters;
      let parentFilterOptions: any = [];
      let childFilterOptions: any = [];

      filtersRawData?.data?.map((data: any) => {
        parentFilterOptions.push({
          label: data[parentFilter?.filterDataLabelKey],
          value: data[parentFilter?.filterDataValueKey],
        });
      });
      filtersRawData?.data?.[0]?.[childFilter?.dataPath]?.map((data: any) => {
        childFilterOptions.push({
          label: data[childFilter?.filterDataLabelKey],
          value: data[childFilter?.filterDataValueKey],
        });
      });

      setFilters((current: any) => {
        return [
          {
            ...current[0],
            value: parentFilterOptions?.[0]?.value,
            options: parentFilterOptions,
          },
          {
            ...current[1],
            value: childFilterOptions?.[0]?.value,
            options: childFilterOptions,
          },
        ];
      });
    }
  }, [filtersRawData]);

  useEffect(() => {
    const { start, end } = getDates(selectedDateFilter);
    console.log(selectedDateFilter, dateFilterConfig);
    setStartDate(start);
    setEndDate(end);
  }, [selectedDateFilter]);

  useEffect(() => {
    if (filters?.length > 0) {
      if (startDate && endDate && (filters?.[0].value || filters?.[1].value))
        fetchData({
          endDate,
          startDate,
          [filters[0].id]: filters[0].value,
          [filters[1].id]: filters[1].value,
        });
    } else {
      if (startDate && endDate) {
        fetchData({ endDate, startDate });
      }
    }
  }, [startDate, endDate, filters]);

  useEffect(() => {
    let data: any = { x: [], y: [] };
    if (chartRawData) {
      if (chartDataApi?.dataPathKey) {
        let pathKeys = ["floorConsumptions", "floorDetails"];
        let keyIndex = 0;
        chartRawData?.data?.forEach((element: any) => {
          if (Array.isArray(element?.[pathKeys[keyIndex]])) {
            let item = element?.[pathKeys[keyIndex]];
            keyIndex = keyIndex + 1;

            if (item && Array.isArray(item)) {
              item?.forEach((nested) => {
                let item1 = nested?.[pathKeys[keyIndex]];
                keyIndex = keyIndex + 1;

                if (item1 && Array.isArray(item1)) {
                  console.log(item1);
                  item1 = item1.sort((a: any, b: any) => {
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);

                    // Returning the subtraction of two dates will give the time difference in milliseconds
                    return dateA.getTime() - dateB.getTime();
                  });
                  item1?.forEach((nested1: any) => {
                    let item2 = nested1?.[pathKeys[keyIndex]];
                    if (!item2) {
                      data.x.push(nested1?.[xAxisKey]);
                      data.y.push(nested1?.[yAxisKey]);
                    }
                  });
                }
              });
            }
          }
        });
      } else {
        chartRawData?.data?.forEach((obj: any) => {
          data.x.push(obj?.[xAxisKey]);
          data.y.push(obj?.[yAxisKey]);
        });
      }
      setChartData(data);
    }
  }, [chartRawData]);
  // // console.log(chartData);

  const handleFiltersChange = (event: any, index: number) => {
    const value = event?.target?.value;
    let options: any = [];
    if (index === 0) {
      options = filtersRawData?.data
        ?.find((filter: any) => filter?.[filters[0]?.id] === value)
        ?.[filters[1]?.dataPath]?.map((filter: any) => ({
          label: filter[filters[1]?.filterDataLabelKey],
          value: filter[filters[1]?.filterDataValueKey],
        }));
    }

    setFilters((current: any) => {
      current[index].value = event.target.value;
      if (index == 0) {
        current[1].value = "";
        current[1].options = options;
      }
      return [...current];
    });
  };

  const handleOnScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;
      const scrollLeft = scrollContainer.scrollLeft;
      console.log(
        "scrollLeft + clientWidth :",
        scrollLeft + clientWidth,
        "   scrollWidth - 10",
        scrollWidth - 10,
        scrollLeft,
        loading
      );

      if (scrollLeft < 10 && !loading) {
        //Left side call
        console.log("start date updated");
        let start = getUpdatedStartDate(selectedDateFilter, startDate);
        setStartDate(start);
        setTimeout(() => {
          scrollContainer.scrollLeft = 20;
        }, 100);
      } else if (scrollLeft + clientWidth > scrollWidth - 10 && !loading) {
        /// Right side call
        console.log("end date updated");
        let end = getUpdatedEndDate(selectedDateFilter, endDate);
        setEndDate(end);
        const oldScrollWidth = scrollWidth;
        setTimeout(() => {
          const newScrollWidth = scrollContainer.scrollWidth;
          scrollContainer.scrollLeft += newScrollWidth - oldScrollWidth - 10;
          console.log("scrollContainer.scrollLeft", scrollContainer.scrollLeft);
        }, 100);
      }
    }
  };

  return (
    <Card
      sx={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        p: 2,
        width: "calc(50% - 8px)",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <ChartHeading
        title={title}
        onExpandIconClick={handleChartFullView}
        chartRef={chartRef}
        exportOptions={exportOptions}
      />
      <Box sx={{ display: "flex", gap: "10px", mt: 2, p: 1 }}>
        {filters?.length > 0 &&
          filters.map((filter: any, index: number) => {
            return (
              <FormControl fullWidth>
                <InputLabel
                  id={`${filter.id}label`}
                  sx={{
                    top: "-10px",
                    fontSize: "12px",
                    "&.Mui-focused, &.MuiFormLabel-filled": { top: 0 },
                    color: "#000",
                  }}
                >
                  {filter?.label}
                </InputLabel>
                <Select
                  labelId={`${filter.id}label`}
                  id={filter.id}
                  value={filter.value}
                  label="Age"
                  onChange={(e) => handleFiltersChange(e, index)}
                  sx={{
                    fontSize: "12px",
                    "& .MuiSelect-select": {
                      padding: "6px",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Set the max height here
                        overflow: "auto", // Add scrollbar when overflow
                      },
                    },
                  }}
                >
                  {filter?.options?.map((option: any) => (
                    <MenuItem sx={{ fontSize: "12px" }} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          })}
      </Box>
      <Box sx={{ minHeight: "300px" }} ref={chartRef}>
        {!chartData && <Spinner />}
        {chartData && (
          <ChartComponent
            data={chartData}
            loading={loading}
            type={chartType}
            chartData={chartData}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
            yAxisDataFormatter={yAxisDataFormatter}
            xAxisDataFormatter={xAxisDataFormatter}
            color={color}
            handleChartClick={handleChartClick}
          />
        )}
      </Box>
      {fullView && (
        <FullView open={fullView} onClose={closeChartFullView}>
          <>
            <ChartComponent
              data={chartData}
              loading={loading}
              type={chartType}
              chartData={chartData}
              xAxisLabel={xAxisLabel}
              yAxisLabel={yAxisLabel}
              yAxisDataFormatter={yAxisDataFormatter}
              xAxisDataFormatter={xAxisDataFormatter}
              color={color}
              fullView={fullView}
              handleOnScroll={handleOnScroll}
              scrollContainerRef={scrollContainerRef}
              enableScrollInFullview={enableScrollInFullview === "true"}
            />
            {dateFilterConfig && dateFilterConfig?.showFilter === "true" && (
              <DateFilter
                dateOptions={dateFilterConfig?.filterValues}
                handleTimeFilterChange={handleTimeFilterChange}
                selectedDateFilter={selectedDateFilter}
              />
            )}
          </>
        </FullView>
      )}
      {dateFilterConfig && dateFilterConfig?.showFilter === "true" && (
        <DateFilter
          dateOptions={dateFilterConfig?.filterValues}
          handleTimeFilterChange={handleTimeFilterChange}
          selectedDateFilter={selectedDateFilter}
        />
      )}
      {activeChartElement && (
        <ChartDetailedView
          activeChartElement={activeChartElement}
          config={detailedViewConfig}
          onClose={() => setActiveChartElement(null)}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </Card>
  );
};

export default ChartWrapper;
