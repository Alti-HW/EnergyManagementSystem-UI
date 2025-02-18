import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Use Navigate for redirect
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/login/LoginPage";
import UserManagement from "./containers/user_managements/users/layouts/user_managemet_layout";
import Users from "./containers/user_managements/users/users";
import Roles from "./containers/user_managements/roles/roles";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/themeprovider";
import { SnackbarProvider } from "./components/ui_components/alert.ui";
import { ConfirmationDialogProvider } from "./components/ui_components/confirmation_dialog.ui";
import { LoaderProvider } from "./components/ui_components/full_page_loader.ui";
import UserProvider, { useUser } from "./context/user.context";
import userAccess from "./authorization/user.access.constants";
import config from "./configs/energyManagement.json";
import { supportedRoutes } from "./constants/routes";

// Protected Route Component
function ProtectedRoute({ children, requiredRoles = [] }: any) {
  const { user } = useUser();

  // Check if the token exists in localStorage
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (requiredRoles.length <= 0) {
    return children;
  }
  // Check if the user has the required roles
  const hasRequiredRole = requiredRoles?.some((role: string) =>
    user?.resource_access?.EMS?.roles?.includes(role)
  );

  if (!hasRequiredRole) {
    return null;
  }

  // If authenticated, render the children (protected component)
  return children;
}

const routeMapper = (container: any) => {
  switch (container?.type) {
    case "dashboard":
      return (
        <Route
          index
          path="/dashboard"
          element={
            <ProtectedRoute requiredRoles={[...userAccess.VIEW_DASHBOARD]}>
              <Dashboard defaultConfig={container} />
            </ProtectedRoute>
          }
        />
      );
    case "userManagement":
      return (
        <Route element={<UserManagement />}>
          <Route
            path="/userManagement/users"
            index
            element={
              <ProtectedRoute requiredRoles={userAccess.VIEW_USERS}>
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
      <UserProvider>
        <ThemeProvider theme={theme}>
          <LoaderProvider>
            <SnackbarProvider>
              <ConfirmationDialogProvider>
                <Routes>
                  {/* Login route (no protection) */}
                  <Route path="/" index element={<LoginPage />} />

                  <Route element={<Layout menuOptions={generateMenu()} />}>
                    {config.containers.map((container: any) =>
                      routeMapper(container)
                    )}
                  </Route>
                </Routes>
              </ConfirmationDialogProvider>
            </SnackbarProvider>
          </LoaderProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
