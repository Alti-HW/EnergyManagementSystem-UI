import React, { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemText, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

interface Role {
  id: string;
  name: string;
}

const UserRoles: React.FC = () => {
  const [assignedRoles, setAssignedRoles] = useState<Role[]>([]);
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');

  // Fetch current roles assigned to the user
  useEffect(() => {
    axios.get('/api/user/roles')
      .then((response) => {
        setAssignedRoles(response.data);
      })
      .catch((error) => console.error('Error fetching roles:', error));

    // Fetch available roles for adding
    axios.get('/api/roles')
      .then((response) => {
        setAvailableRoles(response.data);
      })
      .catch((error) => console.error('Error fetching available roles:', error));
  }, []);

  // Handle removing a role
  const handleRemoveRole = (roleId: string) => {
    axios.post('/api/user/remove-role', { roleId })
      .then(() => {
        setAssignedRoles(assignedRoles.filter((role) => role.id !== roleId));
      })
      .catch((error) => console.error('Error removing role:', error));
  };

  // Handle adding a new role
  const handleAddRole = () => {
    if (!selectedRole) return;

    axios.post('/api/user/add-role', { roleId: selectedRole })
      .then(() => {
        setAssignedRoles([...assignedRoles, availableRoles.find((role) => role.id === selectedRole)!]);
      })
      .catch((error) => console.error('Error adding role:', error));
  };

  return (
    <Box>
      <List>
        {assignedRoles.map((role) => (
          <ListItem key={role.id} >
            <ListItemText primary={role.name} />
            <Button onClick={() => handleRemoveRole(role.id)} variant="outlined" color="secondary">
              Remove
            </Button>
          </ListItem>
        ))}
      </List>

      <FormControl fullWidth margin="normal">
        <InputLabel>Assign Role</InputLabel>
        <Select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {availableRoles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={handleAddRole} variant="contained" color="primary">
        Add Role
      </Button>
    </Box>
  );
};

export default UserRoles;
