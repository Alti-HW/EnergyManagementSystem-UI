import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ResponsiveDialogProps {
    open: boolean;
    handleAddUserModel: (open: boolean) => void;
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({ open, handleAddUserModel }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={() => handleAddUserModel(false)}
            aria-labelledby="add-user-dialog"
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '8px',
                    padding:2
                },
            }}
        >
            <DialogTitle 
                id="add-user-dialog" 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    paddingBottom: 0, 
                    position: 'relative', 
                    paddingRight: 3 
                }}
            >
                Add User
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => handleAddUserModel(false)}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 12,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box sx={{ borderBottom: '1px solid #e0e0e0' }} />
            <DialogContent sx={{ paddingTop: 2, paddingBottom: 3 }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            required
                        />
                        <TextField
                            fullWidth
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            required
                        />
                    </Stack>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select labelId="role-select-label" id="role-select" label="Role" required>
                            <MenuItem value={10}>Admin</MenuItem>
                            <MenuItem value={20}>Floor Admin</MenuItem>
                            <MenuItem value={30}>User</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="location-select-label">Location</InputLabel>
                        <Select labelId="location-select-label" id="location-select" label="Location" required>
                            <MenuItem value={10}>RGA Tech Park</MenuItem>
                            <MenuItem value={20}>Manyata Tech Park</MenuItem>
                            <MenuItem value={30}>Eco Space</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        id="building-name"
                        label="Building Name"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        id="floor-no"
                        label="Floor No"
                        variant="outlined"
                        required
                    />
                </Box>
            </DialogContent>
            <Box sx={{ borderTop: '1px solid #e0e0e0' }} />
            <DialogActions sx={{ paddingTop: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddUserModel(false)}
                    fullWidth
                >
                    Create User
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResponsiveDialog;
