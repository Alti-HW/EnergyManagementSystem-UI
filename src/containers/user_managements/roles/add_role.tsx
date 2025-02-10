import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckboxesTags from "./multi_select";

interface ResponsiveDialogProps {
  open: boolean;
  handleAddRoleModel: (open: boolean) => void;
}

const level = ["Org", "Location", "Building", "Floor", "Zone"];
const permissions = ["View", "Create", "Edit", "Delete"];
const scope = ["Global", "Specific Entity"];

const AddNewRole: React.FC<ResponsiveDialogProps> = ({
  open,
  handleAddRoleModel,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => handleAddRoleModel(false)}
      aria-labelledby="add-role-dialog"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
          padding: 2,
        },
      }}
    >
      <DialogTitle
        id="add-role-dialog"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 0,
          position: "relative",
          paddingRight: 3,
        }}
      >
        Add Role
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => handleAddRoleModel(false)}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 12,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box sx={{ borderBottom: "1px solid #e0e0e0" }} />
      <DialogContent sx={{ paddingTop: 2, paddingBottom: 3 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            id="role-name"
            label="Role Name"
            variant="outlined"
            required
          />
          <FormControl fullWidth>
            <InputLabel id="org-label">Select Role Level</InputLabel>
            <Select
              labelId="org-label"
              id="permissions-select"
              label="Select Organizational Level"
              required
              defaultValue=""
            >
              {level.map((el, index) => (
                <MenuItem key={index} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            {/* <InputLabel id="select-label"> Select Permissions for This Level</InputLabel> */}
            <CheckboxesTags />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="scope-label">Scope of this role?</InputLabel>
            <Select
              labelId="scope-label"
              id="permissions-select"
              label="Permissions"
              required
            >
              {scope.map((el, index) => (
                <MenuItem key={index} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <Box sx={{ borderTop: "1px solid #e0e0e0" }} />
      <DialogActions sx={{ paddingTop: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddRoleModel(false)}
          fullWidth
        >
          Create Role
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewRole;
