import { Box, TextField } from '@mui/material';


const DateTimeFields = (props: any) => {
    const {
        customTime,
        onChange
    } = props


    const handleChange = (field: any, value: string) => {
        onChange(field, value)
    };

    return (
        <Box display="flex" justifyContent="space-between" sx={{ width: '100%', maxWidth: '400px' }}>
            <TextField
                id="day-field"
                label="Days"
                variant="outlined"
                type="number"
                inputProps={{
                    min: 0,
                    style: { textAlign: "center" },
                }}
                value={customTime.day}
                onChange={(e) => handleChange('day', e.target.value)}
                sx={{ width: "20%" }}
            />
            <TextField
                id="hour-field"
                label="Hours"
                variant="outlined"
                type="number"
                inputProps={{
                    min: 0,
                    max: 23,
                    style: { textAlign: "center" },
                }}
                value={customTime.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
                sx={{ width: "20%" }}
            />
            <TextField
                id="minute-field"
                label="Minutes"
                variant="outlined"
                type="number"
                inputProps={{
                    min: 0,
                    max: 59,
                    style: { textAlign: "center" },
                }}
                value={customTime.minutes}
                onChange={(e) => handleChange('minutes', e.target.value)}
                sx={{ width: "20%" }}
            />
            <TextField
                id="second-field"
                label="Seconds"
                variant="outlined"
                type="number"
                inputProps={{
                    min: 0,
                    max: 59,
                    style: { textAlign: "center" },
                }}
                value={customTime.seconds}
                onChange={(e) => handleChange('seconds', e.target.value)}
                sx={{ width: "20%" }}
            />
        </Box>

    );
};

export default DateTimeFields;
