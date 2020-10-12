// https://khan4019.github.io/front-end-Interview-Questions/sort.html

/**
 * bubbleSort
 * @param {Array} arrayToSort
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

/**
 * insertionSort
 * @param {Array} arrayToSort
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
 * @param {Array} arrayToSort
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
 */

// https://stackoverflow.com/questions/59443376/why-is-yield-keyword-not-producing-the-expected-generator-in-my-application
export function* mergeSort(arrayToSort) {
  const arr = [...arrayToSort];

  function* mergeSortRec(start, end) {
    if (end - start < 2) {
      return arr;
    }
    const middle = Math.floor((end + start) / 2);

    yield* mergeSortRec(start, middle);
    yield* mergeSortRec(middle, end);

    const lefthalf = arr.slice(start, middle);
    const righthalf = arr.slice(middle, end);

    let [i, j, k] = [0, 0, start];

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
  yield* mergeSortRec(0, arr.length);
}

/** *********************************
 *  Quick Sort
 * @param {Array} arr
 * @param {Number} left
 * @param {Number} right
 */

// https://www.samroelants.com/blog/recursive-generators-in-javascript/
export function* quickSort(array, min = 0, max = array.length) {
  if (max - min <= 1) return array; // base case

  // partitioning
  const [pivot, lessThenPivot, greaterThenPivot] = [array[min], [], []];
  for (let i = min + 1; i < max; i += 1) {
    if (array[i] < pivot) lessThenPivot.push(array[i]);
    else greaterThenPivot.push(array[i]);
    array.splice(
      min,
      i - min + 1,
      ...lessThenPivot.concat(pivot, greaterThenPivot)
    );
    yield array;
  }

  yield* quickSort(array, min, min + lessThenPivot.length);
  yield* quickSort(array, min + lessThenPivot.length + 1, max);
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
