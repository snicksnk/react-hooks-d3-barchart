import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';
import './App.css';

function makeRandom() {
  return Math.round(Math.random() * 100) - 50;
}

function App() {
  const [values, setValues] = useState<number[][]>([]);

  useEffect(() => {
    setInterval(() => {
      let newValues = [];
      for(let i=0; i < 4; i++) {
        newValues.push([makeRandom(), makeRandom()]);
      }
      setValues(newValues);
    }, 5000);
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
