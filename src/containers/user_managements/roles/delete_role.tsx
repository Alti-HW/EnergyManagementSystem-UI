import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Typography, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface ResponsiveDialogProps {
  open: boolean;
  onCancel: (e?: any, message?: string) => void;
  onRoleDeletion: () => void;
  role: any;
}

const DeleteRole: React.FC<ResponsiveDialogProps> = ({
  open,
  onCancel = () => {},
  onRoleDeletion = () => {},
  role = {},
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState<string>("");

  const handleSubmit = () => {
    setIsLoading(true);
    const updateRole = async () => {
      const updated: any = await axios.delete(
        `http://localhost:5000/api/roles/delete?roleId=${role.id}`
      );
      onRoleDeletion();
      onCancel(undefined, updated?.data?.message);
    };
    try {
      updateRole();
    } catch (err) {
      setIsLoading(false);
      onCancel(undefined, "Unable to delete the Role");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(responseMessage);
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      aria-labelledby="add-role-dialog"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
          padding: 4,
          minWidth: 400,
        },
      }}
    >
      <IconButton
        sx={{
          width: "fit-content",
          position: "absolute",
          right: "16px",
          top: "16px",
        }}
        onClick={onCancel}
      >
        <CloseIcon sx={{ width: "20px", height: "20px", color: "#000" }} />
      </IconButton>

      <DialogContent sx={{ paddingTop: 2, paddingBottom: 3 }}>
        {/* {responseMessage && (
          <Alert
            severity={responseMessage.includes("success") ? "success" : "error"}
          >
            {responseMessage}
          </Alert>
        )} */}
        {/* {responseMessage === "" && ( */}
        <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
          Do you want to delete {role.name} role
        </Typography>
        {/* )} */}
      </DialogContent>
      {/* {responseMessage === "" && ( */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#192142",
            padding: "8px",
            textTransform: "none",
            fontSize: "12px",
            width: "150px",
            mt: 2,

            "&.Mui-disabled": {
              backgroundColor: "#192142",
              color: "#fff",
              opacity: 0.9,
            },
          }}
          loading={isLoading}
          loadingPosition="end"
        >
          Delete
        </Button>
      </Box>
      {/* )} */}
    </Dialog>
  );
};

export default DeleteRole;
