import React, { ChangeEvent, useState, MouseEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TableFooter,
  TablePagination,
  Checkbox,
  Box,
} from "@mui/material";
import dateNtimeUtils from "../../../utils/datentime.utils";
import CircleIcon from "@mui/icons-material/Circle";
interface NotificationsHistoryTableProps {
  notifications: any[];
  onSelect: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedRows: string[];
  selectedAll: boolean;
  onNotificationResolve: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  onNotificatioDelete: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
}

const NotificationsHistoryTable = ({
  notifications,
  onSelect,
  onSelectAll,
  selectedRows,
  selectedAll,
  onNotificationResolve: onRuleResolve,
  onNotificatioDelete: onRuleDelete,
}: NotificationsHistoryTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ margin: "auto", mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "45px" }}>
                <Checkbox
                  sx={{ transform: "scale(0.8)" }}
                  checked={selectedAll}
                  onChange={(e) => {
                    e.stopPropagation();
                    onSelectAll(e);
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Summary
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Generated at
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {notifications
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((notification, index) => (
                <TableRow
                  key={notification.id}
                  onClick={() => {
                    // handleNotificationsDetails(index);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell sx={{ width: "45px" }}>
                    <Checkbox
                      sx={{ transform: "scale(0.8)" }}
                      checked={selectedRows.indexOf(notification?.id) !== -1}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(e) => onSelect(e, notification?.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {notification.message}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <CircleIcon
                        sx={{
                          width: "12px",
                          mr: 0.5,
                          color:
                            notification?.status?.toLowerCase() === "resolved"
                              ? "green"
                              : "red",
                        }}
                      />
                      {notification.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {dateNtimeUtils.timeAgo(notification.triggeredAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: "8px" }}>
                      {notification?.status?.toLowerCase() !== "resolved" && (
                        <Button
                          sx={{
                            border: 1,
                            fontSize: "12px",
                            px: 1,
                            py: 1,
                            height: "30px",
                            minWidth: "fit-content",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onRuleResolve(e, notification?.id);
                          }}
                        >
                          Resolve
                        </Button>
                      )}
                      <Button
                        sx={{
                          border: 1,
                          fontSize: "12px",
                          px: 1,
                          py: 1,
                          height: "30px",
                          minWidth: "fit-content",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRuleDelete(e, notification?.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={notifications.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Notifications per page:"
                  sx={{
                    ".MuiSelect-root": {
                      border: "1px solid #d6d6d6",
                      borderRadius: "4px",
                    },
                    ".MuiSelect-icon": {
                      color: "#d6d6d6",
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default NotificationsHistoryTable;
