import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import RolesTable from "./roles_table";
import { useEffect, useState } from "react";
import AddNewRole from "./add_role";
import axios from "axios";
import EditRole from "./edit_role";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useConfirmationDialog } from "../../../components/ui_components/confirmation_dialog.ui";
import { useLoader } from "../../../components/ui_components/full_page_loader.ui";
import rolesActions from "../../../actions/roles";
import { useSnackbar } from "../../../components/ui_components/alert.ui";
import FeatureAccessControl from "../../../authorization/feature.access.control";
import userAccess from "../../../authorization/user.access.constants";

const Roles = () => {
  const [openModal, setOpenModal] = useState(false);
  const [roleAction, setRoleAction] = useState("");
  const [rolesList, setRolesList] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<any>("");
  const [permissions, setPermissions] = useState([])
  const { openDialog } = useConfirmationDialog();
  const { showLoader, hideLoader } = useLoader();
  const { showSnackbar } = useSnackbar()

  const handleOpenModal = () => {
    setRoleAction("add");
    setOpenModal(true);
  };
  const handleCloseModal = (event?: any, message?: string) => {
    setRoleAction("");
    setOpenModal(false)
  };
  const fetchRoles = async () => {
    const roles = await rolesActions.getAllRoles();

    setRolesList(roles?.data);
  };

  const refetchRoles = () => {
    fetchRoles();
  };

  const fetchPermissions = async () => {
    const perms = await rolesActions.getAllPermissions()
    setPermissions(perms?.data)
  }

  useEffect(() => {
    refetchRoles()
    fetchPermissions()
  }, [])

  const handleEditRole = (id: string) => {
    setActiveIndex(id);
    setRoleAction("edit");
    setOpenModal(true);
  };

  const findRoleById = (id: string) => {
    return rolesList.find((role: any) => role.id === id)
  }

  const handleDeleteRole = async (index: number) => {
    const userResponse = await openDialog(
      `Do you really want to delete selected users`, // message
      'Delete User' // title
    );
    if (userResponse) {
      try {
        showLoader()
        await rolesActions.deletRole(rolesList[index].id)
        fetchRoles()
        showSnackbar("Role deleted", "success");
      } catch (error) {
        showSnackbar("Failed to create role", "error");
      }
      finally {
        hideLoader()
      }
    }
  };


  return (
    <Box sx={{ p: 4, backgroundColor: "transparent" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography sx={{ flex: 1, color: "#6e6e6e" }}>Roles </Typography>
        <FeatureAccessControl requiredRoles={userAccess.ADD_ROLE}>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleOpenModal}
          >
            Create Role
          </Button>
        </FeatureAccessControl>
      </Box>
      <RolesTable
        roles={rolesList}
        permissions={permissions}
        onRoleEdit={handleEditRole}
        onRoleDelete={handleDeleteRole}
      />
      {openModal && roleAction === "add" && (
        <AddNewRole
          open={true}
          onCancel={handleCloseModal}
          onRoleCreation={refetchRoles}
          permissions={permissions}
        />
      )}
      {openModal && roleAction === "edit" && (
        <EditRole
          open={true}
          onCancel={handleCloseModal}
          onRoleUpdate={refetchRoles}
          role={findRoleById(activeIndex)}
          permissions={permissions}
        />
      )}
    </Box>
  );
};

export default Roles;
