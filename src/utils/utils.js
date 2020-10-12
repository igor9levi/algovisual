// https://khan4019.github.io/front-end-Interview-Questions/sort.html

/** *********************************
 * bubbleSort
 * @param {*} arr
 */
export function* bubbleSort(arr) {
  const len = arr.length;

  console.time('bubbleSort');

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

  console.timeEnd('bubbleSort');
}

/** *********************************
 * insertionSort
 * @param {*} arr
 */
export function* insertionSort(arr) {
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
    }

    // moving current element to its  correct position.
    arr[j] = el;
    yield arr;
  }

  console.timeEnd('insertionSort');
}

/** *********************************
 * selectionSort
 * @param {Array} arr
 * @param {Chart} chart
 */
export function* selectionSort(arr) {
  const len = arr.length;

  console.time('selectionSort');

  for (let i = 0; i < len; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < len; j += 1) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // TODO: replace with switch
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;

    yield arr;
  }
  console.timeEnd('selectionSort');
}

/** *********************************
 * mergeSort
 * @param {Array} arr
 * @param {Chart} chart
 */

// function merge(left, right) {
//   const result = [];
//   const lLen = left.length;
//   const rLen = right.length;
//   let l = 0;
//   let r = 0;

//   while (l < lLen && r < rLen) {
//     if (left[l].value < right[r].value) {
//       result.push(left[l++]);
//     } else {
//       result.push(right[r++]);
//     }
//   }
//   // remaining part needs to be addred to the result
//   const endResult = result.concat(left.slice(l)).concat(right.slice(r));

//   console.log('endRes', endResult);
//   return endResult;
// }

// export function* mergeSort(arr) {
//   const len = arr.length;

//   if (len < 2) return arr;

//   const mid = Math.floor(len / 2);
//   const left = arr.slice(0, mid);
//   const right = arr.slice(mid);

//   // send left and right to the mergeSort to broke it down into pieces then merge those
//   // yield* merge(mergeSort(left), mergeSort(right));
//   const lft = yield* mergeSort(left);
//   const rght = yield* mergeSort(right);
//   const result = yield merge(lft, rght);
//   return result;
// }
function* merger(left, right) {
  const arr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  yield [...arr, ...left, ...right];
}

export function* mergeSort(array, half = array.length / 2) {
  console.log(array);
  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half); // left part of array

  yield* merger(mergeSort(left), mergeSort(array));
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

  console.log('swapping');
}

function partition(arr, pivot, left, right) {
  const pivotValue = arr[pivot];
  let partitionIndex = left;

  for (let i = left; i < right; i += 1) {
    if (arr[i] < pivotValue) {
      console.log('partition 1', pivotValue);
      swap(arr, i, partitionIndex);
      partitionIndex += 1;
    }
  }
  console.log('partition 2', pivotValue);
  swap(arr, right, partitionIndex);
  console.log('returning partitionIndex', partitionIndex);
  return partitionIndex;
}

// export function* quickSort(arr, left = 0, right = arr.length - 1) {
//   let pivot;
//   let partitionIndex;

//   if (left < right) {
//     pivot = right;
//     partitionIndex = yield* partition(arr, pivot, left, right);

//     // sort left and right
//     console.log('left');
//     quickSort(arr, left, partitionIndex - 1);
//     console.log('right');
//     quickSort(arr, partitionIndex + 1, right);
//   }

//   console.log('retrunign arr');
//   return arr;
// }

export function* quickSort(array, min = 0, max = array.length) {
  if (max - min <= 1) return array; // base case

  // partitioning
  const [pivot, less, greater] = [array[min], [], []];
  for (let i = min + 1; i < max; i += 1) {
    if (array[i] < pivot) less.push(array[i]);
    else greater.push(array[i]);
    array.splice(min, i - min + 1, ...less.concat(pivot, greater));
    yield array;
  }

  yield* quickSort(array, min, min + less.length);
  yield* quickSort(array, min + less.length + 1, max);
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
