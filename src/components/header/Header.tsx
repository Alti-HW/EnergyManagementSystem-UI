import { AppBar, Divider, Drawer, IconButton, MenuItem, MenuList } from "@mui/material"
import { NavLink, NavLinkRenderProps } from "react-router"
import { adminRoutes, userRoutes } from "../../constants/routes";
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import './Header.scss'
import { useEffect, useState } from "react";


const Header = () => {

    const [openDrawer, setOpenDrawer] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767)

    const handleActiveRoute = ({ isActive }: NavLinkRenderProps): string => {
        return `menu ${isActive ? 'activeMenu' : ''} `
    }

    const handleCloseDrawer = () => {
        console.log('close called')
        setOpenDrawer(false)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767)
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    console.log("isMobile", isMobile)
    return (
        <>
            {isMobile &&
                <AppBar className="mobileHeader" >
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
                </AppBar>
            }

            <Drawer
                sx={{
                    width: '240px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMobile ? '75%' : '240px',
                        boxSizing: 'border-box',
                        backgroundColor: '#4B5563',
                        color: '#fff',
                        bottom: 0,
                        borderRadius: isMobile ? 'none' : '10px',
                        // margin: '0 0 0 8px'
                    },
                }}
                anchor="left"
                open={isMobile ? openDrawer : true}
                variant={isMobile ? 'temporary' : "persistent"}
                onClose={handleCloseDrawer}

            >
                {!isMobile && <img className="logo" src="https://www.altimetrik.com/storage/2023/07/Altimetrik-logo_4.png" alt="Logo" />}
                {isMobile && <IconButton
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
                }
                <MenuList sx={{
                    '&.MuiList-root': {
                        marginTop: isMobile ? '32px' : '0'
                    }
                }}>
                    {userRoutes.map(({ path, label }) => (
                        <MenuItem key={path}>
                            <NavLink onClick={handleCloseDrawer} className={handleActiveRoute} to={path}>
                                {label}</NavLink>
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