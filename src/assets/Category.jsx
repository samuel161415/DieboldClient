import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { makeStyles } from '@mui/material';


const useStyles=makeStyles({
    table:{
        minWidth:650
    }
})

function Category(){

    const classes=useStyles()

    return(
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple Table'>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Customer_Error
                        </TableCell>
                        <TableCell>
                            Branch_Error
                        </TableCell>
                        <TableCell>
                            Technical_Error
                        </TableCell>
                        <TableCell>
                            System_Error
                        </TableCell>
                    </TableRow>
                </TableHead>

            </Table>

        </TableContainer>
    )
}

export default Category