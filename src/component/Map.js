/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const MyMapComponent = withScriptjs(
	withGoogleMap(props => (
	  <GoogleMap
	    defaultZoom={8}
	    zoom={props.zoom}
	    defaultCenter={{ lat: -36.186, lng: -87.066 }}
	    // defaultCenter={

	    // }
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
							<img src={`${venueInfo.bestPhoto.prefix}300x300${venueInfo.bestPhoto.suffix}`} alt={venueInfo.name} />
						<p>{venueInfo.name}</p>
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
			  containerElement={<div className="" style={{ height: `100%`, width: `100%` }} />}
			  mapElement={<div style={{ height: `100%`}} />}
			/>
		);
	}
}