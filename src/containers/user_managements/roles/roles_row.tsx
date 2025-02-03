import * as React from 'react';
import { TableCell, TableRow, IconButton, Menu, MenuItem, TextField, Box, Chip, FormControl, Select, InputLabel, Fab } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface RoleAccess {
    roleName: string;
    description: string;
    permissions: string[];
    dateAdded: string;
}

interface RoleRowProps {
    row: RoleAccess;
    index: number;
    selectedRoleIndex: number | null;
    anchorEl: any;
    handleClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
    handleClose: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
}

const RoleRow: React.FC<RoleRowProps> = ({
    row,
    index,
    selectedRoleIndex,
    anchorEl,
    handleClick,
    handleClose,
    handleEdit,
    handleDelete,
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editableRow, setEditableRow] = useState<RoleAccess>(row);

    const getRandomColor = (): "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
        const colors: ("primary" | "secondary" | "error" | "info" | "success" | "warning")[] = [
            'primary', 'secondary', 'error', 'info', 'success', 'warning',
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const handleEditRole = (val: boolean) => {
        setIsEditing(val);
        if (!val) {
            handleClose();
        }
    };

    const handleFieldChange = (field: string, value: any) => {
        setEditableRow((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <TableRow key={index}>
            <TableCell>
                {isEditing ? (
                    <TextField
                        value={editableRow.roleName}
                        onChange={(e) => handleFieldChange('roleName', e.target.value)}
                        fullWidth
                    />
                ) : (
                    row.roleName
                )}
            </TableCell>
            <TableCell>
                {isEditing ? (
                    <TextField
                        value={editableRow.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                        fullWidth
                    />
                ) : (
                    row.description
                )}
            </TableCell>
            <TableCell>
                {isEditing ? (
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Permissions</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                    //   value={age}
                      label="Age"
                      onChange={(e) => handleFieldChange('permissions', e.target.value)}
                    >
                      <MenuItem value="Read">Read</MenuItem>
                            <MenuItem value="Write">Write</MenuItem>
                            <MenuItem value="Admin">Read</MenuItem>
                        </Select>
                  </FormControl>
 
                ) : (
                    row.permissions.map(per =>
                        <Chip sx={{ m: "2px" }} key={per} label={per} color={getRandomColor()} />
                    )
                )}
            </TableCell>
            <TableCell>{row.dateAdded}</TableCell>
            <TableCell>
                {isEditing ? (
                    <Box>
                        <Fab color="primary" aria-label="save" onClick={() => handleEditRole(false)}>
                            <DoneIcon />
                        </Fab>
                        <IconButton aria-label="close" size="large" onClick={() => handleEditRole(false)} color="secondary">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <>
                        <IconButton aria-label="view options" onClick={(e) => handleClick(e, index)}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={selectedRoleIndex === index}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={() => handleEditRole(true)}>Edit</MenuItem>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                    </>
                )}
            </TableCell>
        </TableRow>
    );
};

export default RoleRow;
