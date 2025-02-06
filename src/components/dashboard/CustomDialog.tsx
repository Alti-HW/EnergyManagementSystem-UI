import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DataTable from "./DataTable";
import { TableDataProps } from "./types";
import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";
interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title: string | null;
  label: string | null;
  data: TableDataProps[];
  isLoading?: boolean;
  isError?: any;
}
const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  label,
  data,
  isLoading,
  isError,
}) => {
  console.log("asdfddd :", title);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{label}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1"> {label}</Typography>
        {isLoading ? <Spinner /> : <DataTable data={data} />}
        {isError && <ErrorMessage />}
      </DialogContent>
    </Dialog>
  );
};
export default CustomDialog;
