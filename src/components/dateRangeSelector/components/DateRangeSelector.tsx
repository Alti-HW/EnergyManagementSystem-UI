import { Button, IconButton, Paper, Popover } from "@mui/material"
import { ClearIcon, DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { DateFilterTypes } from "../types";
import './DateRangeSelector.scss'

const DateRangeSelector = ({ onDateRangeChange, defaultStartDate, defaultEndDate }: DateFilterTypes) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(defaultStartDate))
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(defaultEndDate))
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpenRangeSelector = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleStartDateChange = (date: Dayjs | null) => {
        setStartDate(date)
        if (date?.isAfter(endDate)) {
            setEndDate(null)
        }
    }

    const handleEndDateChange = (date: Dayjs | null) => {
        setEndDate(date)
        if (date?.isBefore(startDate)) {
            setStartDate(null)
        }
    }

    const handleApplyDates = () => {
        setAnchorEl(null)
        onDateRangeChange(startDate?.format('YYYY-MM-DD') ?? '', endDate?.format('YYYY-MM-DD') ?? '')
    }
    return (
        <>
            <Button className='dateRange' onClick={handleOpenRangeSelector}>
                Date range
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
                sx={{top: '10px'}}
            >
                <Paper sx={{
                    padding: '30px 20px',
                    display: 'flex',
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="Start date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                format="DD/MM/YYYY"
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        fontSize: '14px'
                                    },
                                    '& .MuiOutlinedInput-input ': {
                                        fontSize: '14px'
                                    }
                                }}
                            />
                            <DatePicker
                                label="End date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                format="DD/MM/YYYY"
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        fontSize: '14px'
                                    },
                                    '& .MuiOutlinedInput-input ': {
                                        fontSize: '14px'
                                    }
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Button
                        disabled={startDate === null || endDate === null}
                        className='dateRange'
                        onClick={handleApplyDates}
                    >
                        Apply
                    </Button>

                </Paper>
            </Popover>
        </>
    )
}

export default DateRangeSelector