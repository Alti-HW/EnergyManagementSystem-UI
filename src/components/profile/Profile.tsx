import React from "react";

import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Profile.scss'


const Profile = () => {
    const [profileMenu, setProfileMenu] = React.useState<HTMLButtonElement | null>(null);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfileMenu(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenu(null);
        
    };

    const open = Boolean(profileMenu);
    return (
        <div className="profile">
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                id="profile-button"
                aria-controls={open ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleProfileMenuOpen}
                className="profileIcon"
            >
                <AccountCircleIcon />

            </IconButton>
            <Menu
                id="profile-menu"
                anchorEl={profileMenu}
                open={open}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
                <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
            </Menu>

        </div>
    )
}

export default Profile