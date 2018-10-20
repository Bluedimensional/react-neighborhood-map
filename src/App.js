import React, { Component } from "react";
import "./css/App.css";
import "./css/Fonts.css"
import SquareAPI from "./API/";
import Map from "./component/Map";
import SideBar from  "./component/Sidebar";
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
class App extends Component {git
  constructor(){
    super();
    this.state = {
       venues: [],
       markers: [],
       center: [],
       zoom: 14,
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

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue =this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
        const newVenue = Object.assign(venue, res.response.venue);
        this.setState({ venues: Object.assign(this.state.venues, newVenue) })
        console.log(newVenue);
      });
  };

  handleListItemClick = venue =>{
    const marker = this.state.markers.find(marker => marker.id === venue.id)
    this.handleMarkerClick(marker)
  }

  searchVenues = (query, limit) => {
    SquareAPI.search({
      near:"Nashville, TN",
      query: query,
      limit: limit
    }).then(results => {
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;
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
        // console.log(process.env.REACT_APP_FOURSQUARE_CLIENT_ID)
    }).catch(error => {
      console.log(error)
      // Create new alert element
      const newAlert = document.createElement("div");
      // Set attributes to be boostrap alert element
      newAlert.setAttribute("class", "alert alert-warning")
      newAlert.setAttribute("role", "alert")
      // Update content of new alert element
      newAlert.innerHTML = "Warning: Data retrieval from API source Foursquare failed.";
      // Get header element and append new alert.
      document.getElementsByTagName("header")[0].appendChild(newAlert);
    })
  }

  componentDidMount(){
    this.searchVenues("yoga+coffee", "10");
  }

  render() {
    return (
      <div className="App container-fluid">
        <Navbar/>
        <div className="row">
          <div className="col-xs-3">
          <button className="btn btn-info btn-large" onClick ={() => this.searchVenues("yoga+coffee", "5")}>5</button>
            <button  className="btn btn-info btn-large" onClick ={() => this.searchVenues("yoga+coffee", "10")}>10</button>
            <button  className="btn btn-info btn-large" onClick ={() => this.searchVenues("yoga+coffee", "15")}>15</button>
            <SideBar {...this.state} handleListItemClick={this.handleListItemClick}/>
          </div>
          <div className="col-md-9 full-height">
            <Map {...this.state}
            handleMarkerClick={this.handleMarkerClick}/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
