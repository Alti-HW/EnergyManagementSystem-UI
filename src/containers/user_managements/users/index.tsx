import React, { useEffect, useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, Typography, Box, TableBody, Skeleton, Checkbox } from '@mui/material';
import SearchBar from './search_bar';
import ActionButtons from './actions_buttons';
import UserRow from './user_row';
import PaginationControls from './pagination_controls';
import { userActions } from '../../../actions/users';
import { useNavigate } from 'react-router';



const UserManagementTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<any>([])
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const rowsPerPage = 10;

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };


  const handleAddUserModel = (flag: boolean) => {
    navigate("/userManagement/user/add_user")
  }

  useEffect(() => {
    userActions.getUsers().then((res: any) => {
      if (res) {
        setUsers(res)
      }
    })
  }, [])

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prevSelected) => {
      const updated = new Set(prevSelected);
      if (updated.has(userId)) {
        updated.delete(userId); // Deselect user if already selected
      } else {
        updated.add(userId); // Select user
      }
      return updated;
    });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Select all users
      setSelectedUsers(new Set(users.map((user: any) => user.id)));
    } else {
      // Deselect all users
      setSelectedUsers(new Set());
    }
    setSelectAll(event.target.checked);
  };

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
          All Users  <Box display="inline" sx={{ color: "#817878" }}>{users.length}</Box>
        </Typography>
        <Box display="flex" sx={{ gap: 2 }}>
          <SearchBar />
          <ActionButtons handleAddModel={handleAddUserModel} addLabel="Create User" isDelete={selectedUsers.size > 0} />
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Checkbox checked={selectAll}
                onChange={handleSelectAll} /></TableCell>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length <= 0 ? (
              [1, 2, 3].map((index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width="40px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="150px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="60px" />
                  </TableCell>
                </TableRow>
              ))
            )
              :
              users.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row: any, index: number) => (
                row.email &&
                <UserRow
                  key={index}
                  row={row}
                  index={index}
                  isSelected={selectedUsers.has(row.id)}
                  onSelect={() => handleSelectUser(row.id)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Section */}
      <PaginationControls
        page={page}
        rowsPerPage={rowsPerPage}
        totalItems={users.length}
        onChangePage={handleChangePage}
      />
    </div>
  );
};

export default UserManagementTable;
