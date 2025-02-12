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
import UserProvider, { useUser } from "./context/user.context";
import userAccess from "./authorization/user.access.constants";

// Protected Route Component
function ProtectedRoute({ children, requiredRoles = [] }: any) {
  const { user } = useUser();

  // Check if the token exists in localStorage
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (requiredRoles.length <= 0) {
    return children
  }
  // Check if the user has the required roles
  const hasRequiredRole = requiredRoles?.some((role: string) => user?.resource_access?.EMS?.roles?.includes(role));

  if (!hasRequiredRole) {
    return null;
  }


  // If authenticated, render the children (protected component)
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
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
                        <ProtectedRoute >
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
                          <ProtectedRoute requiredRoles={userAccess.VIEW_USERS} >
                            <Users />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/userManagement/roles"
                        element={
                          <ProtectedRoute requiredRoles={userAccess.VIEW_ROLES}>
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
      </UserProvider>
    </BrowserRouter >
  );
}

export default App;
