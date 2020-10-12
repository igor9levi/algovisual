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

  function updateChart(arr) {
    if (!Array.isArray(arr)) return;
    chartReference.current.chartInstance.config.data.datasets[0].data = [
      ...arr,
    ];
    chartReference.current.chartInstance.update();
  }

  function run() {
    const delay = algorithm === 'quickSort' ? 10 : 100;
    const iterator = sortAlgoritms[algorithm](data);
    const intervalId = setInterval(() => {
      const { value, done } = iterator.next();
      if (!done) updateChart(value);
      else clearInterval(intervalId);
    }, delay);
  }

  function resetMe() {
    setData([...arrayToSort]);
  }

  React.useEffect(() => {
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

  return (
    <div className="chart">
      <Bar ref={chartReference} data={barData} options={options} />
      <button className="btn btn-run" type="button" onClick={() => run()}>
        Run
      </button>
      <button
        className="btn btn-reset"
        type="button"
        onClick={() => resetMe(true)}
      >
        Reset
      </button>
    </div>
  );
}

Chart.propTypes = {
  arrayToSort: PropTypes.arrayOf(Number).isRequired,
  algorithm: PropTypes.string.isRequired,
  shouldRun: PropTypes.bool.isRequired,
};
