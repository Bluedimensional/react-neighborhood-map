import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SquareAPI from './API/';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
