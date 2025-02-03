import { Box, IconButton, Modal } from "@mui/material"
import { FullViewProps } from "../types"
import { ClearIcon } from "@mui/x-date-pickers"

const FullView = ({open, onClose, children}: FullViewProps) => {
    return (
        <Modal
            keepMounted
            open={open}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            onClose={onClose}
        >
            <Box sx={{
                position: 'absolute',
                minWidth: 400,
                width: 'calc(100% - 64px)',
                height:'100%',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="close drawer"
                    sx={{ mr: 2 }}
                    onClick={onClose}
                    className="closeDrawer"
                >
                    <ClearIcon />
                </IconButton>
                {children}
            </Box>
        </Modal>
    )
}

export default FullView