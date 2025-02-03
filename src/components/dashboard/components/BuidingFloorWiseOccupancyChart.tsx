import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LineChart, axisClasses } from "@mui/x-charts"
import ChartHeading from "./ChartHeading";
import { useEffect, useMemo, useState } from "react";
import { getBuildingsAndFloorsNames, getEnergyConsumptionData, getOccupancyData } from "../../../utils/dashboardAPIs";
import { ChartProps } from "../types";
import { normalizeBuildingFloorwiseData } from "../../../utils/normalizeBuildingsData";
import FullView from "./FullView";
import { normalizeBuildingOccupancy } from "../../../utils/normalizeBuildingOccupancy";

const BuidingFloorWiseOccupancyChart = ({ startDate, endDate }: ChartProps) => {
    const [openFullViewModal, setOpenFullViewModal] = useState(false)
    const [buildingsAndFloorsNames, setBuildingsAndFloorsNames] = useState<any>([])
    const [buildingId, setBuildingId] = useState('')
    const [floorId, setFloorId] = useState('')
    const [buildingFloorwiseData, setBuildingFloorwiseData] = useState([])

    const unitsFormatter = (num: number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            notation: 'compact',  // Use compact notation (e.g., 1K, 1M, 1B, 1T)
            compactDisplay: 'short',  // Use the short version (e.g., 1K instead of 1 thousand)
        })
        return formatter.format(num);
    }
    const handleChartFullView = () => {
        setOpenFullViewModal(true)
    }
    const closeChartFullView = () => {
        setOpenFullViewModal(false)
    }
    const handleBuidlingIdChange = (event: any) => {
        console.log(event)
        setBuildingId(event.target.value)
        setFloorId('')
    }
    const handleFloorIdChange = (event: any) => {
        console.log(event)
        setFloorId(event.target.value)
    }
    const renderChart = () => (<LineChart
        xAxis={[{
            dataKey: 'floorNumber',
            tickLabelStyle: {
                fontSize: '8px'
            },
            label: 'Floor Number',
            labelStyle: { fontSize: '10px', fontWeight: '700' },
            scaleType: 'point'
        }]}
        series={[
            {
                dataKey: 'metricValue',
                label: 'Avg(Occupancy)',
                area: true
            },

        ]}

        yAxis={[{
            label: 'Average (occupancy)',
            labelStyle: { fontSize: '10px', fontWeight: '700' },
            valueFormatter: unitsFormatter
        }]}
        dataset={buildingFloorwiseData}
        height={250}
        sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-10px, 0)',
            },
            [`.MuiChartsAxis-label`]: {
                transform: 'translateY(5px)',
            },
        }}
        grid={{ horizontal: true }}
        slotProps={{
            legend: {
                position: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                itemMarkWidth: 10,
                itemMarkHeight: 10,
                labelStyle: {
                    fontSize: '8px'
                }
            },
        }}
        colors={['#59E2C2']}
    />)

    useEffect(() => {
        const fetchBuildingsAndFloorsNames = async () => {
            const response = await getBuildingsAndFloorsNames()
            setBuildingsAndFloorsNames(response.data)
            setBuildingId(response?.data?.[0].buildingId)
            // setFloorId(response?.data?.[0]?.floors?.[0]?.floorId)
        }
        fetchBuildingsAndFloorsNames()
    }, [])

    useEffect(() => {
        if (buildingId !== '') {
            getOccupancyData({
                startDate,
                endDate,
                buildingId,
                metricType: "peroccupancy",
                // ...floorId !== '' && { floorId },
            }).then(floorwiseBuildingData => {
                setBuildingFloorwiseData(
                    normalizeBuildingOccupancy(floorwiseBuildingData?.data)
                )
            })
        }
    }, [buildingId, floorId, startDate, endDate])

    const floorList = useMemo(() => buildingsAndFloorsNames.find((building: any) => building.buildingId === buildingId)?.floors, [buildingId, buildingsAndFloorsNames])
    const selectedBuildingName = useMemo(() => {
        let building = buildingsAndFloorsNames.find((building: any) => building.buildingId === buildingId)?.name
        let floor = floorList?.find((floor: any) => floor.floorId === floorId)?.floorNumber
        return (`${building ? 'of building ' + building : ''} `)
    }, [buildingId, floorId])

    console.log(buildingFloorwiseData)
    const FilterComponent = () => {
        return (
            <div style={{ padding: '10px' }}>
                <FormControl fullWidth>
                    <InputLabel sx={{ fontSize: '12px' }} id="building-id-label">Building</InputLabel>
                    <Select
                        labelId="building-id-label"
                        id="building-id"
                        value={buildingId}
                        label="Building"
                        onChange={handleBuidlingIdChange}
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
                        {buildingsAndFloorsNames.map((building: any) => (
                            <MenuItem sx={{ fontSize: '12px' }} key={building.buildingId} value={building.buildingId}>{building.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel sx={{ fontSize: '12px' }} id="floor-id-label">Floor</InputLabel>
                    <Select
                        labelId="floor-id-label"
                        id="floor-id"
                        value={floorId}
                        label="Floor"
                        onChange={handleFloorIdChange}
                        sx={{ minWidth: '150px', fontSize: '12px' }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 200,
                                    overflowY: 'auto',
                                },
                            },
                        }}
                    >
                        {floorList.map((floor: any) => (
                            <MenuItem sx={{ fontSize: '12px' }} key={floor.floorId} value={floor.floorId}>{floor.floorNumber}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        )
    }
    return (
        <Card className='buildingEnergy'>
            <ChartHeading
                title={`Occupancy ${selectedBuildingName}`}
                onExpandIconClick={handleChartFullView}
                FilterComponent={FilterComponent}

            />
            {renderChart()}

            <FullView open={openFullViewModal} onClose={closeChartFullView}>
                {renderChart()}
            </FullView>
        </Card>
    )
}

export default BuidingFloorWiseOccupancyChart