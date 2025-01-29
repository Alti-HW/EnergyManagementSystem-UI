import { Button, Drawer, MenuItem, TextField } from "@mui/material"
import TuneIcon from '@mui/icons-material/Tune'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from "react"
import './Filters.scss'
import { FiltersProps, SelectedFilters } from "./types"

const Filters = ({ buildingFilters, onApllyFilters, onClearFilters, defaultFilters }: FiltersProps) => {
    const [openFilters, setOpenFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(defaultFilters)

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, filterId: string) => {
        let filtersObj = { ...selectedFilters }
        filtersObj[filterId] = event.target.value
        setSelectedFilters({ ...filtersObj })
    }
    const hanldeFiltersClear = () => {
        setDefaultFilterValues()
        if (onClearFilters)
            onClearFilters()
    }
    const handleFiltersApply = () => {
        console.log('selected Filtes', selectedFilters)
        setOpenFilters(false)
        if (onApllyFilters)
            onApllyFilters(selectedFilters)
    }

    const setDefaultFilterValues = () => {
        const toDay = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')

        setSelectedFilters({
            startDate: toDay,
            endDate: toDay,
            buildingId: buildingFilters?.[0]?.buildingId,
            floorId: null
        })
    }

    useEffect(() => {
        setSelectedFilters(defaultFilters)
    }, [defaultFilters])
    return (
        <div className='filtersWrapper'>
            <Button className='filtersBtn' onClick={() => setOpenFilters(true)}>
                Filters
                <TuneIcon className='filtersIcon' />
            </Button>
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
                onClose={() => setOpenFilters(false)}
            >
                <div className='filtersHeading'>
                    <h2>Filters</h2>
                    <CloseIcon className='filtersClose' onClick={() => setOpenFilters(false)} />
                </div>
                <div className='filtersBody'>
                    <div className='filterRow'>
                        <label>Start Date</label>
                        <TextField
                            type='date'
                            className='inputElement'
                            value={selectedFilters?.startDate}
                            onChange={(event) => handleFilterChange(event, 'startDate')}
                        />
                    </div>
                    <div className='filterRow'>
                        <label>End Date</label>
                        <TextField
                            type='date'
                            className='inputElement'
                            value={selectedFilters?.endDate}
                            onChange={(event) => handleFilterChange(event, 'endDate')}
                        />
                    </div>
                    <div className='filterRow'>
                        <label>Building</label>
                        <TextField
                            select
                            className='inputElement'
                            sx={{
                                '& .MuiSelect-select': {
                                    padding: '5px 12px',
                                    fontSize: '14px'
                                }
                            }}
                            value={selectedFilters?.buildingId}
                            onChange={(event) => handleFilterChange(event, 'buildingId')}
                        >
                            {buildingFilters?.map((option) => (
                                <MenuItem
                                    sx={{ '&.MuiMenuItem-root': { fontSize: '12px' } }}
                                    key={option.buildingId}
                                    value={option.buildingId}
                                >
                                    {option.buildingName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    {/* <div className='filterRow'>
                        <label>Floor number</label>
                        <TextField
                            select
                            className='inputElement'
                            sx={{
                                '& .MuiSelect-select': {
                                    padding: '5px 12px',
                                    fontSize: '14px'
                                }
                            }}
                            value={selectedFilters?.floorId}
                            onChange={(event) => handleFilterChange(event, 'floorId')}
                        >
                            {mockFloors?.map((option) => (
                                <MenuItem
                                    sx={{ '&.MuiMenuItem-root': { fontSize: '12px' } }}
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div> */}
                    {/* ))} */}
                </div>
                <div className='filtersFooter'>
                    <Button onClick={hanldeFiltersClear}>Clear</Button>
                    <Button onClick={handleFiltersApply}>Apply</Button>
                </div>
            </Drawer>
        </div>

    )
}

export default Filters