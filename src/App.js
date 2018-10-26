import React, { Component } from "react";
import "./css/App.css";
import "./css/Fonts.css"
import SquareAPI from "./API/";
import Map from "./component/Map";
import SideBar from "./component/SideBar";
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
import * as googleMapsAPI from "./data/API_credentials";
import ErrorBoundary from "./helpers/errorBoundaries"

// Detect authentication failure, such as invalied or missing Google Maps API key
window.gm_authFailure = () => {
  const newAlert = document.createElement("div");
      newAlert.setAttribute("class", "alert alert-warning")
      newAlert.setAttribute("role", "alert")
      document.getElementById("navbar").appendChild(newAlert);
      newAlert.innerHTML = "Google Maps API error";
  // alert("Please check your Google API key")
}

// {null.map(errorTestSwitch => errorTestSwitch)}

// Google Maps API
const APIs = {
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
      zoom: 14,
      googleMapURL: `${googleMapsAPI.url}${APIs.googleMaps.params}`,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  // Function for user marker click
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) })
      console.log(newVenue);
    });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id)
    this.handleMarkerClick(marker)
  }

  handleError = (error) => {
    this.setState({ error })
    // Alert element for foursquare API error
    const newAlert = document.createElement("div");
      newAlert.setAttribute("class", "alert alert-warning")
      newAlert.setAttribute("role", "alert")
      document.getElementById("navbar").appendChild(newAlert);
      newAlert.innerHTML = "Foursquare API error";
  }

  searchVenues = (query, limit) => {
    SquareAPI.search({
      near: "Nashville, TN",
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
      // console.log(error)
      // pass error message(s) to handelError()
      this.handleError(error)
    })
  }


  componentDidMount() {
    this.searchVenues("juice+coffee", "10");
  }

  render() {
    return (
      <div className="App container-fluid">
        <Navbar />
        {/* <TopNav/> */}
        <div className="row">
          <SideBar {...this.state} handleListItemClick={this.handleListItemClick} />
          <div className="col full-height">
            <ErrorBoundary>
              <Map {...this.state}
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
