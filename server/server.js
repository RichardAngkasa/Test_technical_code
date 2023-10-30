const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("Hello, this is the root of the server.");
});

// Middleware to filter non-numeric input
function filterNumericInput(req, res, next) {
    const input = req.body.input;
    if (!isNumeric(input)) {
      return res.status(400).json({ error: "Input must be a numeric value." });
    }
    next();
  }
  
  // Function to check if a value is numeric
  function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

// Promisified function for formatting numbers SEGITIGA
function formatNumber(inputNumber) {
  return new Promise((resolve) => {
    const numberString = inputNumber.toString();
    const formattedNumberArray = [];

    for (let i = 0; i < numberString.length; i++) {
      const digit = numberString[i];
      const zeros = "0".repeat(i + 1); // need to be fix

      const formattedPart = digit + zeros;
      formattedNumberArray.push(formattedPart);
    }

    resolve(formattedNumberArray.join("\n"));
  });
}

// Promisified function for generating odd numbers
function generateOddNumbers(maxNumber) {
  return new Promise((resolve) => {
    const oddNumbers = [];

    for (let i = 1; i <= maxNumber; i += 2) {
      oddNumbers.push(i);
    }

    resolve(oddNumbers);
  });
}

// Promisified function for generating prime numbers
function generatePrimeNumbers(maxNumber) {
  return new Promise((resolve) => {
    const primeNumbers = [];

    for (let i = 2; i <= maxNumber; i++) {
      if (isPrime(i)) {
        primeNumbers.push(i);
      }
    }

    resolve(primeNumbers);
  });
}

app.post("/generateSegitiga", async (req, res) => {
  const num = req.body.input;
  try {
    const result = await formatNumber(num);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/generateOddNumbers", async (req, res) => {
  const maxNumber = req.body.maxNumber;
  try {
    const oddNumbers = await generateOddNumbers(maxNumber);
    res.json({ oddNumbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/generatePrimeNumbers", async (req, res) => {
  const maxNumber = req.body.maxNumber;
  try {
    const primeNumbers = await generatePrimeNumbers(maxNumber);
    res.json({ primeNumbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const port = 5001;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
