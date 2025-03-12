# Energy Management System

The EMS UI is an interactive platform designed to streamline energy monitoring and 
management processes. This documentation provides an in-depth guide to understanding 
the structure, functionality, and implementation details of the EMS UI.
## Run Locally

Clone the project

```bash
 https://github.com/Alti-HW/EnergyManagementSystem-UI.git
```

Go to the project directory

```bash
  cd EnergyManagementSystem-UI
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Configuration Support

EMS system is running on Configuration which can be altered by using below steps

Go to file edit the JSON file

```bash
src/configs/energyManagement.json

```

### Supporting Configuration

- Containers Configuration

| Key        | Description                                         | Supporting types                      | Example                                                |
| ---------- | --------------------------------------------------- | ------------------------------------- | ------------------------------------------------------ |
| containers | Root component for every route                      | Array of child component              | `'{"type":"alerts","name":"alerts","title":"Alerts"}'` |
| type       | Type of container that need to render               | dashboard \| alerts \| userManagement | `"type": "alerts"`                                     |
| name       | Used for displaying the Routes name in the side nav | string                                | `"name": "Dashboard"`                                  |
| components | Root key for components                             | Array of components                   | `"components": []`                                     |

- Components Configuration

| Key | Description | Supporting types | Example |
|----------|----------|----------|----------|
|type| Used to identify the componentto be rendered | chart \| alarms | `"type": "alarms"`
|chartType| Used to identify the chart type | bar \| line \| doughnut| `"chartType": "line"`
|title| Title for the component card| string| ` "title": "Floor wise Energy usage"`
|xAxisKey|Key to refer in the response for x-axis data |string| `"xAxisKey": "timestamp"`
|yAxisKey |Key to refer in the response for y-axis data |string| ` "yAxisKey": "energyConsumedKwh"`
|xAxisLabel| Label to be displayed in x-axis|string| `"xAxisLabel": "Date and Time"`
|yAxisLabel| Label to be displayed in x-axis|string| `"yAxisLabel": "Units consumed"`
|xAxisDataFormatter| Fomatter to be applied for the x-axis ticks|string\|number \|date | default is string <br/> `"xAxisDataFormatter": "date"`
|yAxisDataFormatter| Fomatter to be applied for the y-axis ticks|string\|number \|date | default is string <br/> `"yAxisDataFormatter": "string"`
|dateFilter| Object for configuring the Date change options for chart | | `'{"dateFilter":{"filterType":"date","filterValues":["1D","1W","1M","3M","6M","1Y","3Y"],"showFilter":"true"}}'`
|filters| Array of objects for filters | Acceptiong only 2 filters that are type dropdown only <br/> Supporting : <br/> `{"filterType":"dropdown","filterValues":[],"showFilter":"true","filterLabel":"Building","filterDataValueKey":"buildingId","filterDataLabelKey":"name","filterId":"buildingId","dataPath":""}` <br/> Provide either filtervalues is an array of `[{label: string, value: string` or filterDataValueKey and filterDataLabelKey as strings to populate data from API | `'{"filterType":"dropdown","filterValues":[],"showFilter":"true","filterLabel":"Building","filterDataValueKey":"buildingId","filterDataLabelKey":"name","filterId":"buildingId","dataPath":""}'`
|enableScrollInFullview| Toggle to enable and disable the scroll in expanded chart view | boolean | `"enableScrollInFullview": "true",`
|color| Chart color code | Hexcode | `"color": "#a26cb6",`
|exportOptions| List of chart data export options | PNG\| PDF\| JPG | ` "exportOptions": ["PNG", "JPG"]`
|enableDetailedView| Enables chart onclick and opens the modal with details | boolean | `"enableDetailedView": "true"`
|detailedViewConfig| configuation for detailed view table | | `'{"detailedViewConfig":{"dataApi":"http://localhost:5050/api/Energy/energy-consumption","dataApiReqFormat":{"startDate":"date","endDate":"date"},"apiMethod":"POST","keyToBeRead":"buildingId","tableConfig":[{"colHeading":"Total cost","dataKey":"totalCost"},{"colHeading":"Units consumed","dataKey":"energyConsumedKwh"},{"colHeading":"Cost per unit hhh","dataKey":"costPerUnit"},{"colHeading":"Building","dataKey":"buildingId"},{"colHeading":"Floor","dataKey":"floorId"},{"colHeading":"Time Window","dataKey":"timestamp"}],"dataKey":["floorConsumptions","floorDetails"]}}'`
|width| Width of chart container | string |`"width": "100%"`
|dataApi| Array of objects with API configurations | supporting types "userFor": "chartData \| filters" | `'{"dataApi":[{"url":"http://localhost:5050/api/Energy/energy-consumption","userFor":"chartData","method":"POST","dataPathKey":["floorConsumptions","floorDetails"]},{"url":"http://localhost:5050/api/Building/GetAllBuildingsWithFloors","userFor":"filters","method":"GET"}]}'`
