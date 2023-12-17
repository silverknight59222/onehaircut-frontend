import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell';
import { Button } from '@mui/material';
import { salonApi } from '@/api/salonSide';
import useSnackbar from '@/hooks/useSnackbar';
import userLoader from "@/hooks/useLoader";


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
  cB : any
}

const CustomizedTable: React.FC<CustomizedTableProps> = ({ columns, data, cB}) => {
  const [newData, setData] = useState(data);
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);

  const deleteData = (rowToDelete) => {
    // Implement your logic to delete the row from the data
    // For demonstration, let's assume data is an array of objects.
    let list_after_del = newData.filter((row) => row !== rowToDelete);
    setData(list_after_del)
  };
  const handleButtonClick = async (row,index,len) => {
    // Handle button click for the specific row data
    console.log('Button clicked for row:', row);
    setIsLoading(true)
    if(len === 6){
      let uv_id = newData[index].uv_id;
      let resp = await salonApi.delHairDresserUnavailability(uv_id);
      // console.log(resp);
      if(resp.data.status == 200){
        showSnackbar("success", "Hair Dresser Unavailability removed.");
      }
      else {
        showSnackbar("error", "Hair Dresser Unavailability process cannot be proceed.");
      }
    }
    else {
      let uv_id = newData[index].uv_id;
      let resp = await salonApi.delSalonUnavailability(uv_id);
      // console.log(resp);
      if(resp.data.status == 200){
        showSnackbar("success", "Hair Dresser Unavailability removed.");
      }
      else {
        showSnackbar("error", "Hair Dresser Unavailability process cannot be proceed.");
      }
    }
    deleteData(row);
    setIsLoading(false)
  };

  const delay = async (ms) => {
    return new Promise((resolve) => 
        setTimeout(resolve, ms));
  };

  useEffect(() => {
    cB(newData)
  },[newData]);

  useEffect(() => {
    console.log("Salon Part Table")
    console.log(newData)
  },[])

  const visibleColumns = columns.slice(1);
  
  return (
    <TableContainer component={Paper}>
      {isLoading && loadingView()}
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {visibleColumns.map((column) => (
                <StyledTableCell key={column}>{column === 'Actions' ? 'Actions' : column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          
          {newData.map((row, index) => (
            <StyledTableRow key={index}>
              {visibleColumns.map((column) => (
                <StyledTableCell key={column} align="right">
                  
                  {column === 'Actions' ? (
                    <Button onClick={() => handleButtonClick(row,index,visibleColumns.length)} variant="contained" color="error">
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

export default CustomizedTable;

