import React, { Component } from 'react';
import './App.css';
import SquareAPI from './API/';
import Map from "./component/Map";

class App extends Component {
  componentDidMount(){
    SquareAPI.search({
      near:"Nashville, TN",
      query: "tacos",
      limit: 10
      }).then(results => console.log(results));
  }
  render() {
    return (
      <div className="App">
        <Map/>
      </div>
    );
  }
}

export default App;
