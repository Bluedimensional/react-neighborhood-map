import React from 'react';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';
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
          <NavbarBrand id="brand-text" href="/" className="mr-auto">Thirsty in Nashville</NavbarBrand>    
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
					  <span className="navbar-toggler-icon"></span>
					</button>
        </Navbar>
      </div>
    );
  }
}