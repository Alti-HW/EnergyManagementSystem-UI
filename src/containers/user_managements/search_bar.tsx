import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar: React.FC = () => (
  <TextField
    label="Search"
    variant="outlined"
    size="small"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
    }}
    style={{ width: '300px' }}
  />
);

export default SearchBar;
