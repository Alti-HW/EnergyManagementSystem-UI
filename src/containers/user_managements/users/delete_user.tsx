import { Box, Button, Modal, Paper, Typography } from "@mui/material";

interface EditUserProps {
  onCancel: () => void;
  user: any;
}
const DeleteUser = ({ onCancel, user }: EditUserProps) => {
  return (
    <Modal
      open={true}
      onClose={onCancel}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Paper
        sx={{
          minWidth: "500px",
          margin: "auto",
          padding: 4,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography sx={{ textAlign: "center", fontSize: "16px", mb: 2 }}>
          Do you want to delete User {`${user?.firstName} ${user.lastName}`}
        </Typography>
        <Box
          sx={{ display: "flex", mt: 5, justifyContent: "center", gap: "20px" }}
        >
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onCancel}
            sx={{
              border: "none",
              color: "#000",
              width: "fit-content",
              textTransform: "none",
              fontSize: "12px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {}}
            sx={{
              background: "#192142",
              padding: "8px",
              width: "fit-content",
              textTransform: "none",
              fontSize: "12px",
            }}
          >
            Delete
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};
export default DeleteUser;
