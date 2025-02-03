import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationControlsProps {
  page: number;
  rowsPerPage: number;
  totalItems: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  rowsPerPage,
  totalItems,
  onChangePage,
}) => (
  <Pagination
    count={Math.ceil(totalItems / rowsPerPage)}
    page={page}
    onChange={onChangePage}
    style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
  />
);

export default PaginationControls;
