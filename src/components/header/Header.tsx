import { AppBar, Divider, Drawer, IconButton, MenuItem, MenuList, Tooltip, Typography } from "@mui/material"
import { NavLink, NavLinkRenderProps } from "react-router"
import { adminRoutes, userRoutes } from "../../constants/routes";
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import './Header.scss'
import { useEffect, useState } from "react";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { HeaderProps } from "./types";


const Header = ({ onMenuExpand }: HeaderProps) => {

    const [openDrawer, setOpenDrawer] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767)
    const [isMenuMinimized, setIsMenuMinimized] = useState(false)

    const handleActiveRoute = ({ isActive }: NavLinkRenderProps): string => {
        return `menu ${isActive ? 'activeMenu' : ''} `
    }

    const handleMenuMinimize = () => {
        setIsMenuMinimized((value) => !value)
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

    useEffect(() => {
        if (onMenuExpand) {
            onMenuExpand(isMenuMinimized)
        }
    }, [isMenuMinimized])

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
                    width: isMenuMinimized ? '60px' : '220px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMobile ? '75%' : isMenuMinimized ? '60px' : '220px',
                        boxSizing: 'border-box',
                        backgroundColor: '#192142',
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

                {!isMobile &&
                    <div className="logoWrapper">
                        {!isMenuMinimized && <img className="logo" src="/altimetrik.png" alt="Logo" />}
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="close drawer"
                            sx={{ mr: 2 }}
                            onClick={handleMenuMinimize}

                        >
                            {isMenuMinimized ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
                        </IconButton>
                    </div>}
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
                    {userRoutes.map(({ path, label, Icon }) => (
                        <MenuItem key={path}>
                            <NavLink onClick={handleCloseDrawer} className={handleActiveRoute} to={path}>
                                <Tooltip title={label} placement='right-start'>
                                    {Icon && <Icon sx={{ width: '16px', verticalAlign: 'bottom' }} />}
                                </Tooltip>
                                {!isMenuMinimized && <Typography variant="body1" sx={{ display: 'inline-block', ml: 1 }}> {label} </Typography>}
                            </NavLink>
                        </MenuItem>
                    )
                    )}
                    <Divider className="divider" />
                    {adminRoutes.map(({ path, label, Icon }) => (
                        <MenuItem key={path}>
                            <NavLink onClick={handleCloseDrawer} className={handleActiveRoute} to={path}>
                                <Tooltip title={label} placement='right-start'>
                                    {Icon && <Icon sx={{ width: '16px', verticalAlign: 'bottom' }} />}
                                </Tooltip>
                                {!isMenuMinimized && <Typography variant="body1" sx={{ display: 'inline-block', ml: 1 }}> {label} </Typography>}
                            </NavLink>
                        </MenuItem>
                    ))}
                </MenuList>
            </Drawer>
        </>
    )
}

export default Header