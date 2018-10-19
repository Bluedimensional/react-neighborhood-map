import React from 'react';
import { Container, Row, Col, Media } from 'reactstrap';

export default class FooterBlocks extends React.Component {
  render() {
    return (
      <Container className="pt-3 pb-3">
        <Row>
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
              <Media className="img-fluid" object src="images/foursquare-logo.png" alt="Foursqaure Developers" />
              </Media>
              <Media body>
                <Media heading>
                    Foursqaure Developers
                </Media>  
              Join over 125,000 developers building location-aware experiences with Foursquare technology and data
            </Media>
          </Col>
          <Col sm={{ size: 4 }}>
            <Media className="img-fluid" href="https://developers.google.com/maps/documentation/">
                <Media object src="images/Google-maps-logo.png" alt="Google Maps API" />
                </Media>
                <Media body>
                  <Media heading>
                      Foursqaure Developers
                  </Media>
                  Build customized, agile experiences that bring the real world to your users with static and dynamic maps,
              </Media>
          </Col>
        </Row>
      </Container>
    );
  }
}