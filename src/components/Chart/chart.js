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

export default function Chart({ arrayToSort, algorithm }) {
  const chartReference = React.useRef();
  const [data, setData] = React.useState([...arrayToSort]);

  React.useEffect(() => {
    setData([...arrayToSort]);
  }, [arrayToSort]);

  function run() {
    sortAlgoritms[algorithm]({
      arr: data,
      left: 0,
      right: data.length - 1,
      chart: chartReference.current.chartInstance,
    });
  }

  function resetMe() {
    setData([...arrayToSort]);
  }

  const options = {
    animation: {
      easing: 'easeOutQuart',
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
      <Bar
        key={Math.random()}
        ref={chartReference}
        data={barData}
        options={options}
      />
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
};
