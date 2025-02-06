import { Popper } from "@mui/material";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { DateTimeSelectorProps } from "../types";

const DateTimeSelector = ({
  label,
  onChange,
  value,
  onClose,
}: DateTimeSelectorProps) => {
  return (
    <DateTimePicker
      value={value}
      format="DD/MM/YYYY hh:mm A"
      label={label}
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
        seconds: renderTimeViewClock,
      }}
      sx={{
        "& .MuiInputLabel-root": {
          fontSize: "14px",
        },
        "& .MuiOutlinedInput-input ": {
          fontSize: "14px",
        },
        width: "200px",
      }}
      slots={{
        popper: (props) => (
          <Popper
            {...props}
            style={{
              zIndex: 9999,
              maxHeight: "300px",
              overflowY: "auto",
              borderRadius: "4px",
              fontSize: "14px",
              boxShadow:
                "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
            }}
          />
        ),
      }}
      onChange={onChange}
      onClose={onClose}
    />
  );
};
export default DateTimeSelector;
