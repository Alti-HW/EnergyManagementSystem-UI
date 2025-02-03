import './Dashboard.scss'
import { useState } from 'react';
import BuildingEnergyChart from './components/BuildingEnergyChart';
import BuildingFloorWiseEnergyChart from './components/BuidingFloorWiseEnergyChart';
import DateRangeSelector from '../dateRangeSelector/DateRangeSelector';
import TripleToggleButton from '../TrippleToggleButton/TrippleToggleButton';
import { format } from 'date-fns';
import BuildingCostChart from './components/BuildingCostChart';
import Alerms from './components/Alerms';
import DateFilters from './components/DateFilters';
import BuidingFloorWiseOccupancyChart from './components/BuidingFloorWiseOccupancyChart';

const dateFormat = 'yyyy-MM-dd'
const today = new Date('2025-01-01')
const defaultEndDate = format(today, dateFormat)
const defaultStartDate = format(today.setDate(today.getDate() - 1), dateFormat)

const quickTimeFilters = [
  { label: 'Today', value: 'today' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
]

const Dashboard = () => {
  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)

  const handleToggleButtonChange = (active: string) => {
    let start = new Date(defaultEndDate)
    if (active === 'today') {
      start.setDate(start.getDate() - 1)
    }
    if (active === 'month') {
      start.setMonth(start.getMonth() - 1)
    }
    if (active === 'year') {
      start.setFullYear(start.getFullYear() - 1)
    }
    setStartDate(format(start, dateFormat))
    setEndDate(defaultEndDate)
  }
  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <section className='dashboardContainer'>
      <h1 className='dashboardTitle'>Energy Dashboard</h1>
      <TripleToggleButton onChange={handleToggleButtonChange} options={quickTimeFilters} btnWidth='70px' />
      <DateRangeSelector
        onDateRangeChange={handleDateRangeChange}
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
      />
      <DateFilters />

      <div className='chartsWrapper'>
        <BuildingEnergyChart startDate={startDate} endDate={endDate} />
        <BuildingCostChart startDate={startDate} endDate={endDate} />
        <BuildingFloorWiseEnergyChart startDate={startDate} endDate={endDate} />
        {/* <BuidingFloorWiseOccupancyChart startDate={startDate} endDate={endDate} /> */}
        <Alerms />

      </div>
    </section>
  )
}

export default Dashboard