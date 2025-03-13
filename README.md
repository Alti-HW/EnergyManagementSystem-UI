# Energy Management System (EMS) UI

## Introduction  
The EMS UI is an interactive platform designed to streamline energy monitoring and management processes. This documentation provides an in-depth guide to understanding the structure, functionality, and implementation details of the EMS UI.  

## Technology Stack  
- **Frontend:** React.js (CRA)  
- **State Management:** React Context  
- **UI Framework:** Material-UI  
- **API Calls:** Axios  
- **Testing:** Jest, React Testing Library  
- **Containerization:** Docker  

## Installation Setup and Run  
Follow these steps to run the project locally:  

### Clone the project:
```sh
 git clone https://github.com/Alti-HW/EnergyManagementSystem-UI.git
```

### Navigate to the project directory:
```sh
 cd EnergyManagementSystem-UI
```

### Install dependencies:
```sh
 npm install
```

### Start the server:
```sh
 npm run start
```

## Project Structure  
```
EnergyManagementSystem-UI/
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── authorization/
│   │   ├── FeatureAccessControl.tsx
│   │   ├── user.access.constants.ts
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── PrivateRoute.tsx
│   │   ├── dashboard/
│   │   │   ├── CustomDialog.tsx
│   │   │   ├── Dashboard.css
│   │   │   ├── Dashboard.tsx
│   │   │   ├── components/
│   │   │   │   ├── Alarms.tsx
│   │   │   │   ├── ChartHeading.tsx
│   │   │   │   ├── ChartWrapper.tsx
│   │   ├── user-management/
│   │       ├── AddUserModal.tsx
│   │       ├── DeleteUserModal.tsx
│   │       ├── EditUserModal.tsx
│   │       ├── UserTable.tsx
│   ├── configs/
│   │   ├── energyManagement.json
│   ├── constants/
│   │   ├── routes.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── types/
│   │   ├── dashboard.types.ts
├── tsconfig.json
└── yarn.lock
```

## Project Architecture  
![EMS UI Dashboard](https://fastly.picsum.photos/id/214/200/300.jpg?hmac=XWc2pr4xabaprbyVoKEw9VsBDZ0ibySoVWMJaKokGRU)
### Pages  
- **Dashboard:** Displays energy consumption metrics, including real-time data and historical trends.  
- **Alerts:** Sends notifications of anomalies or critical energy usage events.  
- **User Management:** Enables administrators to manage users, assign roles, and control access.  

### Authentication  
This section describes the authentication flow for the Energy Management System, covering login and logout processes, including:
- **Standard username/password login**  
- **Social media login (Google)**  
- **Active Directory Single Sign-On (SSO)**  

#### Functionality  
- **Login:** Users can log in to the system using several methods:
  - **Standard Credentials:** Username/email and password. Successful login establishes a user session.
  - **Social Media (Google):** Users can authenticate using their Google accounts.
  - **Active Directory SSO:** Users can authenticate using their existing Active Directory credentials via Single Sign-On (SSO).
- **Logout:** Users can log out, terminating their session.
- **Session Management:** The system manages user sessions using cookies or local storage.
- **Protected Routes:** Requires users to be authenticated before access.
- **Token Management:** Uses JWT for authentication.

### Components  
- **Login:** `src/components/auth/Login.tsx`
- **AuthContext:** `src/context/AuthContext.tsx`
- **PrivateRoute:** `src/components/auth/PrivateRoute.tsx`

## Dashboard  

### Functionality  
- **Data Visualization:** Displays charts (bar, line, doughnut) via `ChartWrapper`.
- **Customization:** Users can edit the dashboard layout.
- **Real-time Monitoring:** Updates dynamically.
- **Full View Mode:** Dashboard components can be viewed in full screen.
- **Scrollable Charts:** Supports horizontal scrolling for time-series data.
- **Export Chart Data:** Supports export to PDF, PNG, JPG.

### Components  
- **Dashboard:** `src/components/dashboard/Dashboard.tsx`
- **ChartWrapper:** `src/components/dashboard/components/ChartWrapper.tsx`
- **ChartHeading:** Handles chart titles and controls.

## User Management  

### Functionality  
- **User Creation:** Add new users.
- **User Editing:** Modify user details.
- **User Deletion:** Remove users.
- **Role Management:** Assign and edit roles.
- **Permissions Management:** Control feature access.

### Components  
- `UserTable.tsx`: Displays users.
- `EditUserModal.tsx`: Edits user details.
- `DeleteUserModal.tsx`: Confirms user deletion.
- `AddUserModal.tsx`: Adds new users.
- `FeatureAccessControl.tsx`: Controls access based on user roles.

### Permissions  
- **`VIEW_USERS`**: View user list.
- **`ADD_USER`**: Create users.
- **`EDIT_USER`**: Edit users.
- **`DELETE_USER`**: Remove users.
- **`VIEW_ROLES`**: View roles.
- **`ADD_ROLE`**: Create roles.
- **`EDIT_ROLE`**: Edit roles.
- **`DELETE_ROLE`**: Remove roles.

## Plugins and Modules Used  
- **React Router:** Routing.
- **Axios:** API calls.
- **React Chart.js 2:** Chart rendering.
- **React Context API:** State management.
- **Material UI (MUI):** UI elements and icons.

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
