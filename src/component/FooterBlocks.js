import React from 'react';
import { Col, Media } from 'reactstrap';

export default class FooterBlocks extends React.Component {
  render() {
    return (
      <footer className="pt-3 pb-3 row">
      <div className="col-sm-12 mb-3"><h4 className="text-center secondary-branded">Resources used in this app</h4></div>
          <Col sm={{ size: 4 }}>
            <Media href="https://reactjs.org">
              <Media className="img-fluid" object src="images/React-icon.png" alt="A JavaScript library for building user interfaces" />
              </Media>
              <Media body>
                <Media heading>
                    React
                </Media>
                A JavaScript library for building user interfaces
              </Media>
            </Col>
          <Col sm={{ size: 4 }}>
            <Media href="https://developer.foursquare.com">
              <Media className="img-fluid d-inline-flex" object src="images/foursquare-logo.png" alt="Foursqaure Developers" />
              </Media>
              <Media body>
                <Media heading>
                    Foursqaure Developers
                </Media>  
              Places API for location-based experiences
            </Media>
          </Col>
          <Col sm={{ size: 4 }}>
            <Media className="img-fluid" href="https://developers.google.com/maps/documentation/">
                <Media object src="images/Google-maps-logo.png" alt="Google Maps API" />
                </Media>
                <Media body>
                  <Media heading>
                      Google Maps API
                  </Media>
                  The power of customized Google Maps
              </Media>
          </Col>
      </footer>
    );
  }
}