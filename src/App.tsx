import React from "react";
// const logo = require('./logo.svg') as string
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import UserManagementTable from "./containers/user_managements/users";
import RolesTable from "./containers/user_managements/roles";
import UserSettings from "./containers/user_managements/user_details/settings";
import UserRoles from "./containers/user_managements/user_details/roles";
import UserLayoutTabs from "./containers/user_managements/user_details/user_layout";
import AddUser from "./containers/user_managements/users/add_user";
import LoginPage from "./components/login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/alerts" element={<div> Alerts </div>} />
          <Route path="/reports" element={<div>Reports</div>} />
          <Route path="/analytics" element={<div>Analytics</div>} />
          <Route path="/profile" element={<div>My Account</div>} />
          <Route
            path="/userManagement/users"
            element={<UserManagementTable />}
          />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
