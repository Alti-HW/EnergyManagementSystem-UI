import {  Card, styled } from "@mui/material"
import {PieChart, axisClasses, useDrawingArea } from "@mui/x-charts"
import { useEffect, useState } from "react";
import ChartHeading from "./ChartHeading";
import { ChartProps } from "../types";
import { getEnergyConsumptionData } from "../../../utils/dashboardAPIs";
// import { normalizeBuildingsData } from "../../../utils/normalizeBuildingsData";
import { normalizeBuildingCostData } from "../../../utils/normalizeBuildingCostData";
import FullView from "./FullView";


const BuildingCostChart = ({ startDate, endDate }: ChartProps) => {
    const [openFullViewModal, setOpenFullViewModal] = useState(false)
    const [buildingsData, setBuildingsData] = useState([])
    const [totalcost, setTotalcost] = useState(0)


    useEffect(() => {
        const fetData = async () => {
            const response = await getEnergyConsumptionData({ startDate, endDate })
            const { dataset, totalcost: cost } = normalizeBuildingCostData(response.data)
            setBuildingsData(dataset)
            setTotalcost(cost)

        }
        fetData()
    }, [startDate, endDate])

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
    const renderChart = () => (

        <PieChart
            series={[{ data: buildingsData, innerRadius: 70 }]}
            dataset={buildingsData}
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
            height={250}
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
            {buildingsData?.length > 0 && <PieCenterLabel >Total: {Math.round(totalcost)}</PieCenterLabel>}
        </PieChart>
    )

    return (
        <Card className='buildingEnergy'>
            <ChartHeading title="Energy cost breakdown by Building" onExpandIconClick={handleChartFullView} />
            {renderChart()}
            {openFullViewModal &&
                <FullView open={openFullViewModal} onClose={closeChartFullView}>
                    {renderChart()}
                </FullView>
            }
        </Card>
    )
}

export default BuildingCostChart