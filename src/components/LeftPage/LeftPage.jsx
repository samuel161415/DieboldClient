import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
import DevicesIcon from '@mui/icons-material/Devices';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import AtmIcon from '@mui/icons-material/Atm'
import { userRequest } from '../../requestMethods';
import { atms } from '../../assets/atmNames';
import { outOfService, parked_atms } from '../../assets/ourOfService';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import HideSourceIcon from '@mui/icons-material/HideSource';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LocalParkingIcon from '@mui/icons-material/LocalParking';


function LeftPage(props) {

  const [tempResult, setTempResult] = useState({})
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataIntervalId = useRef();
  fetchDataIntervalId.current = setInterval(() => {
    setFetchDataTrigger(Date.now());
  }, 120000);

  const admin = props.user.admin;


  useEffect(() => {
    const makeRequest = async () => {

      // console.log('called');

      try {

        const res = await userRequest.get('/status');

        // console.log('data fetched',res.data.result);
        setTempResult(res.data)
        props.setResult(res.data.result)
        props.setAtms(res.data.atmIds)
        

      }
      catch (err) {

      }
    }
    makeRequest()
    return () => clearInterval(fetchDataIntervalId.current);




  }, [fetchDataTrigger])

  const [open, setOpen] = React.useState(false)
  const [operUser, setOpenUser] = React.useState(false)

  const handleClick = () => {
    setOpen(!open);
  };
  const handleManage = () => {
    setOpenUser(!operUser)
  }
  return (
    <div className="left_page">
      <List
        sx={{
          width: '100%', maxWidth: 360, bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Display Options
          </ListSubheader>
        }
      >

        <ListItemButton key={1} sx={{ m: 0 }}
          onClick={() => {
            props.setAtms(tempResult.atmIds)
            props.setTitle('All online atms')
          }}>
          <ListItemIcon>
            <AtmIcon />
          </ListItemIcon>
          <ListItemText primary="All online atms" />
        </ListItemButton>
        <ListItemButton key={3} sx={{ m: 0 }}
          onClick={() => {
            //console.log('return value is',outOfService(tempResult.atmIds));
            props.setAtms(outOfService(tempResult.atmIds))
            props.setTitle('Out of service')
          }}>
          <ListItemIcon>
            <HideSourceIcon />
          </ListItemIcon>
          <ListItemText primary="Offline" />
        </ListItemButton>
        <ListItemButton key={3} sx={{ m: 0 }}
          onClick={() => {
            //console.log('return value is',outOfService(tempResult.atmIds));
            props.setAtms(parked_atms)
            props.setTitle('Parked atms')
          }}>
          <ListItemIcon>
            <LocalParkingIcon sx={{color:'red'}}/>
          </ListItemIcon>
          <ListItemText primary="Parked atms" />
        </ListItemButton>
        <ListItemButton key={2} onClick={handleClick} sx={{ m: 0 }}>
          <ListItemIcon>
            <WorkspacesIcon />
          </ListItemIcon>
          <ListItemText primary="Based on group" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            <ListItemButton key={4} sx={{ pl: 6, m: 0 }}
              onClick={() => {
                props.setAtms(tempResult.categories.hardware_categories)
                props.setTitle('Atms with hardware issues')
              }}>
              <ListItemIcon>
                <DevicesIcon />
              </ListItemIcon>
              <ListItemText primary="Hardware error" />
            </ListItemButton>
            <Divider light />
            <ListItemButton key={5} sx={{ pl: 6, m: 0 }}
              onClick={() => {
                props.setAtms(tempResult.categories.cashout_categories)
                props.setTitle('Atms with cashout issues')
              }}>
              <ListItemIcon>
                <WorkOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Cashout error" />
            </ListItemButton>
            <Divider light />
            <ListItemButton key={6} sx={{ pl: 6, m: 0 }}
              onClick={() => {
                props.setAtms(tempResult.categories.inservice_categories)
                props.setTitle('Inservice Atms')
              }}>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Inservice" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton key={7} onClick={handleManage} sx={{
          m: 0,
          display: admin ? 'inlin' : 'none'
        }}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Manage user" />
          {operUser ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={operUser} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={'/signup'} style={{
              textDecoration: 'none', color: 'black',
            }}>

              <ListItemButton key={8} sx={{ pl: 6, m: 0 }}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Create users" />
              </ListItemButton></Link>
            <Link to={'/update'} style={{
              textDecoration: 'none', color: 'black',
            }}>
              <ListItemButton key={9} sx={{ pl: 6, m: 0 }}>
                <ListItemIcon>
                  <PersonPinIcon />
                </ListItemIcon>
                <ListItemText primary="Update users" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>


      </List>
    </div>
  )
}

export default LeftPage