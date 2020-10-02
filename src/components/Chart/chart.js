import React from 'react';
import { Bar } from 'react-chartjs-2';
import { isEmpty } from 'lodash';
import * as sortAlgoritms from '../../utils';
import unsortedArray from '../../const';

export default class Chart extends React.Component {
  constructor() {
    super();

    this.chartReference = React.createRef();

    this.state = {
      arrayToSort: [],
      iterator: null,
    };
  }

  run() {
    const iterator = sortAlgoritms.insertionSort(unsortedArray);

    const intervalId = setInterval(() => {
      const { value, done } = iterator.next();

      if (done) {
        clearInterval(intervalId);
        return;
      }
      if (!isEmpty(this.chartReference.current.chartInstance.config)) {
        console.log(
          this.chartReference.current.chartInstance.config.data.datasets[0]
            .data[25]
        );
        this.chartReference.current.chartInstance.config.data.datasets[0].data = value;
        this.chartReference.current.chartInstance.update();
      }
    }, 1);
  }

  render() {
    const { data, label } = this.props;
    const { arrayToSort } = this.state;
    console.log('in render: ', this.state.arrayToSort);
    const options = {
      animation: {
        easing: 'easeOutQuart',
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            ticks: {
              callback(value, index, values) {
                return '';
              },
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
          label,
          data: !isEmpty(arrayToSort) ? arrayToSort : data,
          backgroundColor: 'blue',
          borderColor: 'blue',
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <Bar
          key={Math.random()}
          ref={this.chartReference}
          data={barData}
          width={100}
          height={100}
          options={options}
        />
        <button type="button" onClick={() => this.run()}>
          Run
        </button>
      </div>
    );
  }
}
