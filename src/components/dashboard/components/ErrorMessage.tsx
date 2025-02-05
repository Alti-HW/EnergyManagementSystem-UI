import { Typography } from "@mui/material"

const ErrorMessage = () => {
    return (
        <Typography
            sx={{ fontSize: '12px', color: '#e83f3f', mt: 2, textAlign: 'center' }}
        >
            Unable to render the chart.
        </Typography>
    )
}

export default ErrorMessage