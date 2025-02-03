import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Popover, Select } from "@mui/material"
import { ClearIcon, DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import TripleToggleButton from "../../TrippleToggleButton/TrippleToggleButton"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { useState } from "react"
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Last = () => {
    const options = [
        { label: '1 Second', value: '1sec' },
        { label: '5 Seconds', value: '5sec' },
        { label: '10 Seconds', value: '10sec' },
        { label: '30 Seconds', value: '30sec' },
        { label: '1 Minute', value: '1min' },
        { label: '5 Minutes', value: '5min' },
        { label: '10 Minutes', value: '10min' },
        { label: '30 Minutes', value: '30min' },
        { label: '1 Hour', value: '1hr' },
        { label: '5 Hours', value: '5hr' },
        { label: '12 Hours', value: '12hr' },
        { label: '1 Day', value: '1day' },
        { label: '7 Days', value: '7day' },
        { label: '30 Days', value: '30day' },
    ]
    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ fontSize: '12px' }} id="last-label">Last</InputLabel>
            <Select
                labelId="last-label"
                id="last"
                label="Age"
                value={''}
                sx={{ minWidth: '150px', mb: '20px', fontSize: '12px' }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            overflowY: 'auto',
                        },
                    },
                }}
            >
                {options.map(({ label, value }) => (
                    <MenuItem sx={{ fontSize: '12px' }} key={value} value={value}>{label}</MenuItem>
                ))}
            </Select >
        </FormControl>
    )
}
const Relative = () => {
    const options = [
        { label: '1 Second', value: '1sec' },
        { label: '5 Seconds', value: '5sec' },
        { label: '10 Seconds', value: '10sec' },
        { label: '30 Seconds', value: '30sec' },
        { label: '1 Minute', value: '1min' },
        { label: '5 Minutes', value: '5min' },
        { label: '10 Minutes', value: '10min' },
        { label: '30 Minutes', value: '30min' },
        { label: '1 Hour', value: '1hr' },
        { label: '5 Hours', value: '5hr' },
        { label: '12 Hours', value: '12hr' },
        { label: '1 Day', value: '1day' },
        { label: '7 Days', value: '7day' },
        { label: '30 Days', value: '30day' },
    ]
    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ fontSize: '12px' }} id="relative-label">Relative</InputLabel>
            <Select
                labelId="relative-label"
                id="relative"
                label="Age"
                value={''}
                sx={{ minWidth: '150px', mb: '20px', fontSize: '12px' }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            overflowY: 'auto',
                        },
                    },
                }}
            >
                {options.map(({ label, value }) => (
                    <MenuItem sx={{ fontSize: '12px' }} key={value} value={value}>{label}</MenuItem>
                ))}
            </Select >
        </FormControl>
    )
}

const DateRange = () => {

    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
                label="Start date"
                // value={startDate}
                // onChange={handleStartDateChange}
                format="DD/MM/YYYY"
                sx={{
                    '& .MuiInputLabel-root': {
                        fontSize: '12px'
                    },
                    '& .MuiOutlinedInput-input ': {
                        fontSize: '12px'
                    }
                }}
            />
            <DatePicker
                label="End date"
                // value={endDate}
                // onChange={handleEndDateChange}
                format="DD/MM/YYYY"
                sx={{
                    '& .MuiInputLabel-root': {
                        fontSize: '12px'
                    },
                    '& .MuiOutlinedInput-input ': {
                        fontSize: '12px'
                    }
                }}
            />
        </DemoContainer>
    </LocalizationProvider>
    )
}
const DateFilters = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [timeFilterValue, setTimeFilterValue] = useState('relative')
    const [activeView, setActiveView] = useState('last')

    const handleTimeFilters = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    }


    const handleViewChange = (filter: string) => {
        setActiveView(filter)
    }
    const handleTimefilterChange = (filter: string) => {
        setTimeFilterValue(filter)
    }
    const timeFilters = [
        { label: 'Relative', value: 'relative' },
        { label: 'History', value: 'history' }
    ]

    const relativeTimefilters = [
        { label: 'Last', value: 'last' },
        { label: 'Relative', value: 'relative' }
    ]

    const historyTimefilters = [
        { label: 'Last', value: 'last' },
        { label: 'Relative', value: 'relative' },
        { label: 'Range', value: 'range' }
    ]
    return (
        <>
            <Button className='dateRange' onClick={handleTimeFilters}>
        Filters
        <AccessTimeIcon sx={{ ml: 1 }} />
      </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Paper sx={{
                padding: '30px 20px',
                alignItems: 'center'
            }}>
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="close date range selector"
                    sx={{ mr: 2 }}
                    onClick={handleClose}
                    className="closeDrawer"
                >
                    <ClearIcon />
                </IconButton>
                <TripleToggleButton onChange={handleTimefilterChange} options={timeFilters} btnWidth={'200px'} />
                <Box sx={{ border: 1, p: 2, mt: 2 }}>
                    <TripleToggleButton onChange={handleViewChange} variant='default' options={timeFilterValue === 'relative' ? relativeTimefilters : historyTimefilters} />
                    {activeView === 'last' && <Last />}
                    {activeView === 'relative' && <Relative />}
                    {activeView === 'range' && <DateRange />}
                </Box>
            </Paper>
        </Popover>
        </>
    )
}

export default DateFilters