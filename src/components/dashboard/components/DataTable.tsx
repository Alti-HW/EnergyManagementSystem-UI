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

const DataTable = ({ config, data }: any) => {
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
            {config?.map((ele: any) => (
              <TableCell>
                <b>{ele?.colHeading}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((detail: any, index: number) => (
              <TableRow key={index}>
                {config?.map((ele: any) => (
                  <TableCell>{detail?.[ele?.dataKey]}</TableCell>
                ))}
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
