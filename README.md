# EnergyManagementSystem-UI

## Configuration for charts

# type : Indicated component to render

# chartType : Indicated the chart type to be rendered

    supported types : 'bar' 'line' 'doughnut'

# title : title of the chart component

# dataApi : Accepts an Array

mock Object
{
"url": "http://localhost:5050/api/Energy/energy-consumption"
"userFor": "chartData",
"method": "POST",
}

    url : API URL
    usedFor: describes what is the purpose of this API
             Supported types : "chartData", "filters"
    method: What the API method to fetch data

# xAxisKey : Key to be used in the chart data for x-axis

# yAxisKey : Key to be used in the chart data for y-axis
