import { Box, Chip } from "@mui/material";

const DateFilter = ({
  dateOptions,
  handleTimeFilterChange,
  selectedDateFilter,
}: {
  dateOptions: string[];
  handleTimeFilterChange: (filter: string) => void;
  selectedDateFilter: string;
}) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        justifyContent: "center",
      }}
    >
      {dateOptions?.map((filter: any) => (
        <Chip
          sx={{ cursor: "pointer" }}
          label={filter}
          variant={filter === selectedDateFilter ? "filled" : "outlined"}
          onClick={() => handleTimeFilterChange(filter)}
        ></Chip>
      ))}
    </Box>
  );
};

export default DateFilter;
