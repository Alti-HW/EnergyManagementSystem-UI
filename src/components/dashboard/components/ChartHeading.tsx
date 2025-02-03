import { Box, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import CropFreeIcon from '@mui/icons-material/CropFree';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ChartHeadingProps } from "../types";
import { useEffect, useRef, useState } from "react";
import { ClearIcon } from "@mui/x-date-pickers";

const ChartHeading = ({ title, onExpandIconClick, FilterComponent }: ChartHeadingProps) => {
    const [showExportOptionsMenu, setShowExportOptionsMenu] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [showConfig, setShowConfig] = useState(false)
    const menuRef = useRef<HTMLElement | null>(null);


    const handleConfigIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setShowConfig(true)
    }

    const listOfOptions = [
        'PDF', 'IMG', 'CSV'
    ]
    const handleExportMenuOpen = () => {
        setShowExportOptionsMenu(true)
        setShowFilters(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            // setShowConfig(false);
            // setShowFilters(false)
            // setShowExportOptionsMenu(false)
        }
    };
    const handleFiltersOpen = () => {
        setShowFilters(true)
        setShowExportOptionsMenu(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="chartHeader">
            <h2 className='heading'>{title}</h2>
            <div >
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="close date range selector"
                    onClick={handleConfigIconClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="close date range selector"
                    onClick={onExpandIconClick}
                >
                    <CropFreeIcon />
                </IconButton>
                <div  ></div>
                {showConfig &&
                    <Box sx={{
                        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                        padding: '10px',
                        borderRadius: '4px',
                        right: 0,
                        top: '1px',
                        position: 'absolute',
                        bgcolor: 'background.paper',
                        zIndex: 1,
                        p: 0,
                        pt:'24px'
                    }}
                        ref={menuRef}
                    >
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="close date range selector"
                            sx={{ mr: 2 }}
                            onClick={() => setShowConfig(false)}
                            className="closeConfigIcon"
                        >
                            <ClearIcon />
                        </IconButton>
                        <List sx={{ p: 0 }} >
                            <ListItem sx={{ cursor: 'pointer' }} disablePadding>
                                <ListItemButton sx={{ width: '100%', position: 'relative' }} onClick={handleExportMenuOpen}>
                                    <ListItemText primary="Export as" sx={{ '& .MuiTypography-root': { fontSize: '12px' } }} />
                                    {showExportOptionsMenu && <Box sx={{
                                        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                                        padding: '10px',
                                        borderRadius: '4px',
                                        top: '-1px',
                                        position: 'absolute',
                                        bgcolor: 'background.paper',
                                        zIndex: 1,
                                        p: 0,
                                        left: '-1px',
                                        right: 'unset',
                                        transform: 'translateX(-100%)'
                                    }}>
                                        <List sx={{ p: 0 }}>
                                            {listOfOptions.map(ele => (
                                                <ListItem sx={{ cursor: 'pointer' }} disablePadding>
                                                    <ListItemButton onClick={() => setShowExportOptionsMenu(false)}>
                                                        <ListItemText sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}>
                                                            {ele}
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                            }
                                        </List>
                                    </Box>
                                    }
                                </ListItemButton>
                            </ListItem>
                            {FilterComponent &&
                                <ListItem sx={{ cursor: 'pointer', position: 'relative' }} disablePadding>
                                    <ListItemButton onClick={handleFiltersOpen}>
                                        <ListItemText primary="Filters" sx={{ '& .MuiTypography-root': { fontSize: '12px' } }} />
                                        {showFilters && <Box sx={{
                                            boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                                            padding: '10px',
                                            borderRadius: '4px',
                                            top: '-1px',
                                            position: 'absolute',
                                            bgcolor: 'background.paper',
                                            zIndex: 1,
                                            p: 0,
                                            left: '-1px',
                                            right: 'unset',
                                            transform: 'translateX(-100%)'
                                        }}>
                                            <FilterComponent />
                                        </Box>}
                                    </ListItemButton>
                                </ListItem>
                            }
                        </List>
                    </Box>
                }
            </div>
        </div>
    )
}

export default ChartHeading