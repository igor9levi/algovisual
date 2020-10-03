// https://khan4019.github.io/front-end-Interview-Questions/sort.html

/** *********************************
 * bubbleSort
 * @param {*} unsortedArray
 */
export async function bubbleSort({ arr, chart }) {
  const chartInstance = chart;
  const len = arr.length;

  console.time('bubbleSort');

  for (let i = len - 1; i >= 0; i -= 1) {
    for (let j = 1; j <= i; j += 1) {
      if (arr[j - 1] > arr[j]) {
        const temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }

      // console.log(i, j, arr);
      chartInstance.config.data.datasets[0].data = arr;
      chartInstance.update();
      await sleep(2);
    }
  }

  console.timeEnd('bubbleSort');
  return arr;
}

/** *********************************
 * mergeSort
 * @param {*} left
 * @param {*} right
 */
function merge(left, right, chart) {
  const chartInstance = chart;
  const result = [];
  const lLen = left.length;
  const rLen = right.length;
  let l = 0;
  let r = 0;
  while (l < lLen && r < rLen) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }
  // remaining part needs to be addred to the result
  // return result.concat(left.slice(l)).concat(right.slice(r));
  const endResult = result.concat(left.slice(l)).concat(right.slice(r));
  chartInstance.config.data.datasets[0].data = endResult;
  chartInstance.update();
  return endResult;
}

export function mergeSort({ arr, chart }) {
  const len = arr.length;
  if (len < 2) return arr;
  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  // send left and right to the mergeSort to broke it down into pieces
  // then merge those
  return merge(
    mergeSort({ arr: left, chart }),
    mergeSort({ arr: right, chart }),
    chart
  );
}

/** *********************************
 * insertionSort
 * @param {*} unsortedArray
 */
export async function insertionSort({ arr, chart }) {
  const chartInstance = chart;
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
      // console.log(i, j, arr);
      chartInstance.config.data.datasets[0].data = arr;
      chartInstance.update();
      await sleep(2);
    }

    // moving current element to its  correct position.
    arr[j] = el;
  }

  console.timeEnd('insertionSort');
  return arr;
}

/** *********************************
 *
 * @param {selectionSort} unsortedArray
 */
export async function selectionSort({ arr, chart }) {
  const chartInstance = chart;
  const len = arr.length;

  console.time('selectionSort');

  for (let i = 0; i < len; i += 1) {
    let minIdx = i;
    for (let j = i + 1; j < len; j += 1) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
    // yield arr;
    chartInstance.config.data.datasets[0].data = arr;
    chartInstance.update();
    await sleep(2);
  }
  console.timeEnd('selectionSort');
  return arr;
}

/** *********************************
 *  Quick Sort
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, pivot, left, right, chart) {
  const chartInstance = chart;
  const pivotValue = arr[pivot];
  let partitionIndex = left;

  for (let i = left; i < right; i += 1) {
    if (arr[i] < pivotValue) {
      swap(arr, i, partitionIndex);
      partitionIndex += 1;
    }
    chartInstance.config.data.datasets[0].data = arr;
    chartInstance.update();
  }
  swap(arr, right, partitionIndex);
  return partitionIndex;
}

export function quickSort({ arr, left, right, chart }) {
  // const len = arr.length;
  let pivot;
  let partitionIndex;

  if (left < right) {
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right, chart);

    // sort left and right
    quickSort({ arr, left, right: partitionIndex - 1, chart });
    quickSort({ arr, left: partitionIndex + 1, right, chart });
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
