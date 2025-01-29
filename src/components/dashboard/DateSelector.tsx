import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DateRangeSelector = () => {
  const [selectedRange, setSelectedRange] = useState<any>([null, null]);

  const handleDateChange = (newValue:any) => {
    setSelectedRange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h6">Select Date Range</Typography>
        <DatePicker
          value={selectedRange}
          onChange={handleDateChange}
          
        />
        {selectedRange[0] && selectedRange[1] && (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Selected range: {selectedRange[0].toLocaleDateString()} - {selectedRange[1].toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeSelector;
