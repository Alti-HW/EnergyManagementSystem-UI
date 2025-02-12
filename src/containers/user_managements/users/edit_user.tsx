import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "./types";
import UserAvatar from "./user_avatar";
import { useEffect, useMemo, useState } from "react";
import { userActions } from "../../../actions/users";
import RoleMap from "./roles.map";

interface EditUserProps {
  onCancel: () => void;
  user?: User | any;
  usersRolesList: any,
  fetchUsers: any
}

const EditUser = ({ onCancel, user, usersRolesList, fetchUsers }: EditUserProps) => {
  const [userData, setUserData] = useState<User>({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    roles: user?.roles ?? [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [availableRoles, setAvailableRoles] = useState([]);
  const [rolesData, setRolesData] = useState({ newlySelected: [], untickedRoles: [] });

  const userSelectedRoles = useMemo(() => usersRolesList.get(user.id)
    , [user.id])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (rolesData.newlySelected && rolesData.newlySelected?.length > 0) {
        await updateRolesForUser(rolesData.newlySelected, 'add');
      }

      if (rolesData.untickedRoles && rolesData.untickedRoles?.length > 0) {
        await updateRolesForUser(rolesData.untickedRoles, 'remove');
      }

      if (!(userData.firstName !== user?.firstName || userData?.lastName !== user?.lastName)) {
        if (rolesData?.newlySelected?.length > 0 || rolesData?.untickedRoles?.length > 0) {
          setResponseMessage("User Roles updation success")
        } else {
          setResponseMessage("please update  fields before submiting")
        }
        return
      }

      await userActions.updateUser(userData);
      setResponseMessage("User updated success!");
    } catch (error) {
      setResponseMessage("Error updating user!");
    } finally {
      fetchUsers()
      setIsLoading(false);
    }
  };


  // const handleChange = (event: SelectChangeEvent<typeof userData.roles>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setUserData((data) => ({
  //     ...data,
  //     roles: typeof value === "string" ? value.split(",") : value,
  //   }));
  // };

  const onRoleChange = ({ newlySelected, untickedRoles }: any) => {
    setRolesData({ newlySelected, untickedRoles });
  };

  useEffect(() => {
    userActions.getAvailableRolesForUser(user.id).then((res: any) => {
      setAvailableRoles(res?.data || []);
    })
  }, [])

  const updateRolesForUser = async (roles: any, action: 'add' | 'remove') => {
    const userData = {
      userId: user.id,
      roleRepresentation: [...roles]
    };

    const actionMethod = action === 'add' ? userActions.addRolesToUser : userActions.removeRolesFromUser;

    try {
      await actionMethod(userData);
    } catch (error) {
      console.error(`Error while ${action} roles:`, error);
    }
  };


  return (
    <Paper
      sx={{
        minWidth: "500px",
        margin: "auto",
        padding: 2,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Box sx={{ display: "flex", mb: 2 }}>
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
      {responseMessage && (
        <Alert
          severity={responseMessage.includes("success") ? "success" : "error"}
          onClose={() => {
            setResponseMessage("");
          }}
          sx={{ mb: 2 }}
        >
          {responseMessage}
        </Alert>
      )}
      {user && (
        <UserAvatar
          firstName={user?.firstName}
          lastName={user?.lastName}
          email={user?.email}
        />
      )}
      <Divider sx={{ margin: "16px -16px" }} />
      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", width: "30%" }}>Name</Typography>
          <Box sx={{ width: "70%" }}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData?.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
              sx={{
                fontSize: "14px",
                padding: "6px",
                boxSizing: "border-box",
                paddingLeft: "3px",

                "& .MuiOutlinedInput-input": {
                  padding: "6px 8px 12px",
                  fontSize: "14px",
                  color: "#000",
                },

                "&.MuiFormControl-root": {
                  margin: 0,
                  width: "50%",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData?.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              sx={{
                fontSize: "14px",
                padding: "6px",
                boxSizing: "border-box",

                "& .MuiOutlinedInput-input": {
                  padding: "8px",
                  fontSize: "14px",
                  color: "#000",
                },
                "&.MuiFormControl-root": {
                  margin: 0,
                  width: "50%",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", width: "30%" }}>Email</Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData?.email}
            disabled
            sx={{
              fontSize: "14px",
              padding: "6px",

              "& .MuiOutlinedInput-input": {
                padding: "6px 8px 12px",
                fontSize: "14px",
                color: "#000",
              },

              "&.MuiFormControl-root": {
                margin: 0,
                width: "70%",
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", width: "30%" }}>
            User name
          </Typography>
          <TextField
            label="User name"
            disabled
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData?.firstName}
            sx={{
              fontSize: "14px",
              padding: "6px",

              "& .MuiOutlinedInput-input": {
                padding: "6px 8px 12px",
                fontSize: "14px",
                color: "#000",
              },

              "&.MuiFormControl-root": {
                margin: 0,
                width: "70%",
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
            }}
          />
        </Box>
        <Divider sx={{ padding: "16px -16px" }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", width: "30%" }}>
            Roles mapping
          </Typography>
          <FormControl sx={{ width: "70%" }}>
            <RoleMap roles={[...availableRoles]} userSelectedRoles={userSelectedRoles} onRoleChange={onRoleChange} />
          </FormControl>
        </Box>
      </Stack>
      <Box sx={{ display: "flex", mt: 4, justifyContent: "end", gap: "20px" }}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={onCancel}
          sx={{
            border: "none",
            color: "#000",
            width: "fit-content",
            textTransform: "none",
            fontSize: "12px",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#192142",
            padding: "8px",
            width: "fit-content",
            textTransform: "none",
            fontSize: "12px",

            "&.Mui-disabled": {
              backgroundColor: "#192142",
              color: "#fff",
              opacity: 0.9,
            },
          }}
          // disabled={isLoading}
          loading={isLoading}
          loadingPosition="end"
        >
          Save changes
        </Button>
      </Box>
    </Paper>
  );
};
export default EditUser;
