import { Box, Tab, Tabs, Menu, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";

const Userlayout = ({ children, availableRoles, totalUsers, totalInvitedUsers = 0 }: any) => {
    const [activeTab, setActiveTab] = useState("users");
    const [moreMenuOpen, setMoreMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [roleFilter, setRoleFIlter] = useState<string>()

    const [moreTabLabel, setMoreTabLabel] = useState("More");

    useEffect(() => {
        setActiveTab("users")
    }, [])

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
        setRoleFIlter(newValue === "users" ? "" : newValue)
    };

    const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setMoreMenuOpen(true);
    };

    const handleMenuItemClick = (tab: string, label: string) => {
        // Change the "More" tab label to the selected one
        setMoreTabLabel(label);
        setActiveTab(tab);
        setMoreMenuOpen(false); // Close the "More" menu
    };


    const visibleTabs = availableRoles.slice(0, 5);  // Show up to 5 tabs initially
    const overflowTabs = availableRoles.slice(5);    // Remaining tabs for "More"

    return (
        <>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                sx={{
                    backgroundColor: "background.paper",
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <Tab
                    sx={{
                        fontSize: "14px",
                        padding: "6px 12px",
                        textTransform: "none",
                    }}
                    value="users"
                    label={`All Users (${totalUsers})`}
                />
                {visibleTabs.map((elm: any) => (
                    <Tab
                        key={elm[0]}
                        sx={{
                            fontSize: "14px",
                            padding: "6px 12px",
                            textTransform: "none",
                        }}
                        value={elm[0]}
                        label={`${elm[1].role.name} (${elm[1].userCount})`}
                    // onClick={() => onTabClick(elm[0])}
                    />
                ))}
                <Tab
                    sx={{
                        fontSize: "14px",
                        padding: "6px 12px",
                        textTransform: "none",
                    }}
                    value="invited"
                    label={`Invited (${totalInvitedUsers()})`}
                />
                {/* {overflowTabs.length > 0 && (
                    <Tab
                        sx={{
                            fontSize: "14px",
                            padding: "6px 12px",
                            textTransform: "none",
                        }}
                        value="more"
                        label={moreTabLabel}  // Show "More" or the selected label
                        onClick={handleMoreClick}
                    />
                )} */}
            </Tabs>
            <Menu
                anchorEl={anchorEl}
                open={moreMenuOpen}
                onClose={() => setMoreMenuOpen(false)}
            >
                {overflowTabs.map((elm: any) => (
                    <MenuItem
                        key={elm.id}
                        onClick={() => handleMenuItemClick(elm.id, elm.name)}  // Pass both tab id and name
                    >
                        {elm.name}
                    </MenuItem>
                ))}
            </Menu>
            <Box>
                {React.cloneElement(children, { roleFilter, activeTab })}
            </Box>
        </>
    );
};

export default Userlayout;
