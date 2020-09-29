import React from 'react';
import { bubbleSort } from '../../utils';
import unsortedArray from '../../const';

export default () => {
  const result = bubbleSort(unsortedArray);
  console.log(result);
  return <div>Sorting chart...</div>;
};
