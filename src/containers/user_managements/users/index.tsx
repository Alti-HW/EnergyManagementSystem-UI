import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Box,
  TableBody,
  Skeleton,
  Checkbox,
  IconButton,
  Avatar,
  Modal,
} from "@mui/material";
import SearchBar from "./search_bar";
import ActionButtons from "./actions_buttons";
import UserRow from "./user_row";
import PaginationControls from "./pagination_controls";
import { userActions } from "../../../actions/users";
import { useNavigate } from "react-router";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddUser from "./add_user";
import EditUser from "./edit_user";
import DeleteUser from "./delete_user";
interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  enabled: boolean;
  created: string;
}

const UserManagementTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (allUsers?.length > 0 && searchText !== "") {
      let result = allUsers.filter(({ firstName, lastName }) => {
        return `${firstName} ${lastName}`
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setUsers(result);
    }
    if (searchText === "") {
      setUsers(allUsers);
    }
  }, [searchText]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleAddUserModel = () => {
    setOpenAddUserModal(true);
  };

  const handleAddUserModalClose = () => {
    setOpenAddUserModal(false);
  };

  useEffect(() => {
    userActions.getUsers().then((res: any) => {
      if (res) {
        setAllUsers(res);
        setUsers(res);
      }
    });
  }, []);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event?.target?.value);
  };

  const [activeRowIndex, setActiveRowIndex] = useState(-1);
  const [showDetails, setShowDetails] = useState(false);
  const handleRowClick = (index: number) => {
    setShowDetails(index !== activeRowIndex);
    setActiveRowIndex((currentIndex) => (index !== currentIndex ? index : -1));
  };

  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const handleUserEdit = (index: number) => {
    setOpenEditUserModal(true);
  };
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const handleUserDelete = (index: number) => {
    setOpenDeleteUserModal(true);
    setSelectedUser(users[index]);
  };
  return (
    <Box sx={{ padding: "10px 0 10px 2px" }}>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ flex: 1 }}>
          Users {users.length}
          <IconButton
            sx={{ color: "#192142", padding: 0, pl: 0.5, marginTop: "-2px" }}
            onClick={handleAddUserModel}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Typography>
        <SearchBar onChange={handleSearchChange} />
      </Box>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead sx={{ boxShadow: "0 20px 20px -20px rgba(0, 0, 0, 0.5)" }}>
            <TableRow>
              <TableCell
                sx={{ padding: 0.5, width: "45px", textAlign: "center" }}
              >
                <Checkbox
                  sx={{ transform: "scale(0.8)" }}
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ padding: 0.5, width: "30%" }}>Name</TableCell>
              <TableCell sx={{ padding: 0.5, width: "30%" }}>Role</TableCell>
              <TableCell sx={{ padding: 0.5, width: "20%" }}>
                Date Added
              </TableCell>
              <TableCell sx={{ padding: 0.5 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Box sx={{ maxHeight: "470px", overflowY: "auto" }}>
          <Table sx={{ tableLayout: "fixed" }}>
            <TableBody>
              {users.length <= 0
                ? [1, 2, 3].map((index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: 0.5 }}>
                        <Checkbox />
                      </TableCell>
                      <TableCell sx={{ padding: 0.5 }}>
                        <Skeleton variant="text" width="150px" />
                      </TableCell>
                      <TableCell sx={{ padding: 0.5 }}>
                        <Skeleton variant="text" width="60px" />
                      </TableCell>
                      <TableCell sx={{ padding: 0.5 }}>
                        <Skeleton variant="text" width="60px" />
                      </TableCell>
                      <TableCell sx={{ padding: 0.5 }}>
                        <Skeleton variant="text" width="60px" />
                      </TableCell>
                    </TableRow>
                  ))
                : users
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map(
                      (row: any, index: number) =>
                        row.email && (
                          <UserRow
                            key={index}
                            row={row}
                            index={index}
                            isSelected={selectedUsers.has(row.id)}
                            onSelect={() => handleSelectUser(row.id)}
                            activeRowIndex={activeRowIndex}
                            showDetails={showDetails}
                            onRowClick={handleRowClick}
                            onUserDelete={handleUserDelete}
                            onUserEdit={handleUserEdit}
                          />
                        )
                    )}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      {/* Pagination Section */}
      <PaginationControls
        page={page}
        rowsPerPage={rowsPerPage}
        totalItems={users.length}
        onChangePage={handleChangePage}
      />

      {openAddUserModal && <AddUser onCancel={handleAddUserModalClose} />}
      {/* {openEditUserModal && (
        <EditUser onCancel={() => setOpenEditUserModal(false)} />
      )} */}
      {/* {openDeleteUserModal && (
        <DeleteUser
          user={selectedUser}
          onCancel={() => setOpenDeleteUserModal(false)}
        />
      )} */}
    </Box>
  );
};

export default UserManagementTable;
