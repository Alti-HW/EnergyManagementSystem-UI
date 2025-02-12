import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface ResponsiveDialogProps {
  open: boolean;
  onCancel: () => void;
  onRoleUpdate: () => void;
  role: any;
}

const EditRole: React.FC<ResponsiveDialogProps> = ({
  open,
  onCancel = () => {},
  onRoleUpdate = () => {},
  role = {},
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = React.useState(false);
  const [roleData, setRoleData] = React.useState<any>({
    roleName: role?.name ?? "",
    roleDescription: role?.description ?? "",
  });
  const [responseMessage, setResponseMessage] = React.useState<string>("");
  const handleSubmit = () => {
    setIsLoading(true);
    const updateRole = async () => {
      const updated: any = await axios.post(
        "http://localhost:5000/api/roles/create",
        {
          name: roleData?.roleName,
          description: roleData?.roleDescription,
          composite: true,
          clientRole: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onRoleUpdate();
      setResponseMessage(updated?.data?.message);
    };
    try {
      updateRole();
    } catch (err) {
      setResponseMessage("Error Unable to create role");
    } finally {
      setIsLoading(false);
      console.log("compleated");
      setRoleData({
        roleName: "",
        roleDescription: "",
      });
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
        },
        minWidth: 400,
      }}
    >
      <Box sx={{ display: "flex", mb: 2, minWidth: 500 }}>
        <Typography sx={{ fontSize: "16px", flex: 1 }}>Edit Role</Typography>

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
      <Snackbar
        open={responseMessage !== ""}
        autoHideDuration={3000}
        onClose={() => setResponseMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={responseMessage.includes("success") ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {responseMessage}
        </Alert>
      </Snackbar>

      <DialogContent sx={{ paddingTop: 2, paddingBottom: 3 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "12px", width: "30%" }}>
              Role Name
            </Typography>
            <TextField
              label="Role Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={roleData?.roleName}
              onChange={(e) =>
                setRoleData({ ...roleData, roleName: e.target.value })
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
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "12px", width: "30%" }}>
              Role Description
            </Typography>
            <TextField
              multiline
              rows={3}
              maxRows={6}
              label="Role description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={roleData?.roleDescription}
              onChange={(e) =>
                setRoleData({ ...roleData, roleDescription: e.target.value })
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
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
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
          loading={isLoading}
          loadingPosition="end"
        >
          Save Changes
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditRole;
