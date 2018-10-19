import React from 'react';
import {  Container } from 'reactstrap';
import FooterBlocks from './FooterBlocks'

export default class Footer extends React.Component {
    render() {
      return (
          <div>
          {/* <Container className="footer"> 
          <a href="https://www.udacity.com"><img className="img-fluid" alt="Udacity" src="images/udacity-logo.png"></img></a>
            <span></span>
            <a href="http://reactjs.org"><img className="img-fluid" alt="React" src="images/react-logo.png"></img></a>    
          </Container> */}
          <FooterBlocks/>
            
          </div>
      );
    }
  }