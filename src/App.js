import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import HexCanvas from './HexCanvas';
import { CirclePicker } from 'react-color';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CGNY: Cellular Automaton</h1>
        </header>
        <p className="App-intro">
        </p>
        <HexCanvas />
        <CirclePicker />
      </div>
    );
  }
}

export default App;
