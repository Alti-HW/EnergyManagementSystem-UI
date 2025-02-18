import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ChartHeading from "./ChartHeading";
import useAxios from "../hooks/useAxiosHook";
import { POST_REQ_HEADERS } from "../../../constants/apis";
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
import { ChartWrapperProps, ComponentConfig } from "../types";

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
  color,
  detailedViewConfig,
  enableDetailedView,
  enableScrollInFullview,
  width: chartWrapperWidth,
  enalbeEditDashboard,
  onComponentDelete,
  componentIndex,
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
  const chartDataApi =
    dataApi?.find((api: any) => api.userFor === "chartData") ?? {};
  const filtersDataApi =
    dataApi?.find((api: any) => api.userFor === "filters") ?? {};
  const {
    data: chartRawData,
    loading,
    fetchData,
  } = useAxios(
    chartDataApi.url,
    chartDataApi.method ?? "POST",
    null,
    POST_REQ_HEADERS,
    false
  );

  const { data: filtersRawData, fetchData: fetchFiltersData } = useAxios(
    filtersDataApi?.url,
    filtersDataApi?.method ?? "POST",
    null,
    POST_REQ_HEADERS,
    false
  );

  const initilizeFilters = (filters: any) => {
    let output: any = [];
    filters?.forEach((filter: any) => {
      if (filter.showFilter === "true")
        output.push({
          id: filter.filterId,
          value: filter.filterValues?.[0]?.value ?? "",
          options: filter.filterValues ?? [],
          label: filter.filterLabel,
          dataPath: filter.dataPath,
          filterDataValueKey: filter.filterDataValueKey,
          filterDataLabelKey: filter.filterDataLabelKey,
          isParentFilter: filter.isParentFilter === "true",
          showFilter: filter?.showFilter === "true",
        });
    });
    return output;
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
      console.log(elements, chartRawData);
      setActiveChartElement(chartRawData?.data?.[elements?.[0]?.index]);
    }
  };

  useEffect(() => {
    if (filtersDataApi?.url) fetchFiltersData();
  }, []);

  useEffect(() => {
    if (filtersRawData && filters?.length > 0) {
      // let filters = filtersConfig;

      let parentFilterIndex = filters?.findIndex((filter: any) => {
        console.log(filter, "filter");
        return filter.isParentFilter;
      });
      let dependentFilterIndex = filters?.findIndex(
        (filter: any) => !filter.isParentFilter
      );
      let parentFilter = filters?.[parentFilterIndex];
      let dependentFilter = filters?.[dependentFilterIndex];

      let parentFilterOptions: any = [];
      let childFilterOptions: any = [];
      if (parentFilter) {
        filtersRawData?.data?.forEach((data: any) => {
          parentFilterOptions.push({
            label: data[parentFilter?.filterDataLabelKey],
            value: data[parentFilter?.filterDataValueKey],
          });
        });
        setFilters((current: any) => {
          current[parentFilterIndex] = {
            ...current?.[parentFilterIndex],
            value: parentFilterOptions?.[0]?.value,
            options: parentFilterOptions,
          };
          return [...current];
        });
      }
      if (dependentFilter) {
        filtersRawData?.data?.[0]?.[dependentFilter?.dataPath]?.forEach(
          (data: any) => {
            childFilterOptions.push({
              label: data[dependentFilter?.filterDataLabelKey],
              value: data[dependentFilter?.filterDataValueKey],
            });
          }
        );
      }
      setFilters((current: any) => {
        current[dependentFilterIndex] = {
          ...current[dependentFilterIndex],

          value: childFilterOptions?.[0]?.value,
          options: childFilterOptions,
        };
        return [...current];
      });
    }
  }, [filtersRawData]);

  console.log(filters);

  useEffect(() => {
    const { start, end } = getDates(selectedDateFilter);
    setStartDate(start);
    setEndDate(end);
  }, [selectedDateFilter]);

  useEffect(() => {
    if (startDate && endDate && chartDataApi?.payload) {
      let payload = chartDataApi?.payload;
      for (let key in chartDataApi?.payload) {
        if (key === "startDate") payload.startDate = startDate;
        else if (key === "endDate") payload.endDate = endDate;
        else {
          let filter = filters?.find((filter: any) => filter.id === key);
          payload[key] = filter?.value;
        }
      }
      fetchData(payload);
    } else {
      if (startDate && endDate) {
        fetchData({ startDate, endDate });
      }
    }
  }, [startDate, endDate, filters]);

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
    let data: any = { x: [], y: [] };
    if (chartRawData) {
      if (chartDataApi?.dataPathKey) {
        let flatdata = flatDataObject(
          chartRawData?.data,
          0,
          chartDataApi?.dataPathKey
        );
        flatdata?.forEach((ele: any) => {
          data.x.push(ele?.[xAxisKey]);
          data.y.push(ele?.[yAxisKey]);
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

  const handleFiltersChange = (
    event: any,
    index: number,
    isParentFilter: boolean
  ) => {
    const value = event?.target?.value;
    let options: any = [];
    let dependentFilterIndex = filters?.findIndex(
      (filter: any) => !filter.isParentFilter
    );
    let dependentFilter = filters[dependentFilterIndex];
    if (isParentFilter && dependentFilter && filtersRawData) {
      options = filtersRawData?.data
        ?.find((filter: any) => filter?.[filters[index]?.id] === value)
        ?.[dependentFilter?.dataPath]?.map((filter: any) => ({
          label: filter[dependentFilter?.filterDataLabelKey],
          value: filter[dependentFilter?.filterDataValueKey],
        }));
    }

    setFilters((current: any) => {
      current[index].value = event.target.value;

      if (isParentFilter && dependentFilter) {
        current[dependentFilterIndex].value = "";
        if (filtersRawData) {
          current[dependentFilterIndex].options = options;
        }
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
        }, 100);
      }
    }
  };

  return (
    <Card
      sx={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        p: 2,
        // width: "calc(50% - 8px)",
        width: chartWrapperWidth ?? "calc(50% - 8px)",
        boxSizing: "border-box",
        position: "relative",
        pb: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <ChartHeading
          title={title}
          onExpandIconClick={handleChartFullView}
          chartRef={chartRef}
          exportOptions={exportOptions}
          enalbeEditDashboard={enalbeEditDashboard}
          onComponentDelete={onComponentDelete}
          componentIndex={componentIndex}
        />
        {filters?.length > 0 && (
          <Box sx={{ gap: "10px", mt: 2, p: 1 }}>
            {filters.map((filter: any, index: number) => {
              return (
                filter?.showFilter && (
                  <FormControl
                    key={filter.id}
                    fullWidth
                    sx={{
                      width: "fit-content",
                      display: "inline-block",
                      mr: 2,
                    }}
                  >
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
                      onChange={(e) =>
                        handleFiltersChange(e, index, filter?.isParentFilter)
                      }
                      sx={{
                        fontSize: "12px",
                        "& .MuiSelect-select": {
                          padding: "6px",
                        },
                        maxWidth: "fit-content",
                        minWidth: "200px",
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
                        <MenuItem
                          key={option.value}
                          sx={{ fontSize: "12px" }}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )
              );
            })}
          </Box>
        )}
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
      </Box>
      {dateFilterConfig && dateFilterConfig?.showFilter === "true" && (
        <Box
        // sx={{
        //   position: "absolute",
        //   bottom: "16px",
        //   left: "50%",
        //   transform: "translateX(-50%)",
        //   width: "100%",
        // }}
        >
          <DateFilter
            dateOptions={dateFilterConfig?.filterValues}
            handleTimeFilterChange={handleTimeFilterChange}
            selectedDateFilter={selectedDateFilter}
          />
        </Box>
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
