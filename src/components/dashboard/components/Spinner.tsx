import { CircularProgress } from "@mui/material"

const Spinner = () => {
    return (
        <CircularProgress sx={{
            position: 'absolute',
            top: 'calc(50% - 15px)',
            left: 'calc(50% - 15px)'
        }} size={'30px'} color="secondary" />
    )
}

export default Spinner