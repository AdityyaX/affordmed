const express = require('express');
const app = express();
const port = 9876;

const getNumbersFromAPI = (numberid) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let numbers = [];
      switch (numberid) {
        case 'p':
          numbers = [2, 3, 5, 7, 11];
          break;
        case 'f':
          numbers = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
          break;
        case 'e':
          numbers = [2, 4, 6, 8, 10];
          break;
        case 'r':
          numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
          break;
        default:
          return reject(new Error('Invalid numberid'));
      }
      resolve(numbers);
    }, Math.floor(Math.random() * 500));
  });
};

let storedNumbers = [];
const windowSize = 10;

app.get('/numbers/:numberid', async (req, res) => {
  const numberid = req.params.numberid;

  try {
    const numbers = await getNumbersFromAPI(numberid);
    const filteredNumbers = numbers.filter((num) => !storedNumbers.includes(num));

    storedNumbers = [...storedNumbers, ...filteredNumbers];
    storedNumbers = [...new Set(storedNumbers)];

    if (storedNumbers.length > windowSize) {
      storedNumbers = storedNumbers.slice(-windowSize);
    }

    const avg = storedNumbers.reduce((sum, num) => sum + num, 0) / storedNumbers.length;

    const response = {
      windowPrevState: storedNumbers.slice(0, storedNumbers.length - filteredNumbers.length),
      windowCurrState: storedNumbers,
      numbers: filteredNumbers,
      avg,
    };

    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
