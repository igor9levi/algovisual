// https://khan4019.github.io/front-end-Interview-Questions/sort.html

/** *********************************
 * bubbleSort
 * @param {*} arr
 */
export async function bubbleSort({ arr, chart }) {
  const len = arr.length;

  console.time('bubbleSort');

  for (let i = len - 1; i >= 0; i -= 1) {
    for (let j = 1; j <= i; j += 1) {
      if (arr[j - 1] > arr[j]) {
        const temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }

      chart.config.data.datasets[0].data = [...arr];
      chart.update();
      await sleep(0);
    }
  }

  console.timeEnd('bubbleSort');
  return arr;
}

/** *********************************
 * insertionSort
 * @param {*} arr
 */
export async function insertionSort({ arr, chart }) {
  const len = arr.length;

  console.time('insertionSort');

  for (let i = 1; i < len; i += 1) {
    // storing current element whose left side is checked for its correct position
    const el = arr[i];
    let j = i;

    // check whether the adjacent element in left side is greater or less than the current element.
    while (j > 0 && arr[j - 1] > el) {
      // moving the left side element to one position forward.
      arr[j] = arr[j - 1];
      j -= 1;

      chart.config.data.datasets[0].data = [...arr];
      chart.update();
      await sleep(0);
    }

    // moving current element to its  correct position.
    arr[j] = el;
  }

  console.timeEnd('insertionSort');
  return arr;
}

/** *********************************
 * selectionSort
 * @param {Array} arr
 * @param {Chart} chart
 */
export async function selectionSort({ arr, chart }) {
  const len = arr.length;

  console.time('selectionSort');

  for (let i = 0; i < len; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < len; j += 1) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;

    chart.config.data.datasets[0].data = [...arr];
    chart.update();
    await sleep(100);
  }
  console.timeEnd('selectionSort');
  return arr;
}

/** *********************************
 * mergeSort
 * @param {Array} arr
 * @param {Chart} chart
 */

let animateArray = [];
let mergeDelay = 50;

function merge(left, right, chart) {
  mergeDelay += 50;
  const result = [];
  const lLen = left.length;
  const rLen = right.length;
  let l = 0;
  let r = 0;

  while (l < lLen && r < rLen) {
    if (left[l].value < right[r].value) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }
  // remaining part needs to be addred to the result
  const endResult = result.concat(left.slice(l)).concat(right.slice(r));
  const minIndex = Math.min(...endResult.map((el) => el.index));
  endResult.forEach((el, index) => {
    el.index = minIndex + index;
    animateArray[el.index] = el.value;
  });

  const animated = [...animateArray];

  setTimeout(() => {
    chart.config.data.datasets[0].data = animated;
    chart.update();
  }, mergeDelay);

  return endResult;
}

export function mergeSort({ arr, chart, beenHere }) {
  if (!beenHere) {
    mergeDelay = 50;
    animateArray = [...arr];
    arr = arr.map((value, index) => ({ value, index }));
  }
  const len = arr.length;
  if (len < 2) return arr;
  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // send left and right to the mergeSort to broke it down into pieces then merge those
  return merge(
    mergeSort({ arr: left, chart, beenHere: true }),
    mergeSort({ arr: right, chart, beenHere: true }),
    chart
  );
}

/** *********************************
 *  Quick Sort
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 */
let quickDelay = 25;
function swap(arr, i, j, chart) {
  quickDelay += 25;
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  const animated = [...arr];

  setTimeout(() => {
    chart.config.data.datasets[0].data = animated;
    chart.update();
  }, quickDelay);
}

function partition(arr, pivot, left, right, chart) {
  const pivotValue = arr[pivot];
  let partitionIndex = left;

  for (let i = left; i < right; i += 1) {
    if (arr[i] < pivotValue) {
      swap(arr, i, partitionIndex, chart);
      partitionIndex += 1;
    }
  }
  swap(arr, right, partitionIndex, chart);
  return partitionIndex;
}

export function quickSort({ arr, left, right, chart, beenHere }) {
  if (!beenHere) {
    quickDelay = 25;
  }
  let pivot;
  let partitionIndex;

  if (left < right) {
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right, chart);

    // sort left and right
    quickSort({ arr, left, right: partitionIndex - 1, chart, beenHere: true });
    quickSort({ arr, left: partitionIndex + 1, right, chart, beenHere: true });
  }

  return arr;
}

export const sleep = (milliseconds = 200) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  sleep,
};
