import React, { useState } from 'react';
import { TableCell, TableRow, IconButton, Menu, MenuItem, TextField, Box, Chip, FormControl, Select, InputLabel, Fab } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

interface UserAccess {
    access: string[];
    dateAdded: string;
    name: string;
}

interface UserRowProps {
    row: any;
    index: number;
    selectedUserIndex: number | null;
    anchorEl: any;
    handleClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
    handleClose: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
}

const UserRow: React.FC<UserRowProps> = ({
    row,
    index,
    selectedUserIndex,
    anchorEl,
    handleClick,
    handleClose,
    handleEdit,
    handleDelete,
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editableRow, setEditableRow] = useState<UserAccess>(row);

    const getRandomColor = (): "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
        const colors: ("primary" | "secondary" | "error" | "info" | "success" | "warning")[] = [
            'primary', 'secondary', 'error', 'info', 'success', 'warning',
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const handleEditUser = (val: boolean) => {
        setIsEditing(val)
        if (!val) {
            handleClose()
        }
    }

    const handleFieldChange = (field: string, value: string | string[]) => {
        setEditableRow((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    console.log(row)
    return (
        <TableRow key={index}>
            <TableCell>
                {isEditing ? (
                    <TextField
                        value={editableRow.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        fullWidth
                    />
                ) : (
                    row.name
                )}
            </TableCell>
            {/* <TableCell>
                {isEditing ?
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Label</InputLabel>
                        <Select labelId="role-select-label" id="role-select" value={10} label="Role" required>
                            <MenuItem value={10}>Admin</MenuItem>
                            <MenuItem value={20}>Floor Admin</MenuItem>
                            <MenuItem value={30}>User</MenuItem>
                        </Select>
                    </FormControl>
                    :
                    <Chip sx={{ margin: "2px", fontWeight: 600 }} label={row.role} color={getRandomColor()} />
                }
            </TableCell> */}
            <TableCell>{row.email}</TableCell>
            {/* <TableCell>{row.location}</TableCell> */}
            {/* <TableCell>{row.building}</TableCell> */}
            {/* <TableCell>{row.floor}</TableCell> */}
            <TableCell>{row.dateAdded}</TableCell>
            <TableCell>
                {isEditing ?
                    <Box>
                        <Fab color="primary" aria-label="add" onClick={() => handleEditUser(false)}>
                        <DoneIcon />
                        </Fab>
                        <IconButton aria-label="close" size="large" onClick={(e) => handleEditUser(false)} color="secondary">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    :
                    <>
                        <IconButton aria-label="view profile" onClick={(e) => handleClick(e, index)}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={selectedUserIndex === index}
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
                            <MenuItem onClick={() => handleEditUser(true)}>Edit</MenuItem>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                    </>
                }
            </TableCell>
        </TableRow>
    )
}

export default UserRow;
