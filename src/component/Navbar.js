import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import SideBar from './Sidebar'
export default class Topnav extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleFilterVenues = () => {
		if(this.state.query.trim() !== "") {
			const venues = this.props.venues.filter(venue => venue.name
				.toLowerCase()
				.includes(this.state.query.toLowerCase()))
			return venues;
		}
		return this.props.venues;
	};
	handleChange = e => {
		this.setState({ query: e.target.value });

		const markers = this.props.venues.map(venue => {
			const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
			// Get the marker associated with each venue
			const marker = this.props.markers.find(marker => marker.id === venue.id);
			// if match between search input and venue
			if(isMatched) {
				marker.isVisible = true;
			} else {
				marker.isVisible = false;
			}
			return marker;
		});
		this.props.updateSuperState({ markers })
  };
  
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand id="brand-text" href="/" className="mr-auto">Nashville Wellness</NavbarBrand>  
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/components/">
               
			                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <SideBar {...this.state} handleListItemClick={this.handleListItemClick}/>
      </div>
    );
  }
}

// export default class Example extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }
//   render() {
//     return (
//       <header>
//         {/* <Navbar color="light" light expand="md">
//           <NavbarToggler onClick={this.toggle} />
//           <Collapse isOpen={this.state.isOpen} navbar>
//             <Nav className="ml-auto" navbar>
//                 <NavItem>
//                   <NavLink href="#resources">Resources Used</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink href="https://reactjs.org"><img alt="ReactJS: A JavaScript library for building user interfaces" src="images/React-icon.png"></img></NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink href="https://developer.foursquare.com"><img alt="Foursqaure Developers" src="images/foursquare-logo.png"></img></NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink href="https://github.com/reactstrap/reactstrap"><img src="images/Google-maps-logo.png" alt="Google Maps API"></img></NavLink>
//                 </NavItem>
                
//             </Nav>
//           </Collapse>
//         </Navbar> */}
//         <Navbar color="faded" light>
//           <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
//           <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//           <Collapse isOpen={!this.state.collapsed} navbar>
//             <Nav navbar>
//               <NavItem>
//                 <NavLink href="/components/">Components</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//               </NavItem>
//             </Nav>
//           </Collapse>
//         </Navbar>
//       </header>
//     );
//   }
// }