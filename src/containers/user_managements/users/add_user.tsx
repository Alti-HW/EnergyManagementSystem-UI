import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import {
  Alert,
  CircularProgress,
  DialogActions,
  Icon,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import { userActions } from "../../../actions/users";
import Spinner from "../../../components/dashboard/components/Spinner";
import CloseIcon from "@mui/icons-material/Close";
import CheckboxesTags from '../roles/multi_select'
import RolesTable from "../roles/roles_table";
import RoleMap from "./roles.map";
import { permissionsMockData } from "../roles/mockData";
import { useLoader } from "../../../components/ui_components/full_page_loader.ui";
import { useSnackbar } from "../../../components/ui_components/alert.ui";

// Define types for form fields
interface IUserForm {
  firstName: string;
  lastName: string;
  email: string;
  id?: string
}

interface AddUser {
  onCancel?: any;
  onSubmit?: () => void;
  availableRoles: any,
  permissions: any
}

const AddUser: React.FC<AddUser> = ({ onCancel, onSubmit = () => { }, availableRoles = [], permissions = [] }) => {
  // State for form data
  const [formData, setFormData] = useState<IUserForm>({
    firstName: "",
    lastName: "",
    email: "",
  });

  // State for error messages
  const [errors, setErrors] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [rolesData, setRolesData] = useState<any>({ newlySelected: [], untickedRoles: [] });
  const { showLoader, hideLoader } = useLoader()
  const { showSnackbar } = useSnackbar()

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRoleChange = ({ newlySelected, untickedRoles }: any) => {
    setRolesData({ newlySelected, untickedRoles });
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const tempErrors = {
      firstName: formData.firstName ? "" : "First Name is required",
      lastName: formData.lastName ? "" : "Last Name is required",
      email: formData.email
        ? /\S+@\S+\.\S+/.test(formData.email)
          ? ""
          : "Invalid email address"
        : "Email is required",
    };

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Make API call to create user (mocked here using axios)
        showLoader()
        const response = await userActions.createUser(formData);
        if (response) {
          if (rolesData.newlySelected?.length === 1) {
            const mappedRole = {
              "userId": response?.data?.userId,
              "roleRepresentation": [
                {
                  "id": rolesData.newlySelected[0].id,
                  "name": rolesData.newlySelected[0].name,
                  "description": rolesData.newlySelected[0].description,
                  "composite": rolesData.newlySelected[0].composite,
                  "clientRole": rolesData.newlySelected[0].clientRole
                }
              ]
            }
            await userActions.addRolesToUser(mappedRole);
          }
          showSnackbar("User invitaion sent successfully!", "success")
          // Clear form data on success
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
          });
          hideLoader()
          onCancel()
          onSubmit();
        }
      } catch (error: any) {
        showSnackbar(error?.response?.data?.ErrorMessage || "Error while creating user. Please try again.", "error")
      } finally {
        hideLoader()
      }
    } else {
      showSnackbar("Please fill in all required fields correctly.", "error")
    }
  };



  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontSize: "16px", mb: 2, pl: 1, flex: 1 }}>
          Add new User
          <Typography sx={{ fontSize: "10px", color: "#777a7a" }}>
            Fill all mandatory fields
          </Typography>
        </Typography>
        <IconButton
          sx={{
            height: "fit-content",
            marginTop: "-10px",
            marginRight: "-10px",
            border: "1px solid #b7adad",
            borderRadius: "50%"
          }}
          onClick={onCancel}
        >
          <CloseIcon sx={{ width: "20px", height: "20px", color: "#000" }} />
        </IconButton>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />

          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Box>

        <TextField
          label="Email Address"
          name="email"
          variant="outlined"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Box>
      <Box sx={{ mt: 2 }} >
        <RoleMap newMode roles={availableRoles} userSelectedRoles={[]} onRoleChange={onRoleChange} />
      </Box >
      <Box sx={{ mt: 2, maxHeight: "252px", overflowY: "auto", mb: 2 }}>
        <RolesTable
          viewMode
          roles={availableRoles}
          permissions={permissions}
          selectedRole={rolesData?.newlySelected?.length > 0 ? rolesData?.newlySelected[0] : {}}
        />
      </Box>
      <DialogActions>
        <Button
          color="primary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Send Invite
        </Button>
      </DialogActions>
    </>
  );
};

export default AddUser;
