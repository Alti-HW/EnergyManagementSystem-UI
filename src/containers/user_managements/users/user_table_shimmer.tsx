import { Skeleton, TableRow, TableCell, Checkbox } from "@mui/material";

const UsersTableShimmer = () => {
  return (
    <>
      {[1, 2, 3].map((index) => (
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
      ))}
    </>
  );
};

export default UsersTableShimmer;
