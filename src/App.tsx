
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/login/LoginPage";
import UserManagement from "./containers/user_managements/users/layouts/user_managemet_layout";
import Users from "./containers/user_managements/users/users";
import Roles from "./containers/user_managements/roles/roles";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/themeprovider";
import { SnackbarProvider } from "./components/ui_components/alert.ui";
import { ConfirmationDialogProvider } from './components/ui_components/confirmation_dialog.ui';
import { LoaderProvider } from "./components/ui_components/full_page_loader.ui";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LoaderProvider>
          <SnackbarProvider>
            <ConfirmationDialogProvider>
              <Routes>
                <Route path="/" index element={<LoginPage />} />

                <Route element={<Layout />}>
                  <Route index path="/dashboard" element={<Dashboard />} />
                  <Route path="/alerts" element={<div> Alerts </div>} />
                  <Route path="/reports" element={<div>Reports</div>} />
                  <Route path="/analytics" element={<div>Analytics</div>} />
                  <Route path="/profile" element={<div>My Account</div>} />
                  <Route element={<UserManagement />}>
                    <Route path="/userManagement/users" index element={<Users />} />
                    <Route path="/userManagement/roles" element={<Roles />} />
                  </Route>
                </Route>
              </Routes>
            </ConfirmationDialogProvider>
          </SnackbarProvider>
        </LoaderProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
