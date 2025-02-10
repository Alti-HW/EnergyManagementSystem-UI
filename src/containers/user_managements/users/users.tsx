import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchBar from "./search_bar";
import { useEffect, useState } from "react";
import { User } from "./types";
import UsersTable from "./users_table";
import { userActions } from "../../../actions/users";
import AddUser from "./add_user";
import EditUser from "./edit_user";
import DeleteUser from "./delete_user";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState<User[] | any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [userAction, setUserAction] = useState("");
  const [activeUserIndex, setActiveUserIndex] = useState(-1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [userRoles, setUserRoles] = useState(new Map())

  const fetchUsers = () => {
    userActions.getUsers().then((res: any) => {
      if (res) {
        setAllUsers(res?.data);
        setUsers(res?.data);
      }
    });
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      const usersRolesList = new Map();
      let rolesFetched = 0; // Track how many roles have been fetched
      const totalUsers = allUsers.length;

      allUsers.forEach((user: any) => {
        userActions.getAssignedRolesForUser(user.id).then((res: any) => {

          usersRolesList.set(user.id, res?.data?.clientMappings?.EMS?.mappings || []);
          rolesFetched++;

          // Once all roles are fetched, update the state
          if (rolesFetched === totalUsers) {
            setUserRoles(usersRolesList);
          }
        });
      });
    }
  }, [allUsers]);


  useEffect(() => {
    if (allUsers?.length > 0 && searchText !== "") {
      let result = allUsers.filter(({ firstName, lastName }: any) => {
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
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event?.target?.value);
  };

  const handleUserSelect = (e: any, userId: string) => {
    setSelectedUsers((prevSelected) => {
      const updated = new Set(prevSelected);
      if (updated.has(userId)) {
        updated.delete(userId); // Deselect user if already selected
      } else {
        updated.add(userId); // Select user
      }
      return Array.from(updated);
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Select all users
      setSelectedUsers(Array.from(new Set(users.map((user: any) => user.id))));
    } else {
      // Deselect all users
      setSelectedUsers([]);
    }
    setSelectAll(e.target.checked);
  };

  const handleUserEdit = (index: number) => {
    setOpenModal(true);
    setUserAction("edit");
    setActiveUserIndex(index);
  };
  const handleUserDelete = (index: number) => {
    setOpenModal(true);
    setUserAction("delete");
    setActiveUserIndex(index);
  };
  const handleUserAdd = () => {
    fetchUsers()
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setUserAction("add");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUserAction("");
  };

  const handleDelete = () => { };
  return (
    <Box sx={{ p: 4, backgroundColor: "transparent" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ flex: 1 }}>Users {allUsers.length}</Typography>
        <SearchBar onChange={handleSearchChange} />
        <Button
          sx={{
            fontSize: "14px",
            textTransform: "none",
            backgroundColor: "#192142",
            color: "#fff",
            padding: "5px 8px",
            height: "35px",
            ml: 2,
          }}
          onClick={handleOpenModal}
        >
          Add User
        </Button>
        <Button
          sx={{
            fontSize: "14px",
            textTransform: "none",
            backgroundColor: "#192142",
            color: "#fff",
            padding: "5px 8px",
            height: "35px",
            ml: 2,
            display: selectedUsers?.length > 0 ? "block" : "none",
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
      <UsersTable
        users={users}
        total={allUsers.length}
        onSelect={handleUserSelect}
        onUserEdit={handleUserEdit}
        onUserDelete={handleUserDelete}
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
        selectedUsers={selectedUsers}
        usersRolesList={userRoles}
      />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box>
          {userAction === "add" && (
            <AddUser onCancel={handleCloseModal} onSubmit={handleUserAdd} />
          )}
          {userAction === "edit" && (
            <EditUser
              user={users[activeUserIndex]}
              onCancel={handleCloseModal}
              usersRolesList={userRoles}
              fetchUsers={fetchUsers}
            />
          )}
          {userAction === "delete" && (
            <DeleteUser
              user={users[activeUserIndex]}
              onCancel={handleCloseModal}
              fetchUsers={fetchUsers}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};
export default Users;
