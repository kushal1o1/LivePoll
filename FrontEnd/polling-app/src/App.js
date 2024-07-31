

import React from 'react';
import './App.css';
import Polls from './components/Polls';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="Heading">Polling App</h1>
            </header>
            <main>
                <Polls />
            </main>
        </div>
    );
}

export default App;
