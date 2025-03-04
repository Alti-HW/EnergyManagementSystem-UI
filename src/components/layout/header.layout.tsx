import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { decodeToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useUser } from '../../context/user.context';
import userAccess from '../../authorization/user.access.constants';
import { userActions } from '../../actions/users';

const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { login, logout, user } = useUser();

    React.useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (token) {
            const pr = decodeToken(token);
            userActions.getAssignedRolesForUser(pr.sub).then((res: any) => {
                const roles = res?.data?.clientMappings?.EMS?.mappings[0] || {}
                login({ ...pr, role: roles });
            })
        }
    }, []);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const getInitials = () => {
        const firstInitial = user?.given_name?.charAt(0)?.toUpperCase() || "";
        const lastInitial = user?.family_name?.charAt(0)?.toUpperCase() || "";
        return `${firstInitial}${lastInitial}`;
    };

    const logoutt = () => {
        logout()
    };

    return (
        <AppBar position="static" color="primary" sx={{ height: '48px' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: '48px !important' }}>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt="User Avatar"
                                    sx={{
                                        fontSize: '.9rem',
                                        width: '36px',
                                        height: '36px',
                                        background: '#fff',
                                        color: (theme) => theme.palette.primary.main,
                                    }}
                                >
                                    {getInitials()}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* User Info Section */}
                            <Box sx={{ padding: '10px', minWidth: '200px' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    {user?.given_name} {user?.family_name}
                                </Typography>
                                <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>
                                    {user?.email}
                                </Typography>
                            </Box>

                            {/* Divider */}
                            <Divider sx={{ margin: '8px 0' }} />

                            {/* Logout Section */}
                            <MenuItem onClick={logoutt} sx={{ justifyContent: 'center' }}>
                                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
