import React, { useState} from "react";
import "./App.css";

function App() {
  const api = {
    base: "http://api.openweathermap.org/data/2.5/",
    key: "857c9713e8955051b03bba131a833160",
  };

  const [name, setName] = useState("");
  const [weather, setWeather] = useState([]);

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${name}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setName("");
          console.log(result);
        });
    }
  };

  return (
    <div className="App">
      <main>
        <div>
          <input
            type="text"
            placeholder="Search place"
            onChange={(e) => setName(e.target.value)}
            value={name}
            onKeyPress={search}
          />
        </div>
        <div>
            City: {weather.name}
        </div>
        
      </main>
    </div>
  );
}

export default App;
