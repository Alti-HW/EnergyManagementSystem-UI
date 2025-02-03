import React, { useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, Typography, Box, TableBody } from '@mui/material';
import Roles from './roles.json'; // Assume role data is imported
import SearchBar from '../search_bar';
import ActionButtons from '../actions_buttons';
import RoleRow from './roles_row'; // Assume this is a new component for rendering role rows
import PaginationControls from '../pagination_controls';
import AddRole from './add_role'; // Assume this is a new component for adding roles

interface RoleData {
  roleName: string;
  description: string;
  permissions: string[];
  dateAdded: string;
}

const RolesTable: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number | null>(null);
  const [isAddRole, setIsAddRole] = React.useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoleIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRoleIndex(null);
  };

  const handleEdit = () => {
    console.log('Edit role at index:', selectedRoleIndex);
    handleClose();
  };

  const handleDelete = () => {
    console.log('Delete role at index:', selectedRoleIndex);
    handleClose();
  };

  const handleAddRoleModel = (flag: boolean) => {
    setIsAddRole(flag);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Role Management
      </Typography>
      <Typography variant="body1" paragraph>
        Manage your system roles and their permissions here.
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" gutterBottom>
          All Roles <Box display="inline" sx={{ color: "#817878" }}>{Roles.length}</Box>
        </Typography>
        <Box display="flex" sx={{ gap: 2 }}>
          <SearchBar />
          <ActionButtons handleAddModel={handleAddRoleModel} addLabel="Add Role" />
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Roles.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row: RoleData, index: number) => (
              <RoleRow
                key={index}
                row={row}
                index={index}
                anchorEl={anchorEl}
                selectedRoleIndex={selectedRoleIndex}
                handleClick={handleClick}
                handleClose={handleClose}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Section */}
      <PaginationControls
        page={page}
        rowsPerPage={rowsPerPage}
        totalItems={Roles.length}
        onChangePage={handleChangePage}
      />

      <AddRole open={isAddRole} handleAddRoleModel={handleAddRoleModel} />
    </div>
  );
};

export default RolesTable;
