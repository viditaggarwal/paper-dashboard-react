import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
import { updateStockName, fetchAllStocks } from '../../actions/stockActions';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';  // Import the CSS
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';


function Header(props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    return (
      <div style={{width: '100px'}}>
          <img alt="..." src={require("../../assets/img/logo-name-bg.png")} />
      </div>
    );
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  


  return (
    <Navbar className={"navbar-absolute fixed-top " + (color === "transparent" ? "navbar-transparent " : "")}>
        <Container fluid>
            {/* Desktop View */
            }
            <div className="d-none d-lg-flex justify-content-between align-items-center w-100">
                <NavbarBrand href="/">{getBrand()}</NavbarBrand>
                {location.pathname !== "/" && (<SearchBar />)}
                <NavItem style={{ listStyleType: 'none' }}>
                    <Link to="#pablo" className="nav-link btn-rotate">
                    <i className="nc-icon nc-settings-gear-65" onClick={() => setDrawerOpen(!isDrawerOpen)} />
                    {isDrawerOpen && (
                        <div className="drawer">
                            <Link to="/profile">Profile</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    )}
                    </Link>
                </NavItem>
            </div>
            
            {/* Mobile View */}
            <div className="d-flex d-lg-none justify-content-between align-items-center w-100">
                <NavbarBrand className="text-center flex-grow-1" href="/">{getBrand()}</NavbarBrand>
                <NavItem style={{ listStyleType: 'none' }}>
                    <Link to="#pablo" className="nav-link btn-rotate">
                        <i className="nc-icon nc-settings-gear-65" onClick={() => setMobileDrawerOpen(true)} />
                    </Link>
                </NavItem>
            </div>
            <div className="d-block d-lg-none w-100 mt-2">
              {location.pathname !== "/" && (<SearchBar />)}
            </div>

            {isMobileDrawerOpen && (
                <div className="mobile-drawer">
                    <button className="close-drawer" onClick={() => setMobileDrawerOpen(false)}>X</button>
                    <div className="drawer-content">
                        <Link to="/profile">Profile</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                </div>
            )}
        </Container>
    </Navbar>
  );
}

export default Header;
