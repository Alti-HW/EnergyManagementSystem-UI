import DashboardIcon from '@mui/icons-material/Dashboard';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ReportIcon from '@mui/icons-material/Report';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonIcon from '@mui/icons-material/Person';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export const userRoutes = [
    {
        path: '/dashboard',
        label: 'Dashboard',
        Icon: DashboardIcon
    },
    {
        path: '/alerts',
        label: 'Alerts',
        Icon: AddAlertIcon
    },
    {
        path: '/reports',
        label: 'Reports',
        Icon: ReportIcon,
    },
    {
        path: '/analytics',
        label: 'Analytics',
        Icon: AnalyticsIcon
    },
    {
        path: '/profile',
        label: 'My Account',
        Icon: PersonIcon
    }
]

export const adminRoutes = [
    {
        path: '/userManagement',
        label: 'User Management',
        Icon: SupervisedUserCircleIcon
    }
]