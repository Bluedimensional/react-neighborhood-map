/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ErrorBoundary from "../helpers/errorBoundaries"


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
									<InfoWindow onCloseClick={() => props.closeAllMarkers()}>
										<React.Fragment>
											<img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={venueInfo.name} />
											<p>{venueInfo.name}</p>
											<p> {venueInfo.location['address']}</p>
											{venueInfo.rating && <p> Rating: {venueInfo.rating}</p>}
											{venueInfo.price && <p> Price: {venueInfo.price['message']}</p>}
											<p> {venueInfo.description}</p>
											<p> {venueInfo.url}</p>
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
					containerElement={<div className="col" style={{ height: `100%`, width: `100%` }} />}
					mapElement={<div style={{ height: `100%` }} />}
					/>
				</ErrorBoundary>
		);
	}
}