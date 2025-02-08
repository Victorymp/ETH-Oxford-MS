import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import News from './Components/News';

function App() {
  return (
    <div className="App">
      <div className="App">
        <News _sources={['bbc-news', 'cnn']} _q="technology" _category="technology" />
      </div>
    </div>
  );
}

export default App;
