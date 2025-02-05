import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LineChart, axisClasses } from "@mui/x-charts"
import ChartHeading from "./ChartHeading";
import { useEffect, useMemo, useState } from "react";
import { ChartProps } from "../types";
import FullView from "./FullView";
import { buildingsDataURL, POST_REQ_HEADERS } from "../../../constants/apis";
import useAxios from "../hooks/useAxiosHook";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { normalizeBuildingFloorwiseData } from "../../../utils/normalizeDashboardAPIData";

const BuildingFloorWiseEnergyChart = ({ startDate, endDate, buildingsAndFloorsNames = [] }: ChartProps) => {
    const [openFullViewModal, setOpenFullViewModal] = useState(false)
    const [buildingId, setBuildingId] = useState('')
    const [floorId, setFloorId] = useState('')
    const [buildingFloorwiseData, setBuildingFloorwiseData] = useState([])

    const {
        data: buildingsFloorwiseRawData,
        loading: isBuildingsFloorwiseDataLoading,
        error: buildingsFloorwiseDataError,
        fetchData: fetchBuildingFloorwiseData
    } = useAxios(buildingsDataURL, 'POST', null, POST_REQ_HEADERS, false)

    const unitsFormatter = (num: number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            notation: 'compact',  // Use compact notation (e.g., 1K, 1M, 1B, 1T)
            compactDisplay: 'short',  // Use the short version (e.g., 1K instead of 1 thousand)
        })
        return formatter.format(num);
    }

    useEffect(() => {
        setBuildingId(buildingsAndFloorsNames?.[0]?.buildingId ?? '')
    }, [buildingsAndFloorsNames])

    useEffect(() => {
        if (buildingId !== '') {
            fetchBuildingFloorwiseData({
                startDate,
                endDate,
                buildingId,
                ...floorId !== '' && { floorId },
            })
        }
    }, [buildingId, floorId, startDate, endDate])

    useEffect(() => {
        setBuildingFloorwiseData(
            normalizeBuildingFloorwiseData(buildingsFloorwiseRawData?.data?.[0], floorId !== '')
        )
    }, [buildingsFloorwiseRawData])

    const handleChartFullView = () => {
        setOpenFullViewModal(true)
    }
    const closeChartFullView = () => {
        setOpenFullViewModal(false)
    }
    const handleBuidlingIdChange = (event: any) => {
        setBuildingId(event.target.value)
        setFloorId('')
    }
    const handleFloorIdChange = (event: any) => {
        setFloorId(event.target.value)
    }

    const floorList = useMemo(() => {
        return buildingsAndFloorsNames?.find((building: any) => building.buildingId === buildingId)?.floors
    }, [buildingId, buildingsAndFloorsNames])

    const selectedBuildingName = useMemo(() => {
        let building = buildingsAndFloorsNames?.find((building: any) => building.buildingId === buildingId)?.name
        let floor = floorList?.find((floor: any) => floor.floorId === floorId)?.floorNumber
        return (`${floor ? 'for floor ' + floor : ''}${building ? ' of ' + building : ''}`)
    }, [buildingId, floorId])

    const renderChart = (fullscreen?: boolean) => (
        <>
            {isBuildingsFloorwiseDataLoading ?
                <Spinner /> :
                buildingsFloorwiseDataError ?
                    <ErrorMessage /> :
                    <LineChart
                        xAxis={[{
                            dataKey: 'x',
                            tickLabelStyle: {
                                fontSize: '8px'
                            },
                            label: floorId !== '' ? 'Date & Time' : 'Floor number',
                            labelStyle: { fontSize: '10px', fontWeight: '700' },
                            scaleType: 'point'
                        }]}
                        series={[{
                            dataKey: 'y',
                            label: 'SUM (units consumed)',
                            area: true
                        }]}
                        yAxis={[{
                            label: 'Units consumed',
                            labelStyle: { fontSize: '10px', fontWeight: '700' },
                            valueFormatter: unitsFormatter
                        }]}
                        dataset={buildingFloorwiseData}
                        height={fullscreen ? 600 : 250}
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
                    />
            }
        </>
    )

    console.log(buildingId, "buildingId")
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
                        {buildingsAndFloorsNames?.map((building: any) => (
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
                title={`Floor-Wise Energy consumption ${selectedBuildingName}`}
                onExpandIconClick={handleChartFullView}
                FilterComponent={FilterComponent}

            />
            {renderChart()}

            <FullView open={openFullViewModal} onClose={closeChartFullView}>
                {renderChart(true)}
            </FullView>
        </Card>
    )
}

export default BuildingFloorWiseEnergyChart