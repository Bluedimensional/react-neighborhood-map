import React from 'react';
import {  Container } from 'reactstrap';

export default class Footer extends React.Component {
    render() {
      return (
          <Container className="footer"> 
          <a href="https://www.udacity.com"><img className="img-fluid" alt="Udacity" src="images/udacity-logo.png"></img></a>
            <span>Part of the Front-End Developer Nanodegree</span>
            <a href="http://reactjs.org"><img className="img-fluid" alt="React" src="images/react-logo.png"></img></a>    
          </Container>
      );
    }
  }