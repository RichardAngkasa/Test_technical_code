import { useState } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState({}); // Use a single state object for all results
  const [input, setInput] = useState(0);

  const generateSegitiga = async () => {
    try {
      const response = await fetch("http://localhost:5001/generateSegitiga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const result = await response.json();
      setData({ ...data, segitiga: result.result }); // Store the result in the data object
    } catch (error) {
      console.log(error);
    }
  }

  const generateOddNumbers = async () => {
    try {
      const response = await fetch("http://localhost:5001/generateOddNumbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maxNumber: input }),
      });
      const result = await response.json();
      setData({ ...data, oddNumbers: result.oddNumbers }); // Store the result in the data object
    } catch (error) {
      console.log(error);
    }
  }

  const generatePrimeNumbers = async () => {
    try {
      const response = await fetch("http://localhost:5001/generatePrimeNumbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maxNumber: input }),
      });
      const result = await response.json();
      setData({ ...data, primeNumbers: result.primeNumbers }); // Store the result in the data object
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data.segitiga)
  return (
    <>
      <input type="number" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Input angka" />
      <button onClick={generateSegitiga}>Generate Segitiga</button>
      <button onClick={generateOddNumbers}>Generate Odd Numbers</button>
      <button onClick={generatePrimeNumbers}>Generate Prime Numbers</button>
      <div>Segitiga: {data.segitiga}</div>
      <div>Odd Numbers: {data.oddNumbers ? data.oddNumbers.join(', ') : ''}</div>
      <div>Prime Numbers: {data.primeNumbers ? data.primeNumbers.join(', ') : ''}</div>
    </>
  )
}

export default App;
