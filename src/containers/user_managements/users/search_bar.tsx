import React, { ChangeEvent } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({
  onChange,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <TextField
    label="Search"
    variant="outlined"
    size="small"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Search sx={{ width: "16px", height: "16px" }} />
        </InputAdornment>
      ),
    }}
    style={{ width: "300px", fontSize: "14px" }}
    sx={{
      backgroundColor: "background.paper",
      "& .MuiInputLabel-root, & .MuiOutlinedInput-input": {
        fontSize: "14px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: 0,
      },
    }}
    onChange={onChange}
  />
);

export default SearchBar;
