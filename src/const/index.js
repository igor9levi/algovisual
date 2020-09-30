// const unsortedArray = [55, 4, 3, 6, 7, 9, 8, 50];
// const unsortedArray = [55, 44, 33, 26, 17, 9, 8, 50];
// const unsortedArray = [55, 50, 44, 33, 26, 17, 9, 8];
const unsortedArray = [];
for (let i = 0; i < 100; i += 1) {
  unsortedArray.push(Math.floor(Math.random() * 120 + 1));
}

export default unsortedArray;
