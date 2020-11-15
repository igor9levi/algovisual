import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import * as sortAlgoritms from '../../utils';

const algorthms = {
  bubbleSort: 'Bubble Sort',
  insertionSort: 'Instertion Sort',
  selectionSort: 'Selection Sort',
  mergeSort: 'Merge Sort',
  quickSort: 'Quick Sort',
};

export default function Chart({ arrayToSort, algorithm, shouldRun }) {
  const chartReference = React.useRef();
  const [data, setData] = React.useState([...arrayToSort]);
  const [intervalId, setIntervalId] = React.useState(null);

  function updateChart(arr) {
    if (!Array.isArray(arr)) return;
    chartReference.current.chartInstance.config.data.datasets[0].data = [
      ...arr,
    ];
    chartReference.current.chartInstance.update();
  }

  function stopAnimation(intervalId1) {
    if (intervalId1) {
      setTimeout(() => {
        clearInterval(intervalId);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  function startAnimation(iterator, delay) {
    const interval = setInterval(() => {
      const { value, done } = iterator.next();

      if (!done) {
        updateChart(value);
      } else {
        stopAnimation(true);
      }
    }, delay);

    setIntervalId(interval);
  }

  function run() {
    const speedUpAlgo = ['quickSort', 'bubbleSort'];
    const delay = speedUpAlgo.includes(algorithm) ? 10 : 100;
    const iterator = sortAlgoritms[algorithm](data);

    stopAnimation();
    startAnimation(iterator, delay);
  }

  function resetMe() {
    stopAnimation();
    setData([...arrayToSort]);
  }

  React.useEffect(() => {
    stopAnimation();
    if (shouldRun) {
      run();
    } else {
      setData([...arrayToSort]);
    }
  }, [arrayToSort, shouldRun]);

  const options = {
    animation: {
      easing: 'linear',
    },
    legend: {
      labels: {
        boxWidth: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: {
            callback() {
              return '';
            },
          },
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: false,
          },
        },
      ],
    },
  };

  const barData = {
    labels: data,
    datasets: [
      {
        label: algorthms[algorithm],
        data,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
      },
    ],
  };

  const showButtons = false;

  return (
    <div className="chart">
      <Bar ref={chartReference} data={barData} options={options} />
      {showButtons && (
        <>
          <button className="btn btn-run" type="button" onClick={() => run()}>
            Run
          </button>
          <button
            className="btn btn-reset"
            type="button"
            onClick={() => resetMe()}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}

Chart.propTypes = {
  arrayToSort: PropTypes.arrayOf(Number).isRequired,
  algorithm: PropTypes.string.isRequired,
  shouldRun: PropTypes.bool.isRequired,
};
