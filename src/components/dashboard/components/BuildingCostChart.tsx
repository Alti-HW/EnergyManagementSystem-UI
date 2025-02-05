import { Card, styled } from "@mui/material"
import { PieChart, axisClasses, useDrawingArea } from "@mui/x-charts"
import { useEffect, useState } from "react";
import ChartHeading from "./ChartHeading";
import { ChartProps } from "../types";
import FullView from "./FullView";
import useAxios from "../hooks/useAxiosHook";
import { buildingsDataURL, POST_REQ_HEADERS } from "../../../constants/apis";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { normalizeBuildingCostData } from "../../../utils/normalizeDashboardAPIData";


const BuildingCostChart = ({ startDate, endDate }: ChartProps) => {
    const [openFullViewModal, setOpenFullViewModal] = useState(false)
    const [buildingsCostData, setBuildingsCostData] = useState([])
    const [totalcost, setTotalcost] = useState(0)
    const {
        data: buildingsRawData,
        loading: isBuildingsDataLoading,
        error: buildingsDataError,
        fetchData: fetchBuildingsData
    } = useAxios(buildingsDataURL, 'POST', null, POST_REQ_HEADERS, false)

    useEffect(() => {
        fetchBuildingsData({ startDate, endDate })
    }, [startDate, endDate])

    useEffect(() => {
        const { dataset, totalcost: cost } = normalizeBuildingCostData(buildingsRawData?.data)
        setBuildingsCostData(dataset)
        setTotalcost(cost)
    }, [buildingsRawData])

    const handleChartFullView = () => {
        setOpenFullViewModal(true)
    }

    const closeChartFullView = () => {
        setOpenFullViewModal(false)
    }
    const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));

    function PieCenterLabel({ children }: { children: React.ReactNode }) {
        const { width, height, left, top } = useDrawingArea();
        return (
            <StyledText sx={{ fontSize: '12px' }} x={left + width / 2} y={top + height / 2}>
                {children}
            </StyledText>
        );
    }
    const renderChart = (fullscreen?: boolean) => (
        <>
            {isBuildingsDataLoading ?
                <Spinner /> :
                buildingsDataError ?
                    <ErrorMessage /> :
                    <PieChart
                        series={[{ data: buildingsCostData, innerRadius: fullscreen ? 220 : 70 }]}
                        dataset={buildingsCostData}
                        xAxis={[{
                            scaleType: 'band',
                            dataKey: 'buildingName',
                            tickLabelPlacement: 'middle',
                            tickLabelStyle: {
                                fontSize: '8px'
                            },
                            valueFormatter: ((name) => {
                                return name.split(' ').join('\n')
                            }),
                            label: 'Building name',
                            labelStyle: { fontSize: '10px', fontWeight: '700' }
                        }]}
                        height={fullscreen ? 600 : 250}
                        sx={{
                            [`.${axisClasses.left} .${axisClasses.label}`]: {
                                transform: 'translate(-10px, 0)',
                            },
                            [`.MuiChartsAxis-label`]: {
                                transform: 'translateY(5px)',
                            },
                        }}
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
                    >
                        {buildingsCostData?.length > 0 && <PieCenterLabel >Total: {Math.round(totalcost)}</PieCenterLabel>}
                    </PieChart>
            }
        </>
    )

    return (
        <Card className='buildingEnergy'>
            <ChartHeading title="Energy cost breakdown by Building" onExpandIconClick={handleChartFullView} />
            {renderChart()}
            {openFullViewModal &&
                <FullView open={openFullViewModal} onClose={closeChartFullView}>
                    {renderChart(true)}
                </FullView>
            }
        </Card>
    )
}

export default BuildingCostChart