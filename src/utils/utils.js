// https://khan4019.github.io/front-end-Interview-Questions/sort.html

/** *********************************
 * bubbleSort
 * @param {*} arr
 */
export function* bubbleSort(arrayToSort) {
  const arr = [...arrayToSort];
  const len = arr.length;

  console.time('bubbleSort');

  for (let i = len - 1; i >= 0; i -= 1) {
    for (let j = 1; j <= i; j += 1) {
      if (arr[j - 1] > arr[j]) {
        // swap
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
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
export function* insertionSort(arrayToSort) {
  const arr = [...arrayToSort];
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
export function* selectionSort(arrayToSort) {
  const arr = [...arrayToSort];
  const len = arr.length;

  console.time('selectionSort');

  for (let i = 0; i < len; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < len; j += 1) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // swap
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

    yield arr;
  }
  console.timeEnd('selectionSort');
}

/** *********************************
 * mergeSort
 * @param {Array} arr
 * @param {Chart} chart
 */

// https://stackoverflow.com/questions/59443376/why-is-yield-keyword-not-producing-the-expected-generator-in-my-application
export function* mergeSort(arr) {
  if (arr.length > 1) {
    const middle = Math.floor(arr.length / 2);
    const lefthalf = arr.slice(0, middle);
    const righthalf = arr.slice(middle);

    yield* mergeSort(lefthalf);
    yield* mergeSort(righthalf);

    let i = 0;
    let j = 0;
    let k = 0;

    while (i < lefthalf.length && j < righthalf.length) {
      if (lefthalf[i] < righthalf[j]) {
        arr[k] = lefthalf[i];
        i += 1;
      } else {
        arr[k] = righthalf[j];
        j += 1;
      }

      k += 1;
    }

    while (i < lefthalf.length) {
      arr[k] = lefthalf[i];
      i += 1;
      k += 1;
    }

    while (j < righthalf.length) {
      arr[k] = righthalf[j];
      j += 1;
      k += 1;
    }

    yield arr;
  }
}
/*
export function* mergeSort(arr) {
  // arr is a unique list that all levels in the recursion tree can access:

  function* mergeSortRec(start, end) {
    // separate function that can take start/end indices
    if (end - start > 1) {
      const middle = Math.floor(start + end / 2);

      yield* mergeSortRec(start, middle); // don't provide slice, but index range
      yield* mergeSortRec(middle, end);
      // const left = arr.slice(0, middle);
      // const right = arr.slice(middle);
      const left = arr.slice(start, middle);
      const right = arr.slice(middle, end);
      // left = arr[start:middle]
      // right  = arr[middle:end]

      let a = 0;
      let b = 0;
      let c = start;

      while (a < left.length && b < right.length) {
        if (left[a] < right[b]) {
          arr[c] = left[a];
          a += 1;
        } else {
          arr[c] = right[b];
          b += 1;
        }
        c += 1;
      }

      while (a < left.length) {
        arr[c] = left[a];
        a += 1;
        c += 1;
      }

      while (b < right.length) {
        arr[c] = right[b];
        b += 1;
        c += 1;
      }

      yield arr;
    }
  }
  yield* mergeSortRec(0, arr.length); // call inner function with start/end arguments
}
*/
/*
export function* mergeSort(array, leftIndex, rightIndex) {
  const length = rightIndex - leftIndex;
  if (length < 2) {
    return array;
  }
  const mid = leftIndex + Math.floor(length / 2);

  const left = mergeSort(array, leftIndex, mid);
  // while (!left.next().done) yield array;
  yield array;
  const right = mergeSort(array, mid, rightIndex);
  // while (!right.next().done) yield array;
  yield array;
  const merger = merge(array, leftIndex, mid, rightIndex);
  // while (!merger.next().done) yield array;
  yield array;
}

function* merge(array, leftIndex, mid, rightIndex) {
  let result = [];
  let l = leftIndex;
  let r = mid;
  while (l < mid && r < rightIndex) {
    // if (hueFromHsl(array[l]) < hueFromHsl(array[r])) {
    if (array[l] < array[r]) {
      result.push(array[l++]);
    } else {
      result.push(array[r++]);
    }
  }
  result = result
    .concat(array.slice(l, mid))
    .concat(array.slice(r, rightIndex));
  for (let i = 0; i < rightIndex - leftIndex; i++) {
    yield array;
    array[leftIndex + i] = result[i];
  }
}
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
//   console.log(arr);
//   const len = arr.length;

//   if (len < 2) return arr;

//   const mid = Math.floor(len / 2);
//   const left = arr.slice(0, mid);
//   const right = arr.slice(mid);

//   // send left and right to the mergeSort to broke it down into pieces then merge those
//   // yield* merge(mergeSort(left), mergeSort(right));
//   console.log(left, right);
//   const lft = yield* mergeSort(left);
//   console.log(left, right);
//   const rght = yield* mergeSort(right);
//   console.log(lft, rght);
//   yield merge(lft, rght);
//   // const result = yield merge(lft, rght);
//   // return result;
// }
// function* merger(left, right) {
//   const arr = [];

//   while (left.length && right.length) {
//     if (left[0] < right[0]) {
//       arr.push(left.shift());
//     } else {
//       arr.push(right.shift());
//     }
//   }

//   yield [...arr, ...left, ...right];
// }

// export function* mergeSort(array, half = array.length / 2) {
//   console.log(array);
//   if (array.length < 2) {
//     return array;
//   }

//   const left = array.splice(0, half); // left part of array

//   yield* merger(mergeSort(left), mergeSort(array));
// }

/** *********************************
 *  Quick Sort
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 */
// function swap(arr, i, j) {
//   const temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;

//   console.log('swapping');
// }

// function partition(arr, pivot, left, right) {
//   const pivotValue = arr[pivot];
//   let partitionIndex = left;

//   for (let i = left; i < right; i += 1) {
//     if (arr[i] < pivotValue) {
//       console.log('partition 1', pivotValue);
//       swap(arr, i, partitionIndex);
//       partitionIndex += 1;
//     }
//   }
//   console.log('partition 2', pivotValue);
//   swap(arr, right, partitionIndex);
//   console.log('returning partitionIndex', partitionIndex);
//   return partitionIndex;
// }

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

// https://www.samroelants.com/blog/recursive-generators-in-javascript/
export function* quickSort(array, min = 0, max = array.length) {
  if (max - min <= 1) return array; // base case

  // partitioning
  const [pivot, lesser, greater] = [array[min], [], []];
  for (let i = min + 1; i < max; i += 1) {
    if (array[i] < pivot) lesser.push(array[i]);
    else greater.push(array[i]);
    array.splice(min, i - min + 1, ...lesser.concat(pivot, greater));
    yield array;
  }

  yield* quickSort(array, min, min + lesser.length);
  yield* quickSort(array, min + lesser.length + 1, max);
  return array;
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
