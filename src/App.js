/*
 * React-based map listing Juice and Coffee venues in Nashville, TN, utilizing Foursquare and Google Maps APIs.
 *
 * Acknowledgements to Forrest Walker for his YouTube walkthrough: https://goo.gl/XrrXg9
 */

import React, { Component } from "react";
// Stylesheets
import "./css/App.css";
import "./css/Fonts.css"
// API
import SquareAPI from "./API/";
// Basic components
import Map from "./component/Map";
import SideBar from "./component/SideBar";
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
import * as googleMapsAPI from "./data/API_credentials";
import ErrorBoundary from "./helpers/errorBoundaries"
import { alertMessage, googleAPI } from "./helpers/alertMessage.js"



// Map component
class App extends Component {
  constructor() {
    super();
    // Initialize state
    this.state = {
      venues: [],
      markers: [],
      center: [],
      defaultCenter: [],
      zoom: 11,
      googleMapURL: `${googleMapsAPI.url}${googleAPI.googleMaps.params}`,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
  // Function to close all markers
  closeAllMarkers = () => {
    // Map over each marker and set isOpen to false
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  // Function for user marker click
  handleMarkerClick = marker => {
    // Close all markers by mapping over all of them and setting each isOpen to false
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id)
      .then(res => {
        const newVenue = Object.assign(venue, res.response.venue);
        this.setState({ venues: Object.assign(this.state.venues, newVenue) })
      });
  };

  // Function to handle list item click
  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id)
    this.handleMarkerClick(marker)
  };

  // Function to handle error from Foursquare
  handleError = (error) => {
    this.setState({ error })
    alertMessage("Foursquare API error")
  };

  // Search query to Foursquare API
  searchVenues = (query, limit) => {
    SquareAPI.search({
      // near: "Nashville, TN", // for Markers
      ll: this.state.geo || "36.04,-86.74",
      // ll: {lat: success.crd.latitude, lng: success.crd.longitude},
      // ll: {lat: crd.latitude, lng: crd.longitude},
      query: query,
      limit: limit,
    }).then(res => {
      // Try HTML5 geolocation
      navigator.geolocation.getCurrentPosition((position) => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.setState({ geo: `${pos.lat},${pos.lng}` }) // Throws error: `this` is
        console.log(pos)
      });

      // About to call setState using these values
      const { venues } = res.response; // Sets venues to API data
      const center = { lat: 36.04, lng: -86.74 }; // for map view (?)
      // const center = {  lat: `${success.crd.latitude}`, lng: `${success.crd.longitude}`}; // Throws API error, not in console
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      })
      this.setState({ venues, center, markers }); // Sets state which is passed down to Map (?)component
      // Error for foursquare API call failure
    }).catch(error => {
      // pass error message(s) to handelError()
      this.handleError(error)
    })
  };
  // After mount of App component
  componentDidMount = () => {
    // Pass these into Foursquare search query above
    this.searchVenues("juice+coffee", "25");
  };

  render() {
    return (
      <div className="App container-fluid">
        <Navbar />
        <div className="row">
          <SideBar {...this.state} handleListItemClick={this.handleListItemClick} />
          <div className="col full-height">
            <ErrorBoundary>
              <Map
                role="complementary"
                aria-label="map"
                {...this.state}
                closeAllMarkers={this.closeAllMarkers}
                handleMarkerClick={this.handleMarkerClick} />
            </ErrorBoundary>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
