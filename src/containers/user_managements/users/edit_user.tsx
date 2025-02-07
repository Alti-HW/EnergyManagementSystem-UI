import { Modal, Paper, Typography } from "@mui/material";

interface EditUserProps {
  onCancel: () => void;
}
const EditUser = ({ onCancel }: EditUserProps) => {
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
          padding: 2,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography sx={{ textAlign: "center", fontSize: "16px", mb: 2 }}>
          Edit User
        </Typography>
      </Paper>
    </Modal>
  );
};
export default EditUser;
