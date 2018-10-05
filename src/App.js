import React, { Component } from 'react';
import './App.css';
import SquareAPI from './API/';
import Map from './component/Map';

class App extends Component {
  constructor(){
    super();
    this.state = {
       venues: [],
       markers: [],
       center: [],
       zoom: 12
    };
  }
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({ markers: Object.assign(this.state.markers, markers)});
  }
  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    SquareAPI.getVenueDetails(marker.id)
      .then(res => console.log(res));
  };

  componentDidMount(){
    SquareAPI.search({
      near:"Nashville, TN",
      query: "coffee",
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
        });
        this.setState({ venues, center, markers });
        console.log(results);
    });
  }
  render() {
    return (
      <div className="App">
        <Map {...this.state}
        handleMarkerClick={this.handleMarkerClick}/>
      </div>
    );
  }
}

export default App;
