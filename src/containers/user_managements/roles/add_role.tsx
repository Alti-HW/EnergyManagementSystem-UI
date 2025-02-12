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
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSnackbar } from "../../../components/ui_components/alert.ui";
import rolesActions from "../../../actions/roles";
import { useLoader } from "../../../components/ui_components/full_page_loader.ui";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface ResponsiveDialogProps {
  open: boolean;
  onCancel: () => void;
  onRoleCreation: () => void;
  permissions: any
}

const AddNewRole: React.FC<ResponsiveDialogProps> = ({
  open,
  onCancel = () => { },
  onRoleCreation = () => { },
  permissions = []
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [roleData, setRoleData] = React.useState<any>({
    roleName: "",
    roleDescription: "",
    compositeRoles: [],
  });

  const [errors, setErrors] = React.useState<any>({});
  const { showSnackbar } = useSnackbar();
  const { showLoader, hideLoader } = useLoader()

  // Handle form submit
  const handleSubmit = async () => {
    // Reset errors
    setErrors({});

    // Basic validation
    const newErrors: any = {};
    if (!roleData.roleName) {
      newErrors.roleName = "Role Name is required";
    }
    if (!roleData.roleDescription) {
      newErrors.roleDescription = "Role Description is required";
    }
    if (roleData.compositeRoles?.length <= 0) {
      newErrors.compositeRoles = "Atleast a permission is required to create a Role"
    }

    // If there are validation errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    showLoader()
    try {
      let res = await rolesActions.createRole(roleData);
      if (res?.data) {
        showSnackbar("Role Created", "success");
        onRoleCreation();
        onCancel()
      } else {
        throw new Error("Failed to create role");
      }
    } catch (err) {
      showSnackbar("Error on role creation", "error");
    } finally {
      hideLoader()
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
        <Typography variant="h6" sx={{ flex: 1 }}>
          Add New Role
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

      <DialogContent sx={{ paddingTop: 2, paddingBottom: 3 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "30%" }}>
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
              error={!!errors.roleName}
              helperText={errors.roleName}
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
            <Typography variant="caption" sx={{ width: "30%" }}>
              Role Description
            </Typography>
            <TextField
              multiline
              rows={2}
              maxRows={2}
              label="Role description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={roleData?.roleDescription}
              onChange={(e) =>
                setRoleData({ ...roleData, roleDescription: e.target.value })
              }
              error={!!errors.roleDescription}
              helperText={errors.roleDescription}
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

          <Box>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Typography variant="caption" sx={{ width: "30%" }}>
                Permissions
              </Typography>
              <Box
                sx={{

                  width: "100%",
                  mt: "-8px",
                }}
              >
                <Box sx={{
                  maxHeight: "300px",
                  overflowY: "auto",
                }}>
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
                {errors.compositeRoles && (
                  <FormHelperText error>{errors.compositeRoles}</FormHelperText>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <Box sx={{ display: "flex", justifyContent: "end", gap: "20px" }}>
        <Button variant="outlined" color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<AddCircleOutlineIcon />}
        >
          Create Role
        </Button>
      </Box>
    </Dialog >
  );
};

export default AddNewRole;
