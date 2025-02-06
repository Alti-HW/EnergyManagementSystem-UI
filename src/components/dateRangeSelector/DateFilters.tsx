import { Box, Button, Paper, Popover } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ToggleButtonSelector from "../ToggleButton/ToggleButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useRef, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  historyTimefilters,
  lastFilterOptions,
  relativeFilterOptions,
  relativeTimefilters,
  timeFilters,
} from "../../constants/staticDateFilters";
import dayjs, { Dayjs } from "dayjs";
import { DateFilterTypes } from "./types";
import "./DateFilter.scss";
import Selector from "./components/Selector";
import DateTimeSelector from "./components/DateTimeSelector";
import {
  periodCalculatorForLastSelector,
  periodCalculatorForRelativeSelector,
} from "../../utils/dateFiltersUtils";

const DateFilters = ({
  onDateRangeChange,
  defaultStartDate,
  defaultEndDate,
}: DateFilterTypes) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [timeFilterValue, setTimeFilterValue] = useState("relative");
  const [activeView, setActiveView] = useState("relative");
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs(defaultStartDate)
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(defaultEndDate));
  const [lastSelector, setLastSelector] = useState("");
  const [relativeSelector, setRelativeSelector] = useState("currentDay");
  const [btnLabel, setBtnLabel] = useState("");

  const startDateRef = useRef<any>(null);
  const endDateRef = useRef<any>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleTimeFiltersOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleTimeFiltersClose = () => {
    setAnchorEl(null);
  };

  const handleViewChange = (filter: string) => {
    setActiveView(filter);
  };
  const handleTimefilterChange = (filter: string) => {
    setTimeFilterValue(filter);
    console.log("handleTimefilterChange", filter, activeView);
    if (filter === "relative" && activeView === "range") {
      setActiveView("last");
    }
  };

  const handleStartDatePickerChange = (date: Dayjs | null) => {
    startDateRef.current = date;
  };
  const handleEndDatePickerChange = (date: Dayjs | null) => {
    endDateRef.current = date;
  };

  const handleStartDatePickerClose = () => {
    setRelativeSelector("");
    setLastSelector("");
    setStartDate(startDateRef.current);
  };
  const handleEndDatePickerClose = () => {
    setRelativeSelector("");
    setLastSelector("");
    setEndDate(endDateRef.current);
  };
  const updateBtnLabel = () => {
    let text = "";
    switch (activeView) {
      case "last":
        text =
          lastFilterOptions.find((option) => option.value === lastSelector)
            ?.label ?? "";
        break;
      case "relative":
        text =
          relativeFilterOptions.find(
            (option) => option.value === relativeSelector
          )?.label ?? "";
        break;
      default:
        text = `from ${startDate?.format("DD/MM/YYYY")} to ${endDate?.format(
          "DD/MM/YYYY"
        )}`;
    }
    let label = `${
      timeFilterValue === "relative" ? "Relative" : "History"
    } - ${text}`;
    setBtnLabel(label);
  };
  const handleUpdate = () => {
    setAnchorEl(null);
    updateBtnLabel();
    onDateRangeChange(
      startDate?.format("YYYY-MM-DD") ?? "",
      endDate?.format("YYYY-MM-DD") ?? ""
    );
  };

  const lastSelectorChange = (value: string) => {
    const { start, end } = periodCalculatorForLastSelector(value);
    setLastSelector(value);
    setRelativeSelector("");
    setStartDate(dayjs(start));
    setEndDate(dayjs(end));
  };
  const relativeSelectorChange = (value: string) => {
    setRelativeSelector(value);
    setLastSelector("");
    if (value === "currentHour") {
      let start = new Date();
      let end = new Date();
      start.setMinutes(0, 0, 0);
      end.setMinutes(59, 59, 999);
      setStartDate(dayjs(start));
      setEndDate(dayjs(end));
      console.log(start, end);
    } else {
      let { start, end } = periodCalculatorForRelativeSelector(value);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      setStartDate(dayjs(start));
      setEndDate(dayjs(end));
      console.log(start, end);
    }
  };
  useEffect(() => {
    updateBtnLabel();
  }, []);
  return (
    <>
      <Button className="dateRange" onClick={handleTimeFiltersOpen}>
        {btnLabel}
        <AccessTimeIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleTimeFiltersClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            minWidth: "450px",
          },
        }}
      >
        <Paper
          sx={{
            padding: "30px 20px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ToggleButtonSelector
            onChange={handleTimefilterChange}
            options={timeFilters}
            btnWidth={"200px"}
            value={timeFilterValue}
          />
          <Box
            sx={{
              border: "1px solid #0000001f",
              borderRadius: "4px",
              p: 2,
              mt: 2,
              mb: 2,
              width: "calc(100% - 64px)",
            }}
          >
            <h2 className="boxSelecorHeading">Time window</h2>
            <ToggleButtonSelector
              onChange={handleViewChange}
              btnWidth="fit-content"
              variant="default"
              value={activeView}
              options={
                timeFilterValue === "relative"
                  ? relativeTimefilters
                  : historyTimefilters
              }
            />
            {activeView === "last" && (
              <Selector
                options={lastFilterOptions}
                onChange={lastSelectorChange}
                name={"Last"}
                value={lastSelector}
              />
            )}
            {activeView === "relative" && (
              <Selector
                options={relativeFilterOptions}
                onChange={relativeSelectorChange}
                name={"Relative"}
                value={relativeSelector}
              />
            )}
            {activeView === "range" && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="dateTimeSelectorWrapper">
                  <DateTimeSelector
                    onClose={handleStartDatePickerClose}
                    value={startDate}
                    label="Start date"
                    onChange={handleStartDatePickerChange}
                  />
                  <DateTimeSelector
                    onClose={handleEndDatePickerClose}
                    value={endDate}
                    label="End date"
                    onChange={handleEndDatePickerChange}
                  />
                </div>
              </LocalizationProvider>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "calc(100% - 64px)",
            }}
          >
            <Button
              sx={{
                fontSize: "14px",
                textTransform: "unset",
                color: "#406D91",
              }}
              onClick={handleTimeFiltersClose}
            >
              Cancel
            </Button>
            <Button className="dateRange" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Paper>
      </Popover>
    </>
  );
};

export default DateFilters;
