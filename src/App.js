import React from 'react';
import './App.css';
import Bars from './Components/Bars/Bars.js';
import Navbar from './Components/Navbar/Navbar.js';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Bars />
        </div>
    );
}

export default App;
