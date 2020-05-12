import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';
import './App.css';

function makeRandom() {
  return Math.round(Math.random() * 100) - 50;
}

function generateValues(minValues: number, maxLenght: number) {
  const randomNumber = Math.round(Math.random() * maxLenght);
  const numberOfBars = randomNumber < minValues ? minValues : randomNumber;

  let newValues = [];
  for(let i=0; i < numberOfBars; i++) {
    newValues.push([makeRandom(), makeRandom()]);
  }

  return newValues;
}

function App() {
  const [values, setValues] = useState<number[][]>(generateValues(2, 3));

  useEffect(() => {
    setInterval(() => {
      const newValues = generateValues(2, 3);
      setValues(newValues);
    }, 3000);
  }, []);

  return (
    <div className="App">
      <h1 className="header">Grouped bar chart</h1>
      <Chart
        values={values}
        titles={['Cats', 'Dogs', 'Birds', 'Cows']}
      />
    </div>
  );
}

export default App;
