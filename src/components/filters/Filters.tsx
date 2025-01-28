import { Button, Drawer, MenuItem, TextField } from "@mui/material"
import TuneIcon from '@mui/icons-material/Tune'
import CloseIcon from '@mui/icons-material/Close'
import { filters } from "../../constants/mockFilters"
import { useState } from "react"
import './Filters.scss'
import { SelectedFilters } from "./types"

const Filters = () => {
    const [openFilters, setOpenFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters[]>([])
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, filterId: string) => {
        const changedFilter = { id: filterId, value: event.target.value }
        const index = selectedFilters?.findIndex(filter => filter.id === filterId)
        const filters = [...selectedFilters]
        if (index === -1) {
            filters.push(changedFilter)
        } else {
            filters.splice(index, 1, changedFilter)
        }
        setSelectedFilters([...filters])
    }
    const hanldeFiltersClear = () => {
        setSelectedFilters([])
    }
    const handleFiltersApply = () => {
        console.log('selected Filtes', selectedFilters)
        setOpenFilters(false)
    }
    const getFilterValue = (filterId: string): string => {
        return selectedFilters.find(filter => filter.id === filterId)?.value ?? ''
    }
    return (
        <>
            <div className='filtersWrapper'>
                <Button className='filtersBtn' onClick={() => setOpenFilters(true)}>Filters <TuneIcon className='filtersIcon' /> </Button>
            </div>
            <Drawer
                sx={{
                    width: '350px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '30%',
                        boxSizing: 'border-box',
                    },
                }}
                className="filtersDrawer"
                anchor="right"
                open={openFilters}
            // onClose={() => setOpenFilters(false)}
            >
                <div className='filtersHeading'>
                    <h2>Filters</h2>
                    <CloseIcon className='filtersClose' onClick={() => setOpenFilters(false)} />
                </div>
                <div className='filtersBody'>
                    {filters.map(({ filterName, filterType, data, filterId }) => (
                        <div className='filterRow' key={filterName}>
                            <label>{filterName}</label>
                            {filterType === 'date' && (
                                <TextField
                                    type='date'
                                    className='inputElement'
                                    value={getFilterValue(filterId)}
                                    onChange={(event) => handleFilterChange(event, filterId)}
                                />
                            )}
                            {filterType === 'select' &&
                                <TextField
                                    select
                                    className='inputElement'
                                    sx={{
                                        '& .MuiSelect-select': {
                                            padding: '5px 12px',
                                            fontSize: '14px'
                                        }
                                    }}
                                    value={getFilterValue(filterId)}
                                    onChange={(event) => handleFilterChange(event, filterId)}
                                >
                                    {data?.map((option) => (
                                        <MenuItem
                                            sx={{ '&.MuiMenuItem-root': { fontSize: '12px' } }}
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            }
                        </div>
                    ))}
                </div>
                <div className='filtersFooter'>
                    <Button onClick={hanldeFiltersClear}>Clear</Button>
                    <Button onClick={handleFiltersApply}>Apply</Button>
                </div>
            </Drawer>
        </>
    )
}

export default Filters