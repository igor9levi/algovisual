// const unsortedArray = [55, 50, 44, 33, 26, 17, 9, 8];
const unsortedArray = [];
for (let i = 0; i < 50; i += 1) {
  unsortedArray.push(Math.floor(Math.random() * 60 + 1));
}

export default unsortedArray;

/**
 * Quick Sort 1
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

/**
 * Merge Sort 1
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

/**
 * Merge Sort 2
 */
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

/**
 * Merge Sort 3
 */
/*
export function* mergeSort(arr) {
  // arr is a unique list that all levels in the recursion tree can access:

  function* mergeSortRec(start, end) {
    // separate function that can take start/end indices
    if (end - start > 1) {
      const middle = Math.floor((start + end) / 2);

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

/**
 * Merge Sort 4
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
