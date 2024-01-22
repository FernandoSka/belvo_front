import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import authService from '../auth_system/auth';

const Navbar = () => {
  const [openBasic, setOpenBasic] = useState(false);
  const [authed, setAuthed] = useState(authService.isAuthenticated());
  const [authedchange, setAuthedChange] = useState(false);
  useEffect(() => {
    if(authed!=authService.isAuthenticated()){
      setAuthed(authService.isAuthenticated())
    }
})
  if(authed!=authService.isAuthenticated()){
    setAuthed(authService.isAuthenticated())
  }
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <Link to="/">
          <MDBNavbarBrand>Belvo</MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas>|||</MDBIcon>
        </MDBNavbarToggler>
      </MDBContainer>
      {authed?(
        <div>
        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-0 mb-lg-0 d-flex input-group w-auto'>
            <MDBNavbarItem className=''>
              <Link to="/login">
                <MDBNavbarLink onClick={authService.logout} active aria-current='page'>
                  Logout
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </div>
      ): (
      <div style={{display:'flex'}}>
      <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-0 mb-lg-0 d-flex input-group w-auto'>
            <MDBNavbarItem className=''>
              <Link to="/login">
                <MDBNavbarLink active aria-current='page'>
                  
                  Login
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-0 mb-lg-0 d-flex input-group w-auto'>
            <MDBNavbarItem className=''>
              <Link to="/register">

                <MDBNavbarLink active aria-current='page'>
                  Register
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
        </div>
        )}
    </MDBNavbar>
  );
}

export default Navbar;