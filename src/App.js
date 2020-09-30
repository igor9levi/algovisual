import React from 'react';
import './App.css';
import Chart from './components/Chart';
import unsortedArray from './const';

function App() {
  return (
    <div className="App">
      <header className="App-header">Sorting algorithm comparison</header>
      <main>
        <Chart data={unsortedArray} label="Bubble Sort" />
      </main>
    </div>
  );
}

export default App;
