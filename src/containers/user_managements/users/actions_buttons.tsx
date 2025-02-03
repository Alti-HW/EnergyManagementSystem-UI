import React from 'react';
import { Button } from '@mui/material';
import { FilterList, Add } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ActionButtons = (props: any) => {
    const {
        handleAddModel,
        addLabel,
        isDelete = false
    } = props

    return (
        <>
            <Button variant="outlined" startIcon={<FilterList />}>
                Filters
            </Button>
            <Button variant="contained" startIcon={<Add />} onClick={() => handleAddModel(true)}>
                {addLabel}
            </Button>
            {isDelete &&
                <Button variant="contained" color='error' startIcon={<DeleteOutlineIcon />} >
                    Delete
                </Button>
            }
        </>
    )
};

export default ActionButtons;
