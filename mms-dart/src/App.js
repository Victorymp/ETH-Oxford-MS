import './App.css';
import './css/landing.css';
import './css/main.css';
import './js/main.js';
import React, { useState } from 'react';
import News from './Components/News';
import Ai_Agent from './Components/AI_Agent.js';
import { test } from './services/quickTest.js'; // Import the XRP test functionality

function App() {
  // Existing state declarations for news and city selection
  const newsSources = ['bbc-news', 'cnn', 'guardian'];
  const cities = ['Liverpool', 'Manchester','Birmingham','London','Oxford'];
  
  // State management for various features
  const [chosenCities, setChosenCities] = useState([]);
  const [startExtraction, setStartExtraction] = useState(false);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [politicalScale, setPoliticalScale] = useState('left');
  const [startDesirability, setStartDesirability] = useState(false);
  const [ArticalArray, setArticalArray] = useState([]);
  // New state for XRP testing status
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [showNews, setShowNews] = useState(true); // New state for toggling news visibility
  let cityChosen = chosenCities.length > 0; // New state for city selection

  // Dropdown functionality for city selection
  const droneDropdown = () => {
    document.getElementById("droneDropdown").classList.toggle("show");
  }

  const droneFilterFunction = () => {
    var input, filter, ul, li, a, i;
    input = document.getElementById("drone-search-input");
    var filter = input.value.toUpperCase();
    var div = document.getElementById("droneDropdown");
    var a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      var txtValue = a[i].textContent || a[i].innerText;
      
      if (txtValue.toUpperCase().indexOf(filter) > -1 ) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  // Handler for city selection
  const handleCityClick = (city) => {
    const updatedCities = [...chosenCities, city];
    setChosenCities(updatedCities);
    console.log('Chosen cities: ', updatedCities);
    cityChosen = true;
  }

  // Handler for starting news extraction
  const handleStartExtraction = () => {
    console.log('Start extraction');
    if (chosenCities.length === 0) {
      console.log('No cities chosen');
      alert('Please choose a city');
      return;
    }
    setStartExtraction(true);
  }

  // Handler for AI agent analysis
  const handleAgentClick = () => {
    const newArticleContainer = document.getElementById('new-article');
    const newsArticles = document.querySelectorAll('.news-article p');
    if (newsArticles === null) {
      console.log('No text data found');
      return;
    }
    console.log('AI Agent clicked');
    const articleArray = [];
    newsArticles.forEach((article) => {
      articleArray.push(article.textContent);
    });
    
    console.log('Article array length: ', articleArray.length);
    setArticalArray(articleArray);
    setStartDesirability(true);
  }

  // Handler for political scale slider
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    if(event.target.value > 0.5){
      setPoliticalScale('right');
    } else {
      setPoliticalScale('left');
    }
  };

  // New handler for XRP testing
  const handleXRPTest = async () => {
    setIsTestRunning(true);
    try {
      await test(); // Execute the XRP test function
      console.log('XRP test completed successfully');
      alert('Trustline and token completed successfully');
    } catch (error) {
      console.error('XRP test failed:', error);
      alert('XRP test encountered an error. Check console for details.');
    } finally {
      setIsTestRunning(false);
    }
  };

  // New handler for toggling news visibility
  const handleToggleNews = () => {
    setShowNews(!showNews);
  };

  return (
    <div className="App">
      <div className="App">
      </div>
      <div className='dashboard'>
        <div className="button-group">
          <label htmlFor="mySlider">Select a value: </label>
          <input 
            type="range" 
            id="mySlider" 
            name="slider" 
            min="0" 
            max="1" 
            value={sliderValue} 
            step="0.1" 
            onChange={handleSliderChange}
          ></input>
          <span id="sliderValue">{politicalScale}</span>
          
          <div className="Drone-Dropdown">            
            <button onClick={droneDropdown} className="btn">Location</button>
            <div id="droneDropdown" className="drone-dropdown-content">
              <input 
                type="text" 
                placeholder="Search a location" 
                id="drone-search-input" 
                onKeyUp={droneFilterFunction}
              ></input>
              {cities.map((city, index) => (
                <a 
                  key={index} 
                  className="drone-dropdown-item" 
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </a>
              ))}
            </div>
          </div>
          
          <button className="btn" onClick={handleStartExtraction}>
            Start Extraction
          </button>
          
          <button className="btn" onClick={handleAgentClick}>
            Desirability Analysis
          </button>
          
          {/* New XRP test button */}
          <button 
            className="btn" 
            onClick={handleXRPTest}
            disabled={isTestRunning}
          >
            {isTestRunning ? 'Setting Up Investment Channel...' : 'Setup Investemnt Channel'}
          </button>

          <button className="btn" onClick={handleToggleNews}>
            {showNews ? 'Hide News Articles' : 'Show News Articles'}
          </button>
        </div>
        {cityChosen && <div>
          <h1>Chosen City for portfolio analysis</h1>
          <ul>
            {chosenCities.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>}
        <div>
          {startExtraction && <News _cities={chosenCities} showNews={showNews} />}
        </div>
        <div>
          {startDesirability && 
            <Ai_Agent 
              _politicalSacle={politicalScale} 
              _ArticalArray={ArticalArray} 
            />
          }
        </div>
      </div>
    </div>
  );
}

export default App;