import { Divider } from "@mui/material"
import { BarChart, axisClasses } from "@mui/x-charts"


const BuildingEnergyChart = ({ buildingsData }: {buildingsData:any}) => {
    const unitsFormatter = (num: number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            notation: 'compact',  // Use compact notation (e.g., 1K, 1M, 1B, 1T)
            compactDisplay: 'short',  // Use the short version (e.g., 1K instead of 1 thousand)
        })
        return formatter.format(num);
    }
    return (
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
            onAxisClick={(event, data) => console.log(data)}
        />
    )
}

export default BuildingEnergyChart