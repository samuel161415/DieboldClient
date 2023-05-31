import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import './detail.css'
import { grey } from '@mui/material/colors';
import { Navigate ,useNavigate} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const allName={
  
}

const DetailStatus=(props)=>{
  const navigate=useNavigate()

     var keys=Object.keys(props.detail)
     var detail=props.detail
     console.log('detail',props.detail);

    return(
       <div className="detail">
          <button onClick={() => navigate(-1)} className="back" > <ArrowBackIosIcon sx={{color:'black'}} /></button>
         <TableContainer component={Paper}>
          <Table>
          <TableHead>
            <TableRow  sx={{ backgroundColor: '#AACB73 '}}>
             <TableCell>
               Name
             </TableCell>
             <TableCell>
                Value
             </TableCell>   
            </TableRow>
           </TableHead>
           <TableBody>
            {keys.map((val,idx)=>(
               <TableRow

               key={val}
               sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor:idx%2===1?'#F5F5F5':'white' }}
             >
                <TableCell component="th" scope="row" style={{color:detail[val]==='Fatal Error'?'red':'black'}}>
                {val}
              </TableCell>
              <TableCell component="th" scope="row" style={{color:detail[val]==='Fatal Error'?'red':'black'}}>
                {detail[val]}
              </TableCell>
            </TableRow>
             ))}
           </TableBody>
          </Table>
          
         </TableContainer>
       </div>
    )

}
export default DetailStatus