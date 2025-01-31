import React, { useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, Typography, Box, TableBody } from '@mui/material';
import Users from '../users.json'; // Assume the user data is imported
import SearchBar from './search_bar';
import ActionButtons from './actions_buttons';
import UserRow from './user_row';
import PaginationControls from './pagination_controls';
import AddUser from './add_user'

interface UserAccess {
  access: string[];
  dateAdded: string;
  name: string;
}

const UserManagementTable: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [isAddUser, setIsAddUser] = React.useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUserIndex(null);
  };

  const handleEdit = () => {
    console.log('Edit user at index:', selectedUserIndex);
    handleClose();
  };

  const handleDelete = () => {
    console.log('Delete user at index:', selectedUserIndex);
    handleClose();
  };

  const handleAddUserModel = (flag: boolean) => {
    setIsAddUser(flag)
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        User Management 
      </Typography>
      <Typography variant="body1" paragraph>
        Manage your team members and their account permissions here.
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" gutterBottom>
          All Users  <Box display="inline" sx={{color:"#817878"}}>{Users.length}</Box>
        </Typography>
        <Box display="flex" sx={{ gap: 2 }}>
          <SearchBar />
          <ActionButtons handleAddUserModel={handleAddUserModel} />
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Building</TableCell>
              <TableCell>Floor No</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Users.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row: any, index: number) => (
              <UserRow
                key={index}
                row={row}
                index={index}
                anchorEl={anchorEl}
                selectedUserIndex={selectedUserIndex}
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
        totalItems={Users.length}
        onChangePage={handleChangePage}
      />

      <AddUser open={isAddUser} handleAddUserModel={handleAddUserModel} />
    </div>
  );
};

export default UserManagementTable;
