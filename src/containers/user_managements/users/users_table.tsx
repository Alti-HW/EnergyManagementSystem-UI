import {
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import UserRow from "./user_row";
import PaginationControls from "./pagination_controls";
import { useState } from "react";
import UserAvatar from "./user_avatar";
import { format, parseISO } from "date-fns";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { UserTableProps } from "./types";

const UsersTable = ({
  users = [],
  total = 10,
  onSelect,
  onUserEdit,
  onUserDelete,
  selectAll,
  onSelectAll,
  selectedUsers,
}: UserTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [activeRowIndex, setActiveRowIndex] = useState(-1);

  const handleRowClick = (index: number) => {
    setActiveRowIndex((i) => (i !== index ? index : -1));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(users);
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ mt: 3, backgroundColor: "transparent" }}
      >
        <Table sx={{ tableLayout: "fixed", backgroundColor: "#fff" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ padding: 0.5, width: "45px", textAlign: "center" }}
              >
                <Checkbox
                  sx={{ transform: "scale(0.8)" }}
                  checked={selectAll}
                  onChange={onSelectAll}
                />
              </TableCell>
              <TableCell
                sx={{
                  padding: 0.5,
                  width: "30%",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  padding: 0.5,
                  width: "30%",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{
                  padding: 0.5,
                  width: "20%",
                  boxSizing: "border-box",
                }}
              >
                Date Added
              </TableCell>
              <TableCell
                sx={{
                  padding: 0.5,
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Box>
          <Typography sx={{ fontSize: "12px", m: 2 }}>
            Showing {users.length} out of {total} total Users
          </Typography>
          <Table sx={{ tableLayout: "fixed", backgroundColor: "#fff" }}>
            <TableBody>
              {total <= 0
                ? [1, 2, 3].map((index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: 0.5 }}>
                        <Checkbox sx={{ transform: "scale(0.8)" }} />
                      </TableCell>
                      <TableCell sx={{ padding: 0.5, width: "30%" }}>
                        <Skeleton variant="text" width="150px" />
                      </TableCell>
                      <TableCell sx={{ padding: 0.5, width: "30%" }}>
                        <Skeleton variant="text" width="60px" />
                      </TableCell>
                      <TableCell sx={{ padding: 0.5, width: "20%" }}>
                        <Skeleton variant="text" width="60px" />
                      </TableCell>
                      <TableCell sx={{ padding: 0.5 }}>
                        <Skeleton variant="text" width="60px" />
                      </TableCell>
                    </TableRow>
                  ))
                : users
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map(
                      (row: any, index: number) =>
                        row.email && (
                          <>
                            <TableRow
                              sx={{ cursor: "pointer" }}
                              onClick={(e) => {
                                var element = e.target as HTMLElement;
                                console.log(element.tagName, e.currentTarget);
                                if (element?.tagName !== "INPUT")
                                  handleRowClick(index);
                              }}
                            >
                              <TableCell
                                sx={{
                                  padding: 0.5,
                                  width: "45px",
                                  textAlign: "center",
                                }}
                              >
                                <Checkbox
                                  sx={{ transform: "scale(0.8)" }}
                                  checked={
                                    selectAll ||
                                    selectedUsers?.indexOf(row?.id) !== -1
                                  }
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    onSelect(e, row?.id);
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                sx={{
                                  padding: "8px 4px",
                                  width: "30%",
                                  boxSizing: "border-box",
                                }}
                              >
                                <UserAvatar
                                  firstName={row.firstName}
                                  lastName={row.lastName}
                                  email={row.email}
                                />
                              </TableCell>
                              <TableCell
                                sx={{ padding: "8px 4px", width: "30%" }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Chip
                                    label="Chip"
                                    variant="outlined"
                                    size="small"
                                    sx={{ fontSize: "12px" }}
                                  />
                                  <Chip
                                    label="Chip Outlined ww"
                                    variant="outlined"
                                    size="small"
                                    sx={{ fontSize: "12px" }}
                                  />

                                  <Chip
                                    label="Ch"
                                    variant="outlined"
                                    size="small"
                                    sx={{ fontSize: "12px" }}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell
                                sx={{
                                  padding: 0.5,
                                  width: "20%",
                                  boxSizing: "border-box",
                                  fontSize: "12px",
                                }}
                              >
                                {format(
                                  parseISO(row.created),
                                  "yyyy-MM-dd HH:mm"
                                )}
                              </TableCell>
                              <TableCell
                                sx={{ padding: 0.5, textAlign: "center" }}
                              >
                                <IconButton
                                  sx={{ color: "#192142" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onUserEdit(index);
                                  }}
                                >
                                  <BorderColorIcon
                                    sx={{ width: "12px", height: "12px" }}
                                  />
                                </IconButton>
                                <IconButton
                                  sx={{ color: "#192142" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onUserDelete(index);
                                  }}
                                >
                                  <DeleteOutlineIcon
                                    sx={{ width: "16px", height: "16px" }}
                                  />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                display:
                                  activeRowIndex === index
                                    ? "table-row"
                                    : "none",
                              }}
                            >
                              <TableCell colSpan={5}>
                                <Collapse in={activeRowIndex === index}>
                                  <Box>
                                    <Typography sx={{ fontSize: "16px" }}>
                                      Details
                                    </Typography>
                                    <List sx={{ pt: 0 }}>
                                      <ListItem sx={{ pb: 0 }}>
                                        First Name : {row.firstName}
                                      </ListItem>
                                      <ListItem sx={{ pb: 0 }}>
                                        Last Name : {row.lastName}
                                      </ListItem>
                                      <ListItem sx={{ pb: 0 }}>
                                        User Name : {row.username}
                                      </ListItem>
                                      <ListItem sx={{ pb: 0 }}>
                                        List of Role : {row?.role?.toString()}
                                      </ListItem>
                                    </List>
                                  </Box>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </>
                        )
                    )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
};

export default UsersTable;
