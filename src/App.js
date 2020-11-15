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
      unsortedArray.push(Math.floor(Math.random() * 80 + 1));
    }
    return unsortedArray;
  }
  const [data, setData] = React.useState([...createArray()]);
  const [shouldRun, setShouldRun] = React.useState(false);

  return (
    <div className="App">
      <header className="App-header">Sorting algorithm comparison</header>
      <main>
        {algos.map((algo, index) => (
          <Chart
            key={index}
            arrayToSort={data}
            shouldRun={shouldRun}
            algorithm={algo}
          />
        ))}
      </main>
      <button
        className="btn btn-reset-all"
        type="button"
        onClick={() => setShouldRun(true)}
      >
        Run All
      </button>
      <button
        className="btn btn-reset-all"
        type="button"
        onClick={() => {
          setData([...createArray()]);
          setShouldRun(false);
        }}
      >
        Reset All
      </button>
    </div>
  );
}

export default App;
