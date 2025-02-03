import React from 'react';
import { Button } from '@mui/material';
import { FilterList, Add } from '@mui/icons-material';

const ActionButtons = (props:any) => {
    const {
        handleAddModel,
        addLabel
    } = props

    return (
        <>
            <Button variant="outlined" startIcon={<FilterList />}>
                Filters
            </Button>
            <Button variant="contained" startIcon={<Add />} onClick={()=>handleAddModel(true)}>
                {addLabel}
            </Button>
        </>
    )
};

export default ActionButtons;
