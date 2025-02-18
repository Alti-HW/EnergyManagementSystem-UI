import { Box, Checkbox, Chip, Icon, IconButton, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import UserAvatar from "./user_avatar";
import { format, parseISO } from "date-fns";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { UserTableProps } from "./types";
import UsersTableShimmer from "./user_table_shimmer";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import dateNtimeUtils from "../../../utils/datentime.utils";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import FeatureAccessControl from "../../../authorization/feature.access.control";
import userAccess from "../../../authorization/user.access.constants";

const UsersTable = ({
  users = [],
  total = 10,
  onSelect,
  onUserEdit,
  onUserDelete,
  selectAll,
  onSelectAll,
  selectedUsers,
  usersRolesList,
  roleFilter = "",
  activeTab = "",
  tableLoader = false
}: UserTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPage(0)
  }, [activeTab])

  // Filter users based on the roleFilter
  const filteredUsers = useMemo(() => {
    if (!roleFilter || roleFilter.length === 0) {
      return users; // If no role filter, return all users
    }

    if (roleFilter === "invited") {
      // If the roleFilter is "invited", filter by emailVerified as true
      return users.filter(user => !user.emailVerified);
    }

    // Filter users who have at least one of the roles in the roleFilter
    return users.filter(user => {
      const userRoles = usersRolesList.get(user.id) || [];
      return userRoles.some((role: any) => roleFilter.includes(role.id));
    });
  }, [users, usersRolesList, roleFilter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
        <Table sx={{ tableLayout: "fixed", backgroundColor: "#fff" }}>
          <TableHead>
            <TableRow>
              <FeatureAccessControl requiredRoles={userAccess.DELETE_USER}>
                <TableCell sx={{ width: "45px" }}>
                  <Checkbox sx={{ transform: "scale(0.8)" }} checked={selectAll} onChange={onSelectAll} />
                </TableCell>
              </FeatureAccessControl>
              <TableCell sx={{ width: "20%" }}><Typography variant="caption" sx={{ fontWeight: 600 }}>Account</Typography></TableCell>
              <TableCell sx={{ width: "25%" }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Email</Typography>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Role</Typography>
              </TableCell>
              <TableCell >
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Date Added</Typography>
              </TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
        </Table>

        <Box>
          <Typography sx={{ fontSize: "12px", m: 2 }}>
            Showing {filteredUsers.length} out of {total} total Users
          </Typography>

          <Table sx={{ tableLayout: "fixed", backgroundColor: "#fff" }}>
            <TableBody>
              {tableLoader
                ? <UsersTableShimmer />
                : filteredUsers.length > 0 && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                  row.email && (
                    <TableRow key={index}>
                      <FeatureAccessControl requiredRoles={userAccess.DELETE_USER}>
                        <TableCell sx={{ width: "45px" }}>
                          <Checkbox
                            sx={{ transform: "scale(0.8)" }}
                            checked={selectAll || selectedUsers.indexOf(row?.id) !== -1}
                            onChange={(e) => {
                              e.stopPropagation();
                              onSelect(e, row?.id);
                            }}
                          />
                        </TableCell>
                      </FeatureAccessControl>
                      <TableCell sx={{ width: "20%" }}>
                        <UserAvatar firstName={row.firstName} lastName={row.lastName} email={""} />
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        <Box display="flex" alignItems="center" gap="4px">
                          {row.emailVerified ? <IconButton color="success"><VerifiedUserIcon /></IconButton> :
                            <IconButton color="warning"><GppMaybeIcon /></IconButton>}
                          <Typography variant="caption" sx={{ mt: "4px" }}>
                            {row.email}
                          </Typography>
                        </Box>

                      </TableCell>
                      <TableCell sx={{ width: "20%" }}>
                        <Box >
                          {usersRolesList.has(row.id)
                            ? usersRolesList.get(row.id).map((role: any, index: number) => (
                              <Chip key={index} label={role.name} variant="outlined" size="small" sx={{ fontSize: "12px" }} />
                            ))
                            : <Skeleton variant="text" width="100px" />
                          }
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }} >
                        <Typography variant="caption">{dateNtimeUtils.timeAgo(row.created)}</Typography>
                      </TableCell>
                      <TableCell sx={{ padding: 0.5, textAlign: "center" }}>
                        <FeatureAccessControl requiredRoles={userAccess.EDIT_USER}>
                          <IconButton onClick={(e) => { e.stopPropagation(); onUserEdit(row.id); }}>
                            <BorderColorIcon sx={{ width: "12px", height: "12px" }} />
                          </IconButton>
                        </FeatureAccessControl>
                        <FeatureAccessControl requiredRoles={userAccess.DELETE_USER}>
                          <IconButton sx={{ color: "red" }} onClick={(e) => { e.stopPropagation(); onUserDelete(index); }}>
                            <DeleteOutlineIcon sx={{ width: "16px", height: "16px" }} />
                          </IconButton>
                        </FeatureAccessControl>
                      </TableCell>
                    </TableRow>
                  )
                ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} >
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="users per page:"
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
        </Box>
      </TableContainer >
    </>
  );
};

export default UsersTable;
