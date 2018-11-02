/*
 * React-based map listing Juice and Coffee venues in Nashville, TN, utilizing Foursquare and Google Maps APIs.
 *
 * Acknowledgements to Forrest Walker for his YouTube walkthrough: https://goo.gl/XrrXg9
 * 
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

// Geolocation - snippet from MDN


// Detect authentication failure, such as invalied or missing Google Maps API key
window.gm_authFailure = () => {
  alertMessage("Google Maps API error")
}

// Needs const since it is in global scope
const alertMessage = (alertString) => {
  const newAlert = document.createElement("div");
  newAlert.setAttribute("class", "alert alert-warning")
  newAlert.setAttribute("role", "alert")
  document.getElementById("navbar").appendChild(newAlert);
  newAlert.innerHTML = alertString;
  
}

// Google Maps API
const googleAPI = {
  googleMaps: {
    // `params` attribute allows us to string multiple query together
    params: new URLSearchParams({
      // API stored in separate file
      key: `${googleMapsAPI.key}`,
    })
  },
}

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
      zoom: 14,
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
  }

  // Function to handle error from Foursquare
  handleError = (error) => {
    this.setState({ error })
    alertMessage("Foursquare API error")
  }

  // Search query to Foursquare API
  searchVenues = (query, limit) => {
    SquareAPI.search({
      // This works
      near: "Nashville, TN",
      // Foursquare docs say ll can be used but it doesn't work for me https://developer.foursquare.com/docs/api/venues/search
      // ll: "36.04,-86.74",
      query: query,
      limit: limit
    }).then(res => {
      const { venues } = res.response;
      const { center } = res.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      })
      this.setState({ venues, center, markers });
      // Error for foursquare API call failure
    }).catch(error => {
      // pass error message(s) to handelError()
      this.handleError(error)
    })
  }
  // After mount of App component
  componentDidMount() {
    // Pass these into Foursquare search query above
    this.searchVenues("juice+coffee", "10");

    // Geolocation snippet based on MDN's example
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    // Success function for current position
    const success = (pos) => {
      const crd = pos.coords;
      
      console.log('Your current position is:');
      console.log(`Lat: ${crd.latitude}`);
      console.log(`Lng: ${crd.longitude}`);
      // Does this need parseFloat()?
      this.setState({center: {lat: crd.latitude, lng: crd.longitude}})
      this.setState({defualtCenter: {lat: crd.latitude, lng: crd.longitude}})
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);

    // console.log(`${crd.latitude}`)
  }

  
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
