import React from 'react';

export default class FooterBlocks extends React.Component {
  render() {
    return (
      <footer className="pt-3 pb-3 row">
        <div className="col-sm-12 mb-3"><p>Resources used in this app include <a href="https://developer.foursquare.com">Foursqaure API</a> for venue details, <a href="https://developers.google.com/maps/documentation/">Google Maps API</a> for the custom Google Map, and <a href="https://reactjs.org">ReactJS</a> JavaScript library.</p></div>
      </footer>
    );
  }
}