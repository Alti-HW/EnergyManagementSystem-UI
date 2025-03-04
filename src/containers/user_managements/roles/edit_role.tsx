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
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import rolesActions from "../../../actions/roles";
import { useSnackbar } from "../../../components/ui_components/alert.ui";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useUser } from "../../../context/user.context";
import { useConfirmationDialog } from "../../../components/ui_components/confirmation_dialog.ui";

interface ResponsiveDialogProps {
  open: boolean;
  onCancel: () => void;
  onRoleUpdate: () => void;
  role: any;
  permissions: any
}

const EditRole: React.FC<ResponsiveDialogProps> = ({
  open,
  onCancel = () => { },
  onRoleUpdate = () => { },
  permissions = [],
  role = {},
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = React.useState(false);
  const [roleData, setRoleData] = React.useState<any>({
    roleName: role?.name ?? "",
    roleDescription: role?.description ?? "",
    compositeRoles: role?.compositeRoles || []
  });
  const { showSnackbar } = useSnackbar();
  const { user, logout } = useUser()
  const { openDialog } = useConfirmationDialog();
  const [isUserRole, setisUserRole] = React.useState(false)

  React.useEffect(() => {
    if (role.id && user?.role?.id === role.id) {
      sameUserRoleEdit()
    }
  }, [role])

  const sameUserRoleEdit = async () => {
    const userResponse = await openDialog(
      `You are attempting to change your assigned role. This action will log you out of the system.
      Do you wish to proceed?`, // message
      'Edit Role ?' // title
    );
    if (!userResponse) {
      onCancel()
    } else {
      setisUserRole(true)
    }
  }


  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = {
        "name": roleData.roleName,
        "description": roleData.roleDescription,
        compositeRoles: roleData?.compositeRoles
      }
      let res = await rolesActions.updateRole(data)
      if (isUserRole) {
        return logout()
      }
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
                {permissions.map((elm: any) => (
                  <Box display="flex" gap="2" alignItems="center">
                    <FormControlLabel
                      key={elm.id}
                      control={
                        <Checkbox
                          name={elm.name}
                          checked={roleData?.compositeRoles?.some((per: any) => per.id === elm.id)}
                          onChange={(e) => {
                            const newPermissions = e.target.checked
                              ? [...roleData.compositeRoles, elm]
                              : roleData.compositeRoles.filter(
                                (perm: any) => perm.id !== elm.id
                              );
                            setRoleData({ ...roleData, compositeRoles: newPermissions });
                          }}
                        />
                      }
                      label={<Typography variant="caption" sx={{ userSelect: "none" }}>{elm.name}</Typography>}
                    />
                    <Tooltip title={elm.description || elm?.name || ""}>
                      <IconButton>
                        <InfoOutlinedIcon sx={{ color: "#b0b0b0", fontSize: "18px" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))}
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
