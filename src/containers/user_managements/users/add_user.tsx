import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import {
  Alert,
  CircularProgress,
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

// Define types for form fields
interface IUserForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

interface AddUser {
  onCancel?: () => void;
  onSubmit?: () => void;
}

const AddUser: React.FC<AddUser> = ({ onCancel, onSubmit = () => {} }) => {
  // State for form data
  const [formData, setFormData] = useState<IUserForm>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  // State for error messages
  const [errors, setErrors] = useState<any>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  // State for API response
  const [responseMessage, setResponseMessage] = useState<string>("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const tempErrors = {
      firstName: formData.firstName ? "" : "First Name is required",
      lastName: formData.lastName ? "" : "Last Name is required",
      username: formData.username ? "" : "Username is required",
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
        let userData = {
          ...formData,
          emailVerified: false,
          enabled: true,
          totp: false,
          disableableCredentialTypes: [],
          requiredActions: [],
          notBefore: 0,
        };
        // Make API call to create user (mocked here using axios)
        setIsLoading(true);
        setResponseMessage("");
        const response = await userActions.createUser(userData);
        if (response) {
          setResponseMessage("User created successfully!");
          // Clear form data on success
          setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
          });
          setIsLoading(false);
        }
      } catch (error) {
        setResponseMessage("Error while creating user. Please try again.");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          onSubmit();
        }, 3000);
      }
    } else {
      setResponseMessage("Please fill in all required fields correctly.");
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
          }}
          onClick={onCancel}
        >
          <CloseIcon sx={{ width: "20px", height: "20px", color: "#000" }} />
        </IconButton>
      </Box>

      {/* Display success or error message */}
      {responseMessage && (
        <Alert
          severity={responseMessage.includes("success") ? "success" : "error"}
        >
          {responseMessage}
        </Alert>
      )}

      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          variant="outlined"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          sx={{
            fontSize: "14px",
            padding: "6px",

            "& .MuiOutlinedInput-input": {
              padding: "8px",
              fontSize: "14px",
              color: "#000",
            },
            "& .MuiInputLabel-root": {
              fontSize: "12px",
              color: "#000",
            },
            "& .MuiFormHelperText-root": {
              margin: "4px 0",
            },
          }}
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
          sx={{
            fontSize: "14px",
            padding: "6px",
            "& .MuiOutlinedInput-input": {
              padding: "8px",
              fontSize: "14px",
              color: "#000",
            },
            "& .MuiInputLabel-root": {
              fontSize: "12px",
              color: "#000",
            },
          }}
        />
        <TextField
          fullWidth
          label="Username"
          name="username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          sx={{
            fontSize: "14px",
            padding: "6px",
            "& .MuiOutlinedInput-input": {
              padding: "8px",
              fontSize: "14px",
              color: "#000",
            },
            "& .MuiInputLabel-root": {
              fontSize: "12px",
              color: "#000",
            },
          }}
        />
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          variant="outlined"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{
            fontSize: "14px",
            padding: "6px",
            "& .MuiOutlinedInput-input": {
              padding: "8px",
              fontSize: "14px",
              color: "#000",
            },
            "& .MuiInputLabel-root": {
              fontSize: "12px",
              color: "#000",
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "end", gap: "20px" }}>
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
            Create User
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default AddUser;
