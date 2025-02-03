import './Dashboard.scss'
import { Card } from '@mui/material';
import Filters from '../filters/Filters';
import { useEffect, useMemo, useState } from 'react';
import { normalizeBuildingFloorwiseData, normalizeBuildingsData } from '../../utils/normalizeBuildingsData';
import BuildingEnergyChart from './components/BuildingEnergyChart';
import BuildingFloorWiseEnergyChart from './components/BuidingFloorWiseEnergyChart';
import { normalizeFiltersData } from '../../utils/normalizeFiltersData';
import { BuildingFilters, SelectedFilters } from '../filters/types';
import { styled } from "@mui/material/styles";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { getEnergyConsumptionData } from '../../utils/dashboardAPIs';

const today = new Date()
const endDate = new Date(today).toLocaleDateString('en-GB').split('/').reverse().join('-')
today.setDate(today.getDate() - 1)
const startDate = new Date(today).toLocaleDateString('en-GB').split('/').reverse().join('-')


const Dashboard = () => {

  const [buildingsData, setBuildingsData] = useState([])
  const [buildingFloorwiseData, setBuildingFloorwiseData] = useState([])
  const [buildingFilters, setBuildingFilters] = useState<BuildingFilters[]>([])
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({})

  const setDefaultFilterValues = () => {
    setSelectedFilters({
      startDate,
      endDate,
      buildingId: buildingFilters?.[0]?.buildingId,
      floorId: null
    })
  }

  useEffect(() => {
    setDefaultFilterValues()
    getEnergyConsumptionData({
      startDate,
      endDate
    }).then(response => {
      setBuildingsData(
        normalizeBuildingsData(response.data)
      )
      const filtersData = normalizeFiltersData(response?.data)
      setBuildingFilters(filtersData)
      setSelectedFilters((presetFilters) => ({
        ...presetFilters,
        buildingId: filtersData?.[0].buildingId
      }))
      // Buildind Data floor wise by sending Building ID
      getEnergyConsumptionData({
        startDate,
        endDate,
        buildingId: filtersData?.[0].buildingId
      }).then(floorwiseBuildingData => {
        setBuildingFloorwiseData(
          normalizeBuildingFloorwiseData(floorwiseBuildingData?.data?.[0])
        )
      })
    })
  }, [])

  const handleFiltersChange = (filters: SelectedFilters) => {
    setSelectedFilters(filters)
    if (selectedFilters.startDate !== filters.startDate ||
      selectedFilters.endDate !== filters.endDate) {
      getEnergyConsumptionData({
        startDate: filters.startDate,
        endDate: filters.endDate
      }).then(response => {
        setBuildingsData(normalizeBuildingsData(response.data))
      })
    }
    // Buildind Data floor wise by sending Building ID
    getEnergyConsumptionData({
      startDate: filters.startDate,
      endDate: filters.endDate,
      buildingId: filters.buildingId
    }).then((floorwiseBuildingData) => {
      setBuildingFloorwiseData(
        normalizeBuildingFloorwiseData(floorwiseBuildingData?.data?.[0])
      )
    })
  }

  const handleClearFilters = () => {
    setDefaultFilterValues()
    getEnergyConsumptionData({
      startDate,
      endDate,
    }).then(response => {
      setBuildingsData(normalizeBuildingsData(response.data))
    })
    // Buildind Data floor wise by sending Building ID
    getEnergyConsumptionData({
      startDate,
      endDate,
      buildingId: buildingFilters?.[0].buildingId
    }).then((floorwiseBuildingData) => {
      setBuildingFloorwiseData(
        normalizeBuildingFloorwiseData(floorwiseBuildingData?.data?.[0])
      )
    })
  }

  const getBuildingName = useMemo(() => {
    return buildingFilters.find(building => building.buildingId === selectedFilters?.buildingId)?.buildingName
  }, [selectedFilters.buildingId, buildingFilters])


  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
  }));

  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  const data = [
    { value: 100, label: "Buildin 1" },
    { value: 200, label: "Buildin 2" },
    { value: 120, label: "Buildin 3" },
    { value: 80, label: "Buildin 4" },
  ];

  const size = {
    width: 400,
    height: 200,
  };
  console.log(selectedFilters)
  return (
    <section className='dashboardContainer'>
      <Filters defaultFilters={selectedFilters} onClearFilters={handleClearFilters} buildingFilters={buildingFilters} onApllyFilters={handleFiltersChange} />
      <div className='chartsWrapper'>
        <Card className='buildingEnergy'>
          <h2 className='heading'>Daily Energy use across Campus</h2>
          {buildingsData.length > 0 &&
            <BuildingEnergyChart buildingsData={buildingsData} />
          }
        </Card>
        <Card className='buildingEnergy'>
          <h2 className='heading'>Floor-Wise Energy consumption {getBuildingName} </h2>
          {buildingFloorwiseData.length > 0 &&
            <BuildingFloorWiseEnergyChart buildingFloorwiseData={buildingFloorwiseData} />
          }
        </Card>

        <Card className="buildingEnergy">
          <h2 className="heading">Energy Cost Breakdown by Building</h2>
          <PieChart series={[{ data, innerRadius: 70 }]} {...size}>
            <PieCenterLabel>Total: {"$500"}</PieCenterLabel>
          </PieChart>
        </Card>

      </div>
    </section>
  )
}

export default Dashboard