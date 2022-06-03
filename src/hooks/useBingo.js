import { useState, useEffect, useCallback } from "react";

import {
  deepclone,
  createCard,
  createNumbers,
  hasWonGame
} from './utils';

const matrixSize = 5;
const matrixCenter = Math.floor(matrixSize / 2);

const interval = 2000;

const alerts = {
  wonAlert: {
    text: 'You won!',
    onClick: () => window.location.reload()
  },
  lostAlert: {
    text: 'Game is over, you missed a number!',
    onClick: () => window.location.reload()
  },
  numberNotIncludedAlert: {
    text: 'Number is not out yet!'
  },
};

const remainingNumbers = createNumbers();

export const useBingo = () => {
  const [loading, setLoading] = useState(true);

  const [matrix, setMatrix] = useState([]);

  const [numbers, setNumbers] = useState([]);

  const [timerId, setTimerid] = useState(null);

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const newMatrix = createCard(matrixSize);

    setMatrix(
      newMatrix.map((row, rowIndex) => row.map((col, colIndex) => ({
        number: col,
        selected: rowIndex === matrixCenter && colIndex === matrixCenter
      })))
    );

    setLoading(false);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setNumbers(prevState => {
        const len = prevState.length;
        const number = remainingNumbers[len];

        return [number, ...prevState];
      });
    }, interval);

    setTimerid(id);

    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (numbers.length === 90) {
      clearInterval(timerId);
      setAlert(alerts.lostAlert);
    }
  }, [numbers, timerId]);

  const handleCardClick = useCallback((rowIndex, colIndex) => {
    if (rowIndex === matrixCenter && colIndex === matrixCenter) return;

    const newMatrix = deepclone(matrix);

    const prevElement = newMatrix[rowIndex][colIndex];

    if (numbers.includes(prevElement.number)) {
      newMatrix[rowIndex][colIndex] = {
        ...prevElement,
        selected: !prevElement.selected
      };

      setMatrix(newMatrix);
    } else {
      const { text } = alerts.numberNotIncludedAlert;
      setAlert({ text, onClick: () => setAlert(null) });
    }
  }, [matrix, numbers]);

  useEffect(() => {
    const hasWon = hasWonGame(
      matrix.map(row => row.map(col => Number(col.selected)))
    );

    if (hasWon) {
      clearInterval(timerId);
      setAlert(alerts.wonAlert);
    }
  }, [matrix, timerId]);

  return {
    alert,
    matrix,
    loading,
    numbers,
    handleCardClick
  };
};