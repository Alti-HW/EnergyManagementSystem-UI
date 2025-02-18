import { Box, Button, Dialog, DialogContent, IconButton, Modal, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchBar from "./search_bar";
import { useEffect, useState } from "react";
import { User } from "./types";
import UsersTable from "./users_table";
import { userActions } from "../../../actions/users";
import AddUser from "./add_user";
import EditUser from "./edit_user";
import Userlayout from "./layouts/users.layout";
import rolesActions from "../../../actions/roles";
import { useConfirmationDialog } from "../../../components/ui_components/confirmation_dialog.ui";
import { useLoader } from "../../../components/ui_components/full_page_loader.ui";
import FeatureAccessControl from "../../../authorization/feature.access.control";
import userAccess from "../../../authorization/user.access.constants";
import { useUser } from "../../../context/user.context";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState<User[] | any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [userAction, setUserAction] = useState("");
  const [activeUserIndex, setActiveUserIndex] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [userRoles, setUserRoles] = useState(new Map())
  const [availableRoles, setAvailableRoles] = useState([]);
  const [userFilteredRoles, setUserFilteredRoles] = useState(new Map())
  const [permissions, setPermissions] = useState([])
  const { openDialog } = useConfirmationDialog();
  const { showLoader, hideLoader } = useLoader();
  const [tableLoader, setTableLoader] = useState(false)
  const { user } = useUser();


  const fetchUsers = () => {
    return userActions.getUsers().then((res: any) => {
      if (res) {
        const allUsers = filterMyAccount(res?.data)
        setAllUsers(allUsers);
        setUsers(allUsers);
      }
    });
  }

  const fetchPermissions = async () => {
    const perms = await rolesActions.getAllPermissions()
    setPermissions(perms?.data)
  }

  useEffect(() => {
    setTableLoader(false)
    fetchUsers()
    fetchPermissions()
    rolesActions.getAllRoles().then((res: any) => {
      setAvailableRoles(res?.data || []);
    })
    setTableLoader(false)
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      const usersRolesList: any = new Map();
      const rolesInfo: any = new Map(); // To store role info and user count in a single map
      let rolesFetched = 0; // Track how many roles have been fetched
      const totalUsers = allUsers.length;

      allUsers.forEach((user: any) => {
        userActions.getAssignedRolesForUser(user.id).then((res: any) => {
          const roles = res?.data?.clientMappings?.EMS?.mappings || [];
          usersRolesList.set(user.id, roles);
          rolesFetched++;

          // Loop through the roles assigned to this user
          roles.forEach((role: any) => {
            // If the role is not yet in the map, add it with user count and role details
            if (!rolesInfo.has(role.id)) {
              rolesInfo.set(role.id, {
                role: role,
                userCount: 0
              });
            }

            // Update the user count for the role
            const roleData = rolesInfo.get(role.id);
            roleData.userCount += 1;

            // Optionally, update the role's data if needed (e.g., overwrite or modify)
            rolesInfo.set(role.id, roleData);
          });

          // Once all roles are fetched, update the state
          if (rolesFetched === totalUsers) {
            setUserRoles(usersRolesList);
            setUserFilteredRoles(rolesInfo)
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

  const handleUserEdit = (index: any) => {
    setOpenModal(true);
    setUserAction("edit");
    setActiveUserIndex(index);
  };
  const handleUserDelete = async (index: number) => {
    const userResponse = await openDialog(
      `Do you really want to delete ${users[index]?.firstName} ${users[index].lastName}`, // message
      'Delete User' // title
    );

    if (userResponse) {
      showLoader()
      await userActions.deleteAUser(users[index]?.id)
      await fetchUsers()
      hideLoader()
    }
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

  const handleDelete = async () => {
    const userResponse = await openDialog(
      `Do you really want to delete selected users`, // message
      'Delete User' // title
    );
    if (userResponse) {
      showLoader()
      await Promise.all(selectedUsers.map(i => userActions.deleteAUser(i)));
      setSelectedUsers([])
      fetchUsers()
      hideLoader()
    }
  };

  const getTotalInvitedUsers = () => {
    return users?.filter(elm => !elm.emailVerified).length
  }

  const findUserById = (id: string) => {
    return users.find((user: any) => user.id === id)
  }

  const filterMyAccount = (users: any) => {
    return users.filter((elm: any) => elm.email !== user.email)
  }
  return (
    <Box sx={{ p: 4, backgroundColor: "transparent" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Typography variant="h6" sx={{ flex: 1, color: "#6e6e6e" }}>Users</Typography>
        <SearchBar onChange={handleSearchChange} />
        <FeatureAccessControl requiredRoles={userAccess.ADD_USER}>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleOpenModal}
          >
            Invite User
          </Button>
        </FeatureAccessControl>

        <Button
          variant="outlined"
          color="warning"
          sx={{
            display: selectedUsers?.length > 0 ? "block" : "none",
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
      <Userlayout availableRoles={Array.from(userFilteredRoles.entries())} totalUsers={users?.length || 0} totalInvitedUsers={getTotalInvitedUsers}>
        <UsersTable
          tableLoader={tableLoader}
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
      </Userlayout>
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md">
        <DialogContent >
          {userAction === "add" && (
            <AddUser onCancel={handleCloseModal} onSubmit={handleUserAdd} availableRoles={availableRoles} permissions={permissions} />
          )}
          {userAction === "edit" && (
            <EditUser
              user={findUserById(activeUserIndex)}
              onCancel={handleCloseModal}
              usersRolesList={userRoles}
              fetchUsers={fetchUsers}
              availableRoles={availableRoles}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default Users;
