import React, { useState } from 'react';
import { TableCell, TableRow, IconButton, Menu, MenuItem, TextField, Box, Chip, FormControl, Select, InputLabel, Fab, Checkbox } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';



interface UserRowProps {
    row: any;
    index: number;
    isSelected: boolean; // Track if this row is selected
    onSelect: () => void; // Callback to handle row checkbox toggle
}

const UserRow: React.FC<UserRowProps> = ({
    row, index, isSelected, onSelect
}) => {

    return (
        <TableRow key={index}>
            <TableCell>
                <Checkbox checked={isSelected} onChange={onSelect}/>
            </TableCell>
            <TableCell>
                <Link to={`/userManagement/user/${row.id}/settings`}>{row.username}</Link>
            </TableCell>
            <TableCell>
                {row.firstName}
            </TableCell>
            <TableCell>
                {row.lastName}
            </TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>user</TableCell>
            <TableCell>{format(parseISO(row.created), 'yyyy-MM-dd HH:mm')}</TableCell>
        </TableRow>
    )
}

export default UserRow;
