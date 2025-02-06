import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import "./ToggleButton.scss";
import { ToggleButtonProps } from "./types";

const defaultVariant = {
  backgroundColor: "#F0F0F0",
  borderRadius: "40px",
  padding: "5px 10px",
  color: "#0000008a",
  ".MuiToggleButtonGroup-grouped": {
    color: "#0000008a",
    lineHeight: "12px",
    padding: "4px",
  },
  ".Mui-selected": {
    color: "#192142",
    backgroundColor: "#fff",
    border: "1px solid #192142",

    "&:hover": {
      backgroundColor: "#fff",
    },
  },
};
const greenVariant = {
  backgroundColor: "#406D91",
  borderRadius: "40px",
  padding: "5px 10px",
  color: "#fff",
  ".MuiToggleButtonGroup-grouped": {
    color: "#fff",
    padding: "2px 4px",
  },
  ".Mui-selected": {
    color: "#fff",
    backgroundColor: "#192142",

    "&:hover": {
      backgroundColor: "#192142",
    },
  },
};
const ToggleButtonSelector = ({
  onChange,
  options = [],
  variant = "green",
  btnWidth = "fit-content",
  value,
}: ToggleButtonProps) => {
  const [alignment, setAlignment] = useState(value ?? options?.[0]?.value); // Default state

  const handleChange = (event: any, newAlignment: any) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onChange(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={value ?? alignment}
      exclusive
      onChange={handleChange}
      aria-label="text alignment"
      className="toggleButton"
      sx={{
        "&.MuiToggleButtonGroup-root":
          variant === "default" ? { ...defaultVariant } : { ...greenVariant },
      }}
    >
      {options.map(({ value, label }) => (
        <ToggleButton
          sx={{ width: btnWidth, minWidth: "70px" }}
          key={value}
          value={value}
          aria-label={label}
        >
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtonSelector;
