import React,{useState,useContext} from 'react'
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,NavLink,NavbarText
} from "reactstrap"
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import firebase from 'firebase/app'
import { toast } from 'react-toastify'
const Header = () => {

  const context = useContext(UserContext);


  const [isOpen,setIsOpen] = useState(true);


  const  toggle = ()=> setIsOpen(isOpen)


    function logOut(){
        
        firebase.auth().signOut().then(
          ()=>{
            console.log("insideit");
             context.setUser(null);
           return <Redirect to="signin" />
           
          }
        ).catch(
           (error)=>{
            toast(error,{
              type : "error"
            })
          }
        )
        
    }
  return (
    <Navbar color="info" light expand="md">
      <NavbarBrand>
        <Link to="/" className="text-white">Git Finder</Link>
      </NavbarBrand>


     <NavbarText className="text-white">
       {
         context.user?.email? context.user.email:"" 
       }
      </NavbarText>



      <NavbarToggler onClick={toggle}/>
      <Collapse isOpen={isOpen} navbar>
       <Nav className="ml-auto" navbar>
         {
           context.user?(<NavItem>
            <NavLink className="text-white" onClick={logOut} >Logout</NavLink>
          </NavItem>):
          (
           <> 
            <NavItem>
            <NavLink tag={Link} to="/signup" className="text-white">SignUp</NavLink>
            </NavItem>
            <NavItem>
            <NavLink tag={Link} to="/signin" className="text-white">SignIn</NavLink>
             </NavItem>
           </>
          )
         }
         
         
       </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header
