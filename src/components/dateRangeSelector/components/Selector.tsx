import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import React, { useState } from "react"
import { SelectorProps } from "../types"

const Selector = ({ options, onChange, name, value }: SelectorProps) => {
    // const [selected, setSelectedValue] = useState(value ?? '')

    const handleOnChange = (event: any) => {
        // setValue(event.target.value)
        onChange(event.target.value)
    }
    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{
                fontSize: '12px', mt: -1, '&.Mui-focused': {
                    mt: 0
                }
            }} id={`$name}-label`}>{name}</InputLabel>
            <Select
                labelId={`$name}-label`}
                id={name}
                label={name}
                value={value}
                sx={{
                    minWidth: '150px', mb: '20px', fontSize: '16px',
                    '& .MuiSelect-select': {
                        fontSize: '14px',
                        padding: '5px 32px 5px 16px'
                    }
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            overflowY: 'auto',
                        },
                    },
                }}

                name={name}
                onChange={handleOnChange}
            >
                {options.map(({ label, value }: { label: string, value: string }) => (
                    <MenuItem sx={{ fontSize: '12px' }} key={value} value={value}>{label}</MenuItem>
                ))}
            </Select >
        </FormControl>
    )
}

export default Selector