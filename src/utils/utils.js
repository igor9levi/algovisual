// https://khan4019.github.io/front-end-Interview-Questions/sort.html

/** *********************************
 * bubbleSort
 * @param {*} unsortedArray
 */
export function* bubbleSort(unsortedArray) {
  const arr = unsortedArray;
  const len = arr.length;

  for (let i = len - 1; i >= 0; i -= 1) {
    for (let j = 1; j <= i; j += 1) {
      if (arr[j - 1] > arr[j]) {
        const temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
      yield arr;
    }
  }
  return arr;
}

/** *********************************
 * mergeSort
 * @param {*} left
 * @param {*} right
 */
function merge(left, right) {
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
  return result.concat(left.slice(l)).concat(right.slice(r));
}

export function mergeSort(arr) {
  const len = arr.length;
  if (len < 2) return arr;
  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  // send left and right to the mergeSort to broke it down into pieces
  // then merge those
  return merge(mergeSort(left), mergeSort(right));
  // yield merge(mergeSort(left), mergeSort(right));
}

/** *********************************
 * insertionSort
 * @param {*} unsortedArray
 */
export function* insertionSort(unsortedArray) {
  const arr = unsortedArray;
  let i;
  const len = arr.length;
  let el;
  let j;

  for (i = 1; i < len; i += 1) {
    el = arr[i];
    j = i;

    // TODO: Check this el
    while (j > 0 && arr[j - 1] > el) {
      arr[j] = arr[j - 1];
      j -= 1;
      yield arr;
    }

    arr[j] = el;
  }

  return arr;
}

/** *********************************
 *
 * @param {selectionSort} unsortedArray
 */
export function* selectionSort(unsortedArray) {
  const arr = unsortedArray;
  let minIdx;
  let temp;
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    minIdx = i;
    for (let j = i + 1; j < len; j += 1) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
    yield arr;
  }
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

function partition(arr, pivot, left, right) {
  const pivotValue = arr[pivot];
  let partitionIndex = left;

  for (let i = left; i < right; i += 1) {
    if (arr[i] < pivotValue) {
      swap(arr, i, partitionIndex);
      partitionIndex += 1;
    }
  }
  swap(arr, right, partitionIndex);
  return partitionIndex;
}

export function* quickSort(arr, left, right) {
  const len = arr.length;
  let pivot;
  let partitionIndex;

  if (left < right) {
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right);
    yield arr;

    // sort left and right
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
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
