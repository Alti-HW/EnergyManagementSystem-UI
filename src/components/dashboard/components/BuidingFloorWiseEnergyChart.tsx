import { LineChart, axisClasses } from "@mui/x-charts"

const BuildingFloorWiseEnergyChart = ({ buildingFloorwiseData }: { buildingFloorwiseData: any }) => {
    const unitsFormatter = (num: number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            notation: 'compact',  // Use compact notation (e.g., 1K, 1M, 1B, 1T)
            compactDisplay: 'short',  // Use the short version (e.g., 1K instead of 1 thousand)
        })
        return formatter.format(num);
    }
    return (
        <LineChart
            xAxis={[{
                dataKey: 'floorNumber',
                tickLabelStyle: {
                    fontSize: '8px'
                },

                label: 'Floor Number',
                labelStyle: { fontSize: '10px', fontWeight: '700' }

            }]}
            series={[
                {
                    dataKey: 'energyConsumedKwh',
                    label: 'SUM (units consumed)',
                },
            ]}

            yAxis={[{
                label: 'Units consumed',
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
        />
    )
}

export default BuildingFloorWiseEnergyChart