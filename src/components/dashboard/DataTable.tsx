import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { TableDataProps } from "./types";

const DataTable = ({ data }: { data: TableDataProps[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Handle pagination
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
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <b>Total cost</b>
            </TableCell>
            <TableCell>
              <b>Units consumed</b>
            </TableCell>
            <TableCell>
              <b>Cost per unit</b>
            </TableCell>
            <TableCell>
              <b>Building</b>
            </TableCell>
            <TableCell>
              <b>Floor</b>
            </TableCell>
            <TableCell>
              <b>Time Window</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((detail, index) => (
            <TableRow key={index}>
              <TableCell>{detail.Total_cost}</TableCell>
              <TableCell>{detail.units_consumed}</TableCell>
              <TableCell>{detail.cost_per_unit}</TableCell>
              <TableCell>{detail.building}</TableCell>
              <TableCell>{detail.floor}</TableCell>
              <TableCell>{detail.time_windlow}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
export default DataTable;
