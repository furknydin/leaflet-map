import React from 'react';
import './App.css';
import Login from './components/Login';
import MapComponent from './components/MapComponent';

function App() {
  return (
    <div className="App">
      <h1>Harita Uygulaması</h1>
      <MapComponent />
    </div>
  );
}

export default App;
