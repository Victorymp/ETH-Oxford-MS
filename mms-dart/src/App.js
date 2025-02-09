import './App.css';
import './css/landing.css';
import './css/main.css';
import './js/main.js';
import React, { useState } from 'react';
import News from './Components/News';
import Ai_Agent from './Components/AI_Agent.js';

function App() {
  // Define the data to be passed to the News component
  const newsSources = ['bbc-news', 'cnn', 'guardian'];
  const cities = ['Liverpool', 'Manchester','Birmingham','London','Oxford'];

  const droneDropdown = ()=>{
    document.getElementById("droneDropdown").classList.toggle("show");
  }

  const droneFilterFunction = ()=>{
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
  const [chosenCities, setChosenCities] = useState([]);
  const [startExtraction, setStartExtraction] = useState(false);
  const [sliderValue, setSliderValue] = useState(0.5); // Slider value in state
  const [politicalScale, setPoliticalScale] = useState('left');
  const [startDesirability, setStartDesirability] = useState(false);
  const [ArticalArray, setArticalArray] = useState([]);


  const handleCityClick = (city) => {
    const updatedCities = [...chosenCities, city];
    setChosenCities(updatedCities);
    console.log('Chosen cities: ', updatedCities);
  }

  const handleStartExtraction = () => {
    console.log('Start extraction');
    if (chosenCities.length === 0) {
      console.log('No cities chosen');
      alert('Please choose a city');
      return;
    }
    setStartExtraction(true);
  }

  const handleAgentClick = () => {
    const text_div = document.getElementById('text-data');
    const source_text = text_div.getAttribute('text-data');
    if (source_text === null) {
      console.log('No text data found');
      return;
    }
    console.log('AI Agent clicked');
    setArticalArray(source_text);
    setStartDesirability(true);
  }

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    if(event.target.value > 0.5){
      setPoliticalScale('right');
    } else {
      setPoliticalScale('left');
    }
  };

  return (
    <div className="App">
      {/* Render the News component and pass the data as props */}
      <div className="App">
      </div>
      <div className='dashboard'>
        <div className="button-group">
        <label htmlFor="mySlider">Select a value: </label>
        <input type="range" id="mySlider" name="slider" min="0" max="1" value={sliderValue} step="0.1" onChange={handleSliderChange}></input>
        <span id="sliderValue">{politicalScale}</span>
          <div className="Drone-Dropdown">            
            <button onClick={droneDropdown} className="btn">Location</button>
            <div id="droneDropdown" className="drone-dropdown-content">
              <input type="text" placeholder="Search a location" id="drone-search-input" onKeyUp={droneFilterFunction}></input>
              {cities.map((city, index) => (
                  <a key={index} className="drone-dropdown-item" onClick={() => handleCityClick(city)}>
                    {city}
                  </a>
                ))}
            </div>
          </div>
          <button className="btn" onClick={handleStartExtraction}>Start Extraction</button>
          <button className="btn" onClick={handleAgentClick}>Desirability Analysis</button>
        </div>
        <div>
          {startExtraction &&
          (<News _cities={chosenCities} />)
          }
        </div>
        <div>
          {startDesirability &&
          (<Ai_Agent _politicalSacle={politicalScale} _ArticalArray={ArticalArray} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
