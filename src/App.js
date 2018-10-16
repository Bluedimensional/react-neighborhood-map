import React, { Component } from 'react';
import './App.css';
import SquareAPI from './API/';
import Map from './component/Map';
import SideBar from  './component/Sidebar';
import Navbar from './component/Navbar'
import Footer from './component/Footer'
// import { Button } from 'reactstrap'

class App extends Component {
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

  componentDidMount(){
    SquareAPI.search({
      near:"Nashville, TN",
      query: "yoga",
      limit: 10
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
    }).catch(error =>{
      console.log("Error: " + error)
    })
  }
  render() {
    return (
      <div className="App container-fluid">
        <Navbar/>
      <div className="row">
        <SideBar {...this.state} handleListItemClick={this.handleListItemClick}/>
        <div className="col-sm-9">
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
