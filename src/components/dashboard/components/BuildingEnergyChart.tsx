import { Card, Divider } from "@mui/material"
import { BarChart, axisClasses } from "@mui/x-charts"
import { MouseEvent, useEffect, useState } from "react";
import ChartHeading from "./ChartHeading";
import { ChartProps } from "../types";
import { getEnergyConsumptionData } from "../../../utils/dashboardAPIs";
import { normalizeBuildingDrilldownData, normalizeBuildingsData } from "../../../utils/normalizeBuildingsData";
import FullView from "./FullView";
import CustomContextMenu from "../CustomContextMenu";
import CustomDialog from "../CustomDialog";
import { useBarChartClick } from "../hooks/useBarChartClick";


const BuildingEnergyChart = ({ startDate, endDate }: ChartProps) => {
    const [openFullViewModal, setOpenFullViewModal] = useState(false)
    // const [buildingId, setBuildingId] = useState('')
    const [buildingsData, setBuildingsData] = useState([])
    const { selectedLabel, menuPosition, handleBarClick, handleClose, buildingId } =
        useBarChartClick(buildingsData);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [buildingDrillDownData, setBuildingDrillDownData] = useState([])


    useEffect(() => {
        const fetData = async () => {
            const response = await getEnergyConsumptionData({ startDate, endDate })
            setBuildingsData(
                normalizeBuildingsData(response.data)
            )
        }
        fetData()
    }, [startDate, endDate])

    useEffect(() => {
        const fetData = async () => {
            const response = await getEnergyConsumptionData({ startDate, endDate, buildingId })
            let data = normalizeBuildingDrilldownData(response.data[0])
            setBuildingDrillDownData(data)
        }
        fetData()
    }, [buildingId])

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
    const handleShowDetails = () => {
        setDialogOpen(true);
        handleClose()
    }
    const menuItems = [
        { label: selectedLabel || "No Label", onClick: () => { }, disabled: true },
        { label: `Drill by details ${selectedLabel}`, onClick: handleShowDetails },
    ];

    const renderChart = () => (
        <>
            <BarChart
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
                dataset={buildingsData}
                yAxis={[{
                    label: 'Units consumed',
                    labelStyle: { fontSize: '10px', fontWeight: '700' },
                    valueFormatter: unitsFormatter
                }]}
                series={[{ dataKey: 'totalEnergyConsumedKwh', label: 'SUM (units consumed)' }]}

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
                slots={{
                    axisContent: ({ axisValue, series, dataIndex }) => (
                        <div className='buildingChartTooltip'>
                            <span className='tooltipHeading'>{axisValue?.toString()}</span>
                            <Divider />
                            <span className='tooltipData'>
                                <span className='tooltipColor' style={{ backgroundColor: series?.[0]?.color }} />
                                {dataIndex !== null && dataIndex !== undefined && `${series?.[0]?.data?.[dataIndex]} `}
                            </span>
                        </div>

                    )
                }}
                onItemClick={(event, item) =>
                    handleBarClick(event as MouseEvent, item)
                }
                colors={['#59E2C2']}
            />
            <CustomContextMenu
                menuPosition={menuPosition}
                onClose={handleClose}
                menuItems={menuItems}
            />

            <CustomDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                title={`Details for ${selectedLabel}`}
                label={selectedLabel}
                data={buildingDrillDownData}
            />
        </>
    )

    return (
        <Card className='buildingEnergy'>
            <ChartHeading title="Daily Energy usage" onExpandIconClick={handleChartFullView} />
            {renderChart()}
            <FullView open={openFullViewModal} onClose={closeChartFullView}>
                {renderChart()}
            </FullView>
        </Card>
    )
}

export default BuildingEnergyChart