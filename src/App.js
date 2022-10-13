import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ScanReader from "./components/ScanReader/ScanReader";

function App() {
  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState(null);
  const onDetected = (result) => {
    setResult(result);
    console.log(result);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <p>{result ? result : "Scanning..."}</p>
      <button onClick={() => setCamera(!camera)}>
        {camera ? "Stop" : "Start"}
      </button>
      <div className="container">
        {camera && <ScanReader onDetected={onDetected} />}
      </div>
    </div>
  );
}

export default App;
