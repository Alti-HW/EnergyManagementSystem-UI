import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import userAccess from "../authorization/user.access.constants";

export const userRoutes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    Icon: DashboardIcon,
    permissions: []
  },
];

export const adminRoutes = [
  {
    path: "/userManagement/users",
    label: "User Management",
    Icon: SupervisedUserCircleIcon,
    permissions: [...userAccess.VIEW_ROLES, ...userAccess.VIEW_USERS],
    subRoutes: [
      {
        path: "/userManagement/users",
        label: "Users",
        Icon: SupervisedUserCircleIcon,
        permissions: userAccess.VIEW_USERS
      },
      {
        path: "/userManagement/roles",
        label: "Roles",
        Icon: SupervisedUserCircleIcon,
        permissions: userAccess.VIEW_ROLES
      },
    ],
  },
];
