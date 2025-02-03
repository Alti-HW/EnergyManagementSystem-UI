import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Box, Breadcrumbs, Link, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation, useParams, Outlet } from 'react-router-dom';

const UserTabs: React.FC = () => {
  const { userid } = useParams();  
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate(`/userManagement/user/${userid}/settings`);
    } else {
      navigate(`/userManagement/user/${userid}/roles`);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/settings')) {
      setValue(0);
    } else if (location.pathname.includes('/roles')) {
      setValue(1);
    }
  }, [location.pathname]);

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: 'Users', to: '/userManagement/users' }
    ];

    if (location.pathname.includes('settings')) {
      breadcrumbs.push({ label: 'Settings', to: `/userManagement/user/${userid}/settings` });
    } else if (location.pathname.includes('roles')) {
      breadcrumbs.push({ label: 'Roles', to: `/userManagement/user/${userid}/roles` });
    }

    return breadcrumbs;
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
        {getBreadcrumbs().map((breadcrumb, index) => (
          index === 0 ? (
            <Link key={index} color="inherit" href={breadcrumb.to}>
              {breadcrumb.label}
            </Link>
          ) : (
            <Typography key={index} color="textPrimary">
              {breadcrumb.label}
            </Typography>
          )
        ))}
      </Breadcrumbs>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="Settings" />
        <Tab label="Roles Mapping" />
      </Tabs>

      <Box>
        <Outlet />
      </Box>
    </Paper>
  );
};

export default UserTabs;
