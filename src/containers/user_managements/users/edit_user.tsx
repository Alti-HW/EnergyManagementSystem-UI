import {
  Alert,
  Box,
  Button,
  DialogActions,
  Divider,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "./types";
import UserAvatar from "./user_avatar";
import { useMemo, useState } from "react";
import { userActions } from "../../../actions/users";
import RoleMap from "./roles.map";
import { useLoader } from "../../../components/ui_components/full_page_loader.ui";
import { useSnackbar } from "../../../components/ui_components/alert.ui";

interface EditUserProps {
  onCancel: () => void;
  user?: User | any;
  usersRolesList: any;
  fetchUsers: any;
  availableRoles: any;
}

const EditUser = ({ onCancel, user, usersRolesList, fetchUsers, availableRoles }: EditUserProps) => {
  const [userData, setUserData] = useState<User>({
    ...user,
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    roles: user?.roles ?? [],
  });

  const [rolesData, setRolesData] = useState({ newlySelected: [], untickedRoles: [] });
  const { showLoader, hideLoader } = useLoader();
  const { showSnackbar } = useSnackbar()

  const [errors, setErrors] = useState<{ firstName: string; lastName: string }>({ firstName: "", lastName: "" });

  const userSelectedRoles = useMemo(() => usersRolesList.get(user.id), [user.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({ firstName: "", lastName: "" });

    // Validation for first name and last name
    if (!userData.firstName.trim()) {
      setErrors((prev) => ({ ...prev, firstName: "First Name is required" }));
      return;
    }
    if (!userData.lastName.trim()) {
      setErrors((prev) => ({ ...prev, lastName: "Last Name is required" }));
      return;
    }
    // if (!/^[A-Za-z\s]+$/.test(userData.firstName)) {
    //   setErrors((prev) => ({ ...prev, firstName: "First Name must contain only letters and spaces" }));
    //   return;
    // }
    // if (!/^[A-Za-z\s]+$/.test(userData.lastName)) {
    //   setErrors((prev) => ({ ...prev, lastName: "Last Name must contain only letters and spaces" }));
    //   return;
    // }

    showLoader();

    try {
      if (rolesData.newlySelected && rolesData.newlySelected?.length > 0) {
        await updateRolesForUser(rolesData.newlySelected, 'add');
      }

      if (rolesData.untickedRoles && rolesData.untickedRoles?.length > 0) {
        await updateRolesForUser(rolesData.untickedRoles, 'remove');
      }

      if (!(userData.firstName !== user?.firstName || userData?.lastName !== user?.lastName)) {
        if (rolesData?.newlySelected?.length > 0 || rolesData?.untickedRoles?.length > 0) {
          showSnackbar("User Roles updation success", "success");
        } else {
          showSnackbar("Please update fields before submitting", "warning");
          return
        }
        refreshUsers()
        return;
      }

      await userActions.updateUser(userData);
      showSnackbar("User updated successfully!", "success");
      refreshUsers()
    } catch (error) {
      showSnackbar("Error updating user!", "error");
    } finally {
      hideLoader();
    }
  };

  const refreshUsers = async () => {
    await fetchUsers();
    onCancel()
  }

  const onRoleChange = ({ newlySelected, untickedRoles }: any) => {
    setRolesData({ newlySelected, untickedRoles });
  };

  const updateRolesForUser = async (roles: any, action: 'add' | 'remove') => {
    const userData = {
      userId: user.id,
      roleRepresentation: [...roles],
    };

    const actionMethod = action === 'add' ? userActions.addRolesToUser : userActions.removeRolesFromUser;

    try {
      await actionMethod(userData);
    } catch (error) {
      console.error(`Error while ${action} roles:`, error);
      throw error
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", mb: 2, alignItems: "center" }}>
        <Typography sx={{ fontSize: "16px", flex: 1 }}>Edit User</Typography>

        <IconButton
          sx={{
            height: "fit-content",
            marginTop: "-10px",
            marginRight: "-10px",
          }}
          onClick={onCancel}
        >
          <CloseIcon sx={{ width: "20px", height: "20px", color: "#000" }} />
        </IconButton>
      </Box>

      {user && (
        <UserAvatar
          firstName={user?.firstName}
          lastName={user?.lastName}
          email={user?.email}
        />
      )}
      <Divider sx={{ margin: "16px -16px" }} />

      <Box>
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: "12px", width: "28%" }}>Name</Typography>
          <Box display="flex" justifyContent="space-between" gap={2}>
            <TextField
              label="First Name"
              variant="outlined"
              margin="normal"
              value={userData?.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              margin="normal"
              value={userData?.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: "12px", width: "30%" }}>Email</Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData?.email}
            disabled
          />
        </Box>

        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: "12px", width: "30%" }}>User Name</Typography>
          <TextField
            label="User Name"
            disabled
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData?.firstName}
          />
        </Box>

        <Divider sx={{ padding: "16px -16px" }} />

        <Box display="flex" alignItems="center" sx={{ mb: 2, mt: 4 }}>
          <Typography sx={{ fontSize: "12px", width: "30%" }}>Roles Mapping</Typography>
          <FormControl fullWidth>
            <RoleMap roles={availableRoles} userSelectedRoles={userSelectedRoles} onRoleChange={onRoleChange} />
          </FormControl>
        </Box>
      </Box>

      <DialogActions >
        <Button variant="outlined" color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          loadingPosition="end"
          sx={{ ml: 2 }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </>
  );
};

export default EditUser;
