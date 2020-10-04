import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// import { isEmpty } from 'lodash';
import * as sortAlgoritms from '../../utils';

const algorthms = {
  bubbleSort: 'Bubble Sort',
  insertionSort: 'Instertion Sort',
  selectionSort: 'Selection Sort',
  mergeSort: 'Merge Sort',
  quickSort: 'Quick Sort',
};

export default function Chart({ arrayToSort, algorithm }) {
  // const initialData = [...data];
  const chartReference = React.useRef();
  const [data, setData] = React.useState([...arrayToSort]);

  // React.useEffect(() => {
  //   console.log(chartReference);
  // }, []);

  // function run() {
  //   const iterator = sortAlgoritms[algorithm](data);

  //   const intervalId = setInterval(() => {
  //     const { value, done } = iterator.next();

  //     if (done) {
  //       clearInterval(intervalId);
  //       return;
  //     }

  //     if (
  //       !isEmpty(
  //         chartReference?.current?.chartInstance?.config?.data?.datasets?.[0]
  //           ?.data
  //       )
  //     ) {
  //       console.log(value);
  //       chartReference.current.chartInstance.config.data.datasets[0].data = value;
  //       chartReference.current.chartInstance.update();
  //     }
  //   }, 1);
  // }

  function run() {
    sortAlgoritms[algorithm]({
      arr: data,
      left: 0,
      right: data.length - 1,
      chart: chartReference.current.chartInstance,
    });
  }

  function resetMe() {
    // if (
    //   !isEmpty(
    //     chartReference?.current?.chartInstance?.config?.data?.datasets?.[0]
    //       ?.data
    //   )
    // ) {
    //   chartReference.current.chartInstance.config.data.datasets[0].data = initialData;
    //   chartReference.current.chartInstance.update();
    // }
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
      <button className="btn" type="button" onClick={() => run()}>
        Run
      </button>
      <button className="btn" type="button" onClick={() => resetMe(true)}>
        Reset
      </button>
    </div>
  );
}

Chart.propTypes = {
  arrayToSort: PropTypes.arrayOf(Number).isRequired,
  algorithm: PropTypes.string.isRequired,
};
