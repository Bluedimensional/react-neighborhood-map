import React, { Component } from 'react';
import VenueList from "./Venuelist";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
  } from 'reactstrap';
// import { Button, Grid, Row, Col } from 'react-bootstrap';

export default class Sidebar extends Component {
	constructor() {
		super();
		this.state = {
			query: "",
			venues: []
		};
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
		return(
			<div className="sidebar">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a id="brand-text" className="navbar-brand" href="#">Nashville Yoga & Coffee</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						</ul>
							<input
								type={"search"}
								id={"search"}
								placeholder={"Filter venues"}
								onChange={this.handleChange}
							/>
							<VenueList
								{...this.props}
								venues={this.handleFilterVenues()}
								handleListItemClick={this.props.handleListItemClick} />
					</div>
				</nav>
			</div>
		);
	}
}