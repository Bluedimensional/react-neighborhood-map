/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const MyMapComponent = withScriptjs(
	withGoogleMap(props => (
	  <GoogleMap
	    defaultZoom={8}
	    zoom={props.zoom}
	    defaultCenter={{ lat: -36.186, lng: -87.066 }}
	    center={{
	    	lat: parseFloat(props.center.lat),
	    	lng: parseFloat(props.center.lng)
	    }}
	  >
	    {props.markers &&
	    	props.markers.filter(marker => marker.isVisible).map((marker, idx, arr) => {
	    		const venueInfo = props.venues.find(venue => venue.id === marker.id);
			return (
				<Marker
					key={idx}
					position={{ lat: marker.lat, lng: marker.lng }}
					onClick={() => props.handleMarkerClick(marker)}
					animation={arr.length === 1
						? google.maps.Animation.BOUNCE
						: google.maps.Animation.DROP}
			>
				{marker.isOpen &&
					venueInfo.bestPhoto && (
					<InfoWindow>
						<React.Fragment>
							<div className="place">
								<img src={`${venueInfo.bestPhoto.prefix}100x100${venueInfo.bestPhoto.suffix}`} alt={venueInfo.name} />
							<h4 className="venue-name">{venueInfo.name}</h4>
							<p className="venue-address"> {venueInfo.location['address']}</p>
							<p className="venue-phone"><a href="tel:{venueInfo.contact.phone}"> {venueInfo.contact.phone}</a></p>
							<p className="venue-rating">{venueInfo.rating && <span>Rating: {venueInfo.rating}</span>}</p>
							{venueInfo.price && <p> Price: {venueInfo.price['message']}</p>}
							{/* <p> {venueInfo.description}</p> */}
							<p className="venue-webpage"><a href="{venueInfo.url}">Website</a> </p>
							{/* <p> {venueInfo.categories[]}</p> */}
							</div>
						</React.Fragment>
					</InfoWindow>
				)}
			</Marker>
			);
		})}
	  </GoogleMap>
	))
);



export default class Map extends Component {
	render() {

		return (
			<MyMapComponent
			{...this.props}
			  isMarkerShown
			  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgtzCcU3cMjtTQJ03SRVa1-CNoPn7HkpA"
			  loadingElement={<div style={{ height: `100%` }} />}
			  containerElement={<div className="col" style={{ height: `100%`, width: `100%` }} />}
			  mapElement={<div style={{ height: `100%`}} />}
			/>
		);
	}
}