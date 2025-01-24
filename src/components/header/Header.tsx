import { AppBar, Divider, Drawer, IconButton, MenuItem, MenuList } from "@mui/material"
import { useState } from "react"
import { NavLink, NavLinkRenderProps } from "react-router"
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import Profile from "../profile/Profile";
import { adminRoutes, userRoutes } from "../../constants/routes";
import './Header.scss'


const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false)

    const handleActiveRoute = ({ isActive }: NavLinkRenderProps): string => {
        return `menu ${isActive ? 'activeMenu' : ''} `
    }

    const handleCloseDrawer = () => {
        setOpenDrawer(false)
    }
    return (
        <>
            <AppBar position="static" className="appHeader" >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    onClick={() => setOpenDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <img className="logo" src="https://www.altimetrik.com/storage/2023/07/Altimetrik-logo_4.png" alt="Logo" />
                <Profile />
            </AppBar>
            <Drawer
                sx={{
                    width: '240px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '240px',
                        boxSizing: 'border-box',
                        backgroundColor: '#4B5563',
                        color: '#fff',
                        bottom: 0,
                        paddingTop: '24px',
                        marginTop: '48px'
                    },
                }}
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="close drawer"
                    sx={{ mr: 2 }}
                    onClick={handleCloseDrawer}
                    className="closeDrawer"
                >
                    <ClearIcon />
                </IconButton>
                <MenuList>
                    {userRoutes.map(route => (
                        <MenuItem key={route.path}>
                            <NavLink onClick={handleCloseDrawer} className={handleActiveRoute} to={route.path}>{route.label}</NavLink>
                        </MenuItem>
                    )
                    )}
                    <Divider className="divider" />
                    {adminRoutes.map(route => (
                        <MenuItem key={route.path}>
                            <NavLink onClick={handleCloseDrawer} className={handleActiveRoute} to={route.path}>{route.label}</NavLink>
                        </MenuItem>
                    ))}
                </MenuList>
            </Drawer>
        </>
    )
}

export default Header