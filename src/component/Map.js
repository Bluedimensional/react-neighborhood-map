/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ErrorBoundary from "../helpers/errorBoundaries"


const MyMapComponent = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultZoom={4}
			zoom={props.zoom}
			// defaultCenter={props.defaultCenter}
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
									<InfoWindow onCloseClick={() => props.closeAllMarkers()}>
										<React.Fragment>
											<img className="img-fluid venue-image"src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={venueInfo.name} />
											<h4 className="venue-name">{venueInfo.name}</h4>
											<p>{venueInfo.categories.name}</p>
											<p className="venue-address"> {venueInfo.location['address']}</p>
											<p className="venue-phone"><a href={"tel:" + venueInfo.contact['phone']}>{venueInfo.contact['phone']}</a></p>
											<p><a href={"http://instagram.com/" + venueInfo.contact['instagram']}>Instagram</a></p>
											<p><a href={"http://facebook.com/" + venueInfo.contact['facebook']}>Facebook</a></p>
											{venueInfo.rating && <p className="venue-rating"> Rating: {venueInfo.rating}</p>}
											{venueInfo.price && <p className="venue-price"> Price: {venueInfo.price['message']}</p>}
											<p className="venue-url"><a href={venueInfo.url}>Website</a></p>
											{/* <p> {venueInfo.categories[]}</p> */}
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
			<ErrorBoundary >
				{/* Below is test switch for bad code for errors */}
				              {/* {null.map(errorTestSwitch => errorTestSwitch)}  */}
				<MyMapComponent
					{...this.props}
					isMarkerShown
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `100%`, width: `100%` }} />}
					mapElement={<div style={{ height: `100%` }} />}
					/>
				</ErrorBoundary>
		);
	}
}