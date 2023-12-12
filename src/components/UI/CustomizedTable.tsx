import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-of-type td, &:last-of-type th': {
    border: 0,
  },
}));

interface CustomizedTableProps {
  columns: string[];
  data: Record<string, any>[];
}

const CustomizedTable: React.FC<CustomizedTableProps> = ({ columns, data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column}>{column === 'Actions' ? 'Actions' : column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              {columns.map((column) => (
                <StyledTableCell key={column} align="right">
                  
                  {column === 'Actions' ? (
                    <Button onClick={() => handleButtonClick(row,index,data.length)} variant="contained" color="error">
                      Delete
                    </Button>
                  ) : row[column]}
                  
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const handleButtonClick = async (row,index,len) => {
  // Handle button click for the specific row data
  console.log('Button clicked for row:', row);
  if(len === 6){
    
  }
  console.log(len)
};

export default CustomizedTable;
