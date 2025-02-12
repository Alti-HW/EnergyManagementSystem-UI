import DashboardIcon from "@mui/icons-material/Dashboard";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ReportIcon from "@mui/icons-material/Report";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PersonIcon from "@mui/icons-material/Person";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

export const userRoutes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    Icon: DashboardIcon,
    type: "dashboard",
  },
  {
    path: "/alerts",
    label: "Alerts",
    Icon: AddAlertIcon,
  },
  {
    path: "/reports",
    label: "Reports",
    Icon: ReportIcon,
  },
  {
    path: "/analytics",
    label: "Analytics",
    Icon: AnalyticsIcon,
  },
  {
    path: "/profile",
    label: "My Account",
    Icon: PersonIcon,
  },
];

export const adminRoutes = [
  {
    path: "/userManagement/users",
    label: "User Management",
    Icon: SupervisedUserCircleIcon,
    subRoutes: [
      {
        path: "/userManagement/users",
        label: "Users",
        Icon: SupervisedUserCircleIcon,
      },
      {
        path: "/userManagement/roles",
        label: "Roles",
        Icon: SupervisedUserCircleIcon,
      },
    ],
  },
];

export const supportedRoutes = [
  {
    path: "/userManagement/users",
    label: "User Management",
    Icon: SupervisedUserCircleIcon,
    type: "userManagement",
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    Icon: DashboardIcon,
    type: "dashboard",
  },
  {
    path: "/alerts",
    label: "Alerts",
    Icon: AddAlertIcon,
    type: "alerts",
  },
  {
    path: "/reports",
    label: "Reports",
    Icon: ReportIcon,
    type: "reports",
  },
  {
    path: "/analytics",
    label: "Analytics",
    Icon: AnalyticsIcon,
    type: "analytics",
  },
  {
    path: "/profile",
    label: "My Account",
    Icon: PersonIcon,
    type: "profile",
  },
];
