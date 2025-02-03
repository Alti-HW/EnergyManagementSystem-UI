import React from 'react';
// const logo = require('./logo.svg') as string
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './components/login/Login';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import UserManagementTable from './containers/user_managements';
import RolesTable from './containers/user_managements/roles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login />} />

        <Route  element={<Layout />} >
          <Route index path="/dashboard"  element={<Dashboard/>} />
          <Route path="/alerts" element={<div> Alerts </div>} />
          <Route path="/reports" element={<div>Reports</div>} />
          <Route path="/analytics" element={<div>Analytics</div>} />
          <Route path="/profile" element={<div>My Account</div>} />
          <Route path="/userManagement/users" element={<UserManagementTable/>} />
          <Route path="/userManagement/roles" element={<RolesTable/>} />
        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
