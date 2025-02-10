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
import { useEffect, useState } from "react";
import { userActions } from "../../../actions/users";

interface EditUserProps {
  onCancel: () => void;
  user?: User;
}
const EditUser = ({ onCancel, user }: EditUserProps) => {
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

  useEffect(() => {
    setAvailableRoles([]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    userActions
      .updateUser(userData)
      .then((response) => {
        setResponseMessage("User Updation successfully!");
      })
      .catch((error) => {
        setResponseMessage("Error on Updating User!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleChange = (event: SelectChangeEvent<typeof userData.roles>) => {
    const {
      target: { value },
    } = event;
    setUserData((data) => ({
      ...data,
      roles: typeof value === "string" ? value.split(",") : value,
    }));
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
          severity={responseMessage.includes("success") ? "error" : "success"}
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
            <InputLabel
              sx={{
                top: "-10px",
                fontSize: "14px",
                "&.Mui-focused": {
                  top: 0,
                },
              }}
              id="demo-multiple-checkbox-label"
            >
              Tag
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={userData.roles}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              // MenuProps={MenuProps}
              sx={{ "& .MuiSelect-multiple": { padding: "6px" } }}
            >
              {availableRoles.map(({ name, value, id }) => (
                <MenuItem key={name} value={value}>
                  <Checkbox checked={userData?.roles?.includes(name)} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
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
