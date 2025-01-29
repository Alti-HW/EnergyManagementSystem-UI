import './Dashboard.scss'
import { Card } from '@mui/material';
import Filters from '../filters/Filters';
import { useEffect, useState } from 'react';
import { normalizeBuildingFloorwiseData, normalizeBuildingsData } from '../../utils/normalizeBuildingsData';
import { mockBuildingFloorwiseData, mockBuildingsData } from '../../utils/mockBuildingData';
import BuildingEnergyChart from './components/BuildingEnergyChart';
import BuildingFloorWiseEnergyChart from './components/BuidingFloorWiseEnergyChart';

const Dashboard = () => {

  const [buildingsData, setBuildingsData] = useState([])
  const [buildingFloorwiseData, setBuildingFloorwiseData] = useState([])

  useEffect(() => {
    setBuildingsData(normalizeBuildingsData(mockBuildingsData.data))
    setBuildingFloorwiseData(normalizeBuildingFloorwiseData(mockBuildingFloorwiseData.data))
  }, [])

  return (
    <section className='dashboardContainer'>
      <Filters />
      <div className='chartsWrapper'>
        <Card className='buildingEnergy'>
          <h2 className='heading'>Daily Energy use across Campus</h2>
          {buildingsData.length > 0 &&
            <BuildingEnergyChart buildingsData={buildingsData} />
          }
        </Card>
        <Card className='buildingEnergy'>
          <h2 className='heading'>Floor-Wise Energy consumption</h2>
          {buildingFloorwiseData.length > 0 &&
            <BuildingFloorWiseEnergyChart buildingFloorwiseData={buildingFloorwiseData} />
          }
        </Card>
      </div>
    </section>
  )
}

export default Dashboard