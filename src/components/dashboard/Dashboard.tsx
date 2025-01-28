import { axisClasses, BarChart, LineChart, PieChart } from '@mui/x-charts';
import './Dashboard.scss'
import { Card, Tooltip } from '@mui/material';
import Filters from '../filters/Filters';
// const buildingsData = [
//   { name: 'CNTC Presidential Tower', units: '100' },
//   { name: 'Mantri DSK Pinnacle', units: '153' },
//   { name: 'Brigade Exotica 1', units: '50' },
//   { name: 'SNN Clermont 2', units: '200' },
//   { name: 'Pashmina Waterfront Tower 1', units: '70' },
// ]

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   'Page A',
//   'Page B',
//   'Page C',
//   'Page D',
//   'Page E',
//   'Page F',
//   'Page G',
// ];

const Dashboard = () => {


  // function valueFormatter(value: number | null) {
  //   return `${value}mm`;
  // }
  return (
    <section className='dashboardContainer'>
      <Filters />
      <div className='chartsWrapper'>
        charts will come here
        </div>
        {/* <Card className='buildingEnergy'>
          <h2 className='heading'>Daily Energy use across Campus</h2>
          <BarChart
            xAxis={[{
              scaleType: 'band',
              dataKey: 'name',
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
            }]}
            series={[{ dataKey: 'units', label: 'No of units consumed', valueFormatter }]}
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
              axisContent: () => (<Tooltip title="Delete">
                <span> i am cstom tooltip</span>
              </Tooltip>)
            }}
            tooltip={{ trigger: 'axis' }}
          />
        </Card>
        <Card className='buildingEnergy'>
          <h2 className='heading'>Daily Energy use across Campus</h2>
          <LineChart
            height={250}
            series={[
              { data: pData, label: 'pv' },
              { data: uData, label: 'uv' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
          />
        </Card>

      </div>


      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: true,
          },
        ]}
        // width={800}
        height={300}
      />
      <PieChart
        series={[
          {
            innerRadius: 40,
            outerRadius: 80,
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={400}
        height={300}
      /> */}
    </section>
  )
}

export default Dashboard