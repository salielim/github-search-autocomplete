import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import SearchBox from './SearchBox';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
        <SearchBox />
      </div>
    );
  }
}

export default App;
