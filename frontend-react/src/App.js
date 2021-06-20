import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  useEffect( ()=> {
    getItems();
  }, []);

  const getItems = async () => {
    const response = await fetch('http://localhost:3000/api/retrieve');
    const all_items = await response.json();
    setItems(all_items);
  }
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
