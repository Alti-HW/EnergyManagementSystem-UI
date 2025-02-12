import React from "react";
// const logo = require('./logo.svg') as string
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/login/LoginPage";
import UserManagement from "./containers/user_managements/UserManagement";
import Users from "./containers/user_managements/users/users";
import Roles from "./containers/user_managements/roles/roles";
import config from "./configs/energyManagement.json";
import { supportedRoutes } from "./constants/routes";

const routeMapper = (container: any) => {
  switch (container?.type) {
    case "dashboard":
      return (
        <Route
          index
          path="/dashboard"
          element={<Dashboard config={container} />}
        />
      );
    case "userManagement":
      return (
        <Route element={<UserManagement />}>
          <Route path="/userManagement/users" index element={<Users />} />
          <Route path="/userManagement/roles" element={<Roles />} />
        </Route>
      );
    case "alerts":
      return <Route path="/alerts" element={<div> Alerts </div>} />;
    case "analytics":
      <Route path="/analytics" element={<div>Analytics</div>} />;
  }
};
const generateMenu = () => {
  return config.containers.map((container: any) => {
    return supportedRoutes?.find((route: any) => route.type === container.type);
  });
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />

        <Route element={<Layout menuOptions={generateMenu()} />}>
          {config.containers.map((container: any) => routeMapper(container))}
          {/* <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/alerts" element={<div> Alerts </div>} />
          <Route path="/reports" element={<div>Reports</div>} />
          <Route path="/analytics" element={<div>Analytics</div>} />
          <Route path="/profile" element={<div>My Account</div>} />
          <Route element={<UserManagement />}>
            <Route path="/userManagement/users" index element={<Users />} />
            <Route path="/userManagement/roles" element={<Roles />} />
          </Route> */}
        </Route>
        {/* <Route path="/userManagement/users" element={<UserManagementTable />}>
          <Route path="/userManagement/user" element={<UserLayoutTabs />}>
            <Route
              path="/userManagement/user/:userid/settings"
              element={<UserSettings />}
            />
            <Route
              path="/userManagement/user/:userid/roles"
              element={<UserRoles />}
            />
          </Route>
          <Route path="/userManagement/user/add_user" element={<AddUser />} />
          <Route path="/userManagement/roles" element={<RolesTable />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
