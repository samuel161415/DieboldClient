import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import './right.css'
import { names } from '../../assets/atmNames';
import { district_name } from '../../assets/atmNames';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Badge from '@mui/material/Badge';
import AlbumIcon from '@mui/icons-material/Album';
import SimCardIcon from '@mui/icons-material/SimCard';
import PrintIcon from '@mui/icons-material/Print';
import { useState, useEffect } from 'react'
import { useMemo } from 'react';
import { ExportToExcel } from '../../assets/ExportToExcel';
import {createData,createTotalData} from '../../assets/createData';
import {supply_error,fitness_error} from '../../assets/errors'
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Navigate ,useNavigate} from "react-router-dom";
import { userRequest } from '../../requestMethods';


function RightPage(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState()
  const [excelFiles,setExcelFiles]=useState([])
  const [prev,setPrev]=useState(false)
  const [memorizedValue,setMemorizedValue]=useState()
  let filtered = useMemo(()=>{
    if (props.user.district === 'Head_Office') {
      return props.atms
      
    }
    else {
      return props.atms.filter((val) => {
  
        return val.includes(district_name[props.user.district])
      })
    }
  },[props.atms,props.user.district])


  
  useEffect(() => {
    

    setSearch(filtered)
    let temp=[]
   
    filtered.map((val)=>{
      if(props.title !== 'Out of service'){
        //console.log('result to be seen',props.result);
        //terminal,name,dispensor_fitness,dispensor_supply,hopper1_supply,hopper2_supply,hopper3_supply,hopper4_supply,encryptor,card_reader
        let obj={
          dfit:props.result[val].fitness_array[2],
          dsup: supply_error[props.result[val].supply_array[1]],
          h1sup:supply_error[props.result[val].supply_array[2]],
          h2sup:supply_error[props.result[val].supply_array[3]],
          h3sup:supply_error[props.result[val].supply_array[4]],
          h4sup:supply_error[props.result[val].supply_array[5]],
          enc:fitness_error[props.result[val].fitness_array[0]],
          scr:fitness_error[props.result[val].fitness_array[1]],
          }
          temp.push(createTotalData(val,names[val],obj.dfit,obj.dsup,obj.h1sup,obj.h2sup,obj.h3sup,obj.h4sup,obj.enc,obj.scr))
      }
      else{
        temp.push(createData(val,names[val]))
      }
      
    
      
    })
    setExcelFiles(temp)
  }, [filtered,prev])

 useEffect(()=>{

  if(props.title==='Out of service'){
    const makeRequest = async () => {

       console.log('called');

      try {

        const res = await userRequest.post('/updateOfflines',{name:search,id:'offline'});
        console.log('updated data',res.data);
        setMemorizedValue(res.data)
        
        

      }
      catch (err) {

      }
    }
    makeRequest()
   

    
    // const keys=Object.key(memorizedOffline)
    //  keys.map((val)=>{
    //    if(!search.includes(val)){
    //     delete memorizedOffline[val]
    //    }
    //  })
  }
 
 
  
 },[search])

//  console.log('memorized',memorizedOffline);


  var cn = {}
  const handleColor = (fit, sup, sen) => {

    if (fit === 4 || sen === 2) return 'red'
    else if (sup === 3) return '#FEFCF3'
    else if (fit === 2 || sup === 2) return 'yellow'
    else return 'white'
  }
  const handleReaderColor = (fit) => {
    if (fit === 4 || fit === 3 || fit === 1) return 'red'
    else if (fit === 2) return 'yellow'
    else return 'white'
  }

  const handleFilter = (e) => {
    setSearch(() => (
      filtered.filter((val) => names[val].toLowerCase().includes(e.target.value.toLowerCase())
      )
    ))


  }

  const handleLog=()=>{
    
   
     setPrev(!prev)
      
 }
  return (
    <div className="right_page">
      <button onClick={() => navigate(-1)} className="back" > <ArrowBackIosIcon sx={{color:'black'}} /></button>
      <List
        sx={{
          width: '100%', bgcolor: 'background.paper'
          , overflow: 'hidden', overflowY: 'scroll', height: '80vh'

        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" style={{
            textAlign: 'center',
            backgroundColor: '#AACB73',
            color: 'black'
          }}>
            
            {props.title} (<b style={{ color: 'red' }}>{props.atms.length}</b>)
            <input id='atmsearch' placeholder='search' onChange={handleFilter} ></input>
            <div className="excel">
              
                    <ExportToExcel apiData1={excelFiles} fileName1={'Diebold_Status'}  
                    />
            </div>
          </ListSubheader>
        }
      >
        {
          search ? search.map((val, idx) => {
            if(props.title==='Out of service' && memorizedValue){
              console.log('for checking purpose',memorizedValue[val]);
            }


            if (props.result && props.result[val] && props.title !== 'Out of service') {
              cn = {
                dfit: props.result[val].fitness_array[2],
                dsup: props.result[val].supply_array[1],
                dsen: props.result[val].sensor_array[2],
                h1sup: props.result[val].supply_array[2],
                h1fit: props.result[val].fitness_array[3],
                h1sen: props.result[val].sensor_array[2],
                h2sup: props.result[val].supply_array[3],
                h2fit: props.result[val].fitness_array[4],
                h2sen: props.result[val].sensor_array[3],
                h3sup: props.result[val].supply_array[4],
                h3fit: props.result[val].fitness_array[5],
                h3sen: props.result[val].sensor_array[4],
                h4sup: props.result[val].supply_array[5],
                h4fit: props.result[val].fitness_array[6],
                h4sen: props.result[val].sensor_array[5],
                enc: props.result[val].fitness_array[0],
                scr: props.result[val].fitness_array[1],
                pri: props.result[val].fitness_array[7]
              }

            }




            return (
              < div key={idx} >

                <Link key={idx} to={props.title!=='Parked atms'?'/singleAtm':'#'} state={{
                  result: props.result,
                  terminalId: val
                }}

                  style={{
                    textDecoration: 'none',
                    color: "black",
                  }} >
                    {props.title==='Out of service' && memorizedValue?<div>{memorizedValue[val]}</div>
                         :<div>what is the problem</div>}
                   
                  <ListItemButton sx={{ padding: '0px', margin: '0px', width: '100%', display: 'flex' }}>
                    <ListItemText primary={val} className='rightErrorTxtL' />
                    <ListItemText primary={names[val] ? names[val] : val} className='rightErrorTxtR' />
                    <div className='right_txt_wrapper' >
                     <SettingsOutlinedIcon sx={{ padding: '0',
                          backgroundColor: Number(cn.dfit) === 4 || Number(cn.dsup) === 4 || Number(cn.dsen) === 2 ? 'red' : 'white',
                          display: Number(cn.dfit) === 4 || Number(cn.dsup) === 4 || Number(cn.dsen) === 2 ? 'inline' : 'none',

                      }} className="rightError"  />

                      <Badge badgeContent={1}
                       sx={{
                        backgroundColor: handleColor(Number(cn.h1fit), Number(cn.h1sup), Number(cn.h1sen)),
                        display: handleColor(Number(cn.h1fit), Number(cn.h1sup), Number(cn.h1sen)) === 'white' ? 'none' : 'inline'
                      }}  className="rightError">
                        <AlbumIcon sx={{ padding: '0' }} />
                      </Badge>
                      <Badge badgeContent={2} sx={{
                          backgroundColor: handleColor(Number(cn.h2fit), Number(cn.h2sup), Number(cn.h2sen)),
                          display: handleColor(Number(cn.h2fit), Number(cn.h2sup), Number(cn.h2sen)) === 'white' ? 'none' : 'inline'
                        }} className="rightError">
                        <AlbumIcon sx={{ padding: '0' }} />
                      </Badge>
                      <Badge badgeContent={3}
                      sx={{
                        backgroundColor: handleColor(Number(cn.h3fit), Number(cn.h3sup), Number(cn.h3sen)),
                        display: handleColor(Number(cn.h3fit), Number(cn.h3sup), Number(cn.h3sen)) === 'white' ? 'none' : 'inline'
                      }}  className="rightError" >
                        <AlbumIcon sx={{ padding: '0' }} />
                      </Badge>
                      <Badge badgeContent={4} 
                      style={{
                        backgroundColor: handleColor(Number(cn.h4fit), Number(cn.h4sup), Number(cn.h4sen)),
                        display: handleColor(Number(cn.h4fit), Number(cn.h4sup), Number(cn.h4sen)) === 'white' ? 'none' : 'inline'
                      }} className="rightError" >
                        <AlbumIcon sx={{ padding: '0' }} />
                      </Badge>
                      <ListItemText primary={'Enc'} className="rightError"
                        style={{
                          backgroundColor: handleReaderColor(Number(cn.enc)),
                          display: handleReaderColor(Number(cn.enc)) === 'white' ? 'none' : 'inline'
                        }}
                         />
                         
                      {/* <ListItemText primary={'Mcr'} className="rightError" 
                 style={{
                  backgroundColor:handleReaderColor(Number(cn.mcr)),
                  display:handleReaderColor(Number(cn.mcr))==='white'?'none':'inline'
                }} /> */}
                      <SimCardIcon sx={{ padding: '0',
                      backgroundColor: handleReaderColor(Number(cn.scr)),
                      display: handleReaderColor(Number(cn.scr)) === 'white' ? 'none' : 'inline' }}
                      className="rightError"  />
                      <PrintIcon sx={{ padding: '0',
                      backgroundColor: handleReaderColor(Number(cn.pri)),
                      display: handleReaderColor(Number(cn.pri)) === 'white' ? 'none' : 'inline' }}
                      className="rightError"  />
                      
                    </div>
                  </ListItemButton >
                </Link>

                <Divider />
              </div>
            )


          }) : <p></p>
        }

      </List>
    </div>
  )

}

export default RightPage