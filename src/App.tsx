import React from 'react';
// const logo = require('./logo.svg') as string
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './components/login/Login';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const handleLogin = () => {
    console.log("login")
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login />} />

        <Route  element={<Layout />} >
          <Route index path="/dashboard"  element={<Dashboard/>} />
          <Route path="/alerts" element={<div> Alerts </div>} />
          <Route path="/reports" element={<div>Reports</div>} />
          <Route path="/analytics" element={<div>Analytics</div>} />
          <Route path="/userManagement" element={<div>User Management</div>} />
        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
