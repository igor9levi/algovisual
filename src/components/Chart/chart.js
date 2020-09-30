import React from 'react';
import { Bar } from 'react-chartjs-2';
import { isEmpty } from 'lodash';
import { bubbleSort, sleep } from '../../utils';
import unsortedArray from '../../const';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      arrayToSort: [],
      iterator: null,
      // barData: {
      //   labels: this.props.data,
      //   datasets: [
      //     {
      //       label: this.props.label,
      //       data: unsortedArray,
      //       backgroundColor: 'blue',
      //       borderColor: 'blue',
      //       borderWidth: 1,
      //     },
      //   ],
      // },
    };
    // this.iterator = null;
  }

  async componentDidUpdate() {
    await sleep(5);
    const result = this.state.iterator.next();
    console.log(result);
    console.log(this.state.arrayToSort);
    if (!result.done) {
      console.log('SETTING STATE');
      this.setState({
        arrayToSort: [...result.value],
        // barData: {
        //   labels: this.props.data,
        //   datasets: [
        //     {
        //       label: this.props.label,
        //       data: result.value,
        //       backgroundColor: 'blue',
        //       borderColor: 'blue',
        //       borderWidth: 1,
        //     },
        //   ],
        // },
      });
    }
  }

  run() {
    const iterator = bubbleSort(unsortedArray);
    this.setState({
      iterator,
    });
  }

  render() {
    const { data, label } = this.props;
    console.log('in render: ', this.state.arrayToSort);
    const options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            ticks: {
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
          data: !isEmpty(this.state.arrayToSort)
            ? this.state.arrayToSort
            : data,
          backgroundColor: 'blue',
          borderColor: 'blue',
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <Bar
          ref={this.chartReference}
          data={barData}
          width={50}
          height={500}
          options={options}
          redraw
        />
        <button type="button" onClick={() => this.run()}>
          Run
        </button>
        <div>
          Counter:
          {this.state.arrayToSort[1]}
        </div>
      </div>
    );
  }
}
