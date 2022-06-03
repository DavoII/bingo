export const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const createNumbers = (minimum = 1, maximum = 90) => {
  return shuffle(
    Array.from({ length: maximum - minimum + 1 })
      .map((unused, index) => index + minimum)
  );
};

export const getNumber = () => Math.floor(Math.random() * 90);

export const getInitalArray = (size) => {
  const arr = new Array(size);

  const row = new Array(size).fill(0).map((_, index) => index);

  const matrix = arr.fill(row);

  return matrix;
};

export const deepclone = array2d => {
  let arr = [];

  for (let i = 0; i < array2d.length; i++) {
    let row = [];

    for (let j = 0; j < array2d[0].length; j++) {
      row.push(array2d[i][j]);
    }

    arr.push(row);
  }

  return arr;
};

export const createCard = matrixSize => {
  const newMatrix = getInitalArray(matrixSize), usedNumbers = [];

  for (let i = 0; i < matrixSize; i++) {
    let row = [];

    for (let j = 0; j < matrixSize; j++) {
      let number;

      do number = getNumber();
      while (usedNumbers[number]);


      usedNumbers[number] = true;
      row.push(number);
    }

    newMatrix[i] = row;
  }

  return newMatrix;
};

const transpose = matrix => {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
};

const getDiagonal = matrix => {
  const arr = [[], []];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === j) {
        arr[0].push(matrix[i][j]);
      };

      if (i + j === matrix.length - 1) {
        arr[1].push(matrix[i][j]);
      };
    };
  };

  return arr;
};

const checkRow = row => row.every(Boolean);

export const hasWonGame = array2d => {
  if (array2d.length)
    return array2d.map(checkRow).includes(true)
      || transpose(array2d).map(checkRow).includes(true)
      || getDiagonal(array2d).map(checkRow).includes(true);
};
