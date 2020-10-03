import React from 'react';
import './App.css';
import Chart from './components/Chart';

const algos = [
  'bubbleSort',
  'insertionSort',
  'selectionSort',
  'mergeSort',
  'quickSort',
];

function App() {
  function createArray() {
    const unsortedArray = [];
    for (let i = 0; i < 50; i += 1) {
      unsortedArray.push(Math.floor(Math.random() * 60 + 1));
    }
    return unsortedArray;
  }
  const [data, setData] = React.useState([...createArray()]);

  return (
    <div className="App">
      <header className="App-header">Sorting algorithm comparison</header>
      <main>
        {algos.map((algo, index) => (
          <Chart key={index} data={data} algorithm={algo} />
        ))}
      </main>
      <button
        className="btn-reset-all"
        type="button"
        onClick={() => setData([...createArray()])}
      >
        Reset All
      </button>
    </div>
  );
}

export default App;
