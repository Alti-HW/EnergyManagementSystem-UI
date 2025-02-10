import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { userActions } from "../../../actions/users";
import CloseIcon from "@mui/icons-material/Close";

interface EditUserProps {
  onCancel: () => void;
  user: any;
  fetchUsers: any
}
const DeleteUser = ({ onCancel, user, fetchUsers }: EditUserProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    userActions
      .deleteAUser(user?.id)
      .then((response) => {
        fetchUsers()
        setResponseMessage("User Updation successfully!");
      })
      .catch((error) => {
        setResponseMessage("Error on Updating User!");
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      });
  };
  return (
    <Box
      component={Paper}
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
      <IconButton
        sx={{
          height: "fit-content",
          position: "absolute",
          right: "16px",
        }}
        onClick={onCancel}
      >
        <CloseIcon sx={{ width: "20px", height: "20px", color: "#000" }} />
      </IconButton>
      {responseMessage === "" && (
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          Do you really want to delete {user?.firstName} {user.lastName}
        </Typography>
      )}

      {responseMessage && (
        <Alert
          severity={responseMessage.includes("success") ? "error" : "success"}
          sx={{ mb: 2, mt: 4, ml: 2, mr: 2 }}
        >
          {responseMessage}
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          mt: 4,
          mb: 2,
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={responseMessage === "" ? handleSubmit : onCancel}
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
          {responseMessage === ""
            ? "Delete"
            : responseMessage.includes("success")
              ? "Continue"
              : "Cancel"}
        </Button>
      </Box>
    </Box>
  );
};
export default DeleteUser;
