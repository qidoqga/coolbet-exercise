import React from 'react';
import Leaderboard from './Leaderboard';
import leaderbordLogo from '/leaderboard.png';
import './App.css';

function App() {
    return (
        <div className="App">
            <header>
                <img src={leaderbordLogo} className="logo" alt="Leaderboard logo" />
                <h1>Betting Leaderboard</h1>
            </header>
            <Leaderboard />
        </div>
    );
}

export default App;