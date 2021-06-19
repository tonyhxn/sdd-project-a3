import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

    useEffect(()=> {
      console.log('render')
    });

    return (
      <div className="App">
        <form className="search-form">
          <input className="search-bar" type="text"/>
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
    );

}

export default App;
