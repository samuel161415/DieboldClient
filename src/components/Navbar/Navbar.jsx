import "./navbar.css"
//import SearchIcon from '@mui/icons-material/Search';
import icon from '../../assets/icon.png'
function Navbar() {
    return (
      
        <div className="navBar">
        
                <img src={icon} className='icon' alt="lldk"/>
                <h2 style={{textDecoration:'none'}}>DIEBOLD MONITORING</h2>

         
             </div>

    );
  }
  
  export default Navbar;