import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <header>
        <Navbar color="light" light expand="md">
          <NavbarBrand id="brand-text" href="/">Nashville Wellness</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://reactjs.org"><img alt="ReactJS: A JavaScript library for building user interfaces" src="images/React-icon.png"></img></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://developer.foursquare.com"><img alt="Foursqaure Developers" src="images/foursquare-logo.png"></img></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap"><img src="images/Google-maps-logo.png" alt="Google Maps API"></img></NavLink>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}