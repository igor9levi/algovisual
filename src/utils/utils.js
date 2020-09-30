// https://khan4019.github.io/front-end-Interview-Questions/sort.html
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

export const sleep = (milliseconds = 200) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default {
  bubbleSort,
  selectionSort,
  sleep,
};
