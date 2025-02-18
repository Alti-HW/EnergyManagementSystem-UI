import DashboardIcon from "@mui/icons-material/Dashboard";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ReportIcon from "@mui/icons-material/Report";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PersonIcon from "@mui/icons-material/Person";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import userAccess from "../authorization/user.access.constants";

// export const userRoutes = [
//   {
//     path: "/dashboard",
//     label: "Dashboard",
//     Icon: DashboardIcon,
//     permissions: [],
//     type: "dashboard",
//   },
//   {
//     path: "/alerts",
//     label: "Alerts",
//     Icon: AddAlertIcon,
//   },
//   {
//     path: "/reports",
//     label: "Reports",
//     Icon: ReportIcon,
//   },
//   {
//     path: "/analytics",
//     label: "Analytics",
//     Icon: AnalyticsIcon,
//   },
//   {
//     path: "/profile",
//     label: "My Account",
//     Icon: PersonIcon,
//   },
// ];

// export const adminRoutes = [
//   {
//     path: "/userManagement/users",
//     label: "User Management",
//     Icon: SupervisedUserCircleIcon,
//     permissions: [...userAccess.VIEW_ROLES, ...userAccess.VIEW_USERS],
//     subRoutes: [
//       {
//         path: "/userManagement/users",
//         label: "Users",
//         Icon: SupervisedUserCircleIcon,
//         permissions: userAccess.VIEW_USERS
//       },
//       {
//         path: "/userManagement/roles",
//         label: "Roles",
//         Icon: SupervisedUserCircleIcon,
//         permissions: userAccess.VIEW_ROLES
//       },
//     ],
//   },
// ];

export const supportedRoutes = [
  {
    path: "/userManagement/users",
    label: "User Management",
    Icon: SupervisedUserCircleIcon,
    permissions: [...userAccess.VIEW_ROLES, ...userAccess.VIEW_USERS],
    type: "userManagement",
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    Icon: DashboardIcon,
    permissions: [
      ...userAccess.VIEW_DASHBOARD,
      ...userAccess.DELETE_DASHBOARD,
      ...userAccess.EDIT_DASHBOARD,
      ...userAccess.EXPORT_REPORTS,
    ],
    type: "dashboard",
  },
  {
    path: "/alerts",
    label: "Alerts",
    Icon: AddAlertIcon,
    permissions: [],
    type: "alerts",
  },
  {
    path: "/reports",
    label: "Reports",
    Icon: ReportIcon,
    permissions: [],
    type: "reports",
  },
  {
    path: "/analytics",
    label: "Analytics",
    Icon: AnalyticsIcon,
    permissions: [],
    type: "analytics",
  },
  {
    path: "/profile",
    label: "My Account",
    Icon: PersonIcon,
    permissions: [],
    type: "profile",
  },
];
