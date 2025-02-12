import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";  // Use Navigate for redirect
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

// Protected Route Component
function ProtectedRoute({ children }: any) {
  // Check if the token exists in localStorage
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the children (protected component)
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LoaderProvider>
          <SnackbarProvider>
            <ConfirmationDialogProvider>
              <Routes>
                {/* Login route (no protection) */}
                <Route path="/" index element={<LoginPage />} />

                {/* Protected routes */}
                <Route element={<Layout />}>
                  <Route
                    index
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/alerts"
                    element={
                      <ProtectedRoute>
                        <div>Alerts</div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <div>Reports</div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <ProtectedRoute>
                        <div>Analytics</div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <div>My Account</div>
                      </ProtectedRoute>
                    }
                  />
                  <Route element={<UserManagement />}>
                    <Route
                      path="/userManagement/users"
                      index
                      element={
                        <ProtectedRoute>
                          <Users />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/userManagement/roles"
                      element={
                        <ProtectedRoute>
                          <Roles />
                        </ProtectedRoute>
                      }
                    />
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
