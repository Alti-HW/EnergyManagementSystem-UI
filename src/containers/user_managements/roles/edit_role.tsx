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
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { permissionsMockData } from "./mockData";
import rolesActions from "../../../actions/roles";
import { useSnackbar } from "../../../components/ui_components/alert.ui";

interface ResponsiveDialogProps {
  open: boolean;
  onCancel: () => void;
  onRoleUpdate: () => void;
  role: any;
}

const EditRole: React.FC<ResponsiveDialogProps> = ({
  open,
  onCancel = () => { },
  onRoleUpdate = () => { },
  role = {},
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = React.useState(false);
  const [roleData, setRoleData] = React.useState<any>({
    roleName: role?.name ?? "",
    roleDescription: role?.description ?? "",
  });
  const { showSnackbar } = useSnackbar();


  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let res = await rolesActions.updateRole(roleData)
      onRoleUpdate();
      showSnackbar(res.message, "success");
      onCancel()
    } catch (err) {
      showSnackbar("Error on role updation", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => onCancel()}
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
              disabled
            // onChange={(e) =>
            //   setRoleData({ ...roleData, roleName: e.target.value })
            // }
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
              disabled
            // onChange={(e) =>
            //   setRoleData({ ...roleData, roleDescription: e.target.value })
            // }
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Typography variant="caption" sx={{ width: "30%" }}>
              Permissions
            </Typography>
            <Box sx={{ maxHeight: "300px", overflowY: "auto", width: "100%", mt: "-8px" }}>
              <FormGroup>
                {permissionsMockData.map(elm =>
                  <FormControlLabel
                    key={elm}
                    control={
                      <Checkbox name={elm} />
                    }
                    label={elm}
                  />
                )}
              </FormGroup>
            </Box>

          </Box>
        </Box>
      </DialogContent>
      <Box sx={{ display: "flex", justifyContent: "end", gap: "20px" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
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
