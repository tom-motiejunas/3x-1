import React, { useRef, useEffect } from "react";
import "./App.css";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

let chart;
let dataset = [];
let maxLength = 1;

const randomBetween = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

const checkIfNew = (newValue) => {
  let isNew = true;
  dataset.forEach((el) => {
    if (+el.label.split(" ")[0] === newValue) {
      isNew = false;
    }
  });
  if (!isNew) return false;
  return true;
};

function calculation({ current }) {
  let number = current.valueAsNumber;

  if (!number) return;

  //Check if there isnt already that value
  if (!checkIfNew(number)) return;
  console.log(!checkIfNew(number));

  let numberGraph = [number];
  let maxAltitude = 1;
  while (number != 1) {
    if (number % 2 === 0) {
      number /= 2;
    } else {
      number = number * 3 + 1;
    }
    if (number > maxAltitude) {
      maxAltitude = number;
    }
    numberGraph.push(number);
  }
  if (numberGraph.length > maxLength) {
    maxLength = numberGraph.length;
  }

  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  dataset = [
    ...dataset,
    {
      label: `${numberGraph[0]} graph`,
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      borderColor: `rgb(${r}, ${g}, ${b})`,
      data: numberGraph,
    },
  ];
  renderChart(numberGraph, chart);
}

function renderChart() {
  const labels = [...Array(maxLength).keys()];

  const data = {
    labels: labels,
    datasets: dataset,
  };

  const config = {
    data,
    options: {
      responsive: true,
    },
  };

  if (chart) {
    chart.destroy();
  }
  chart = new Chart(document.querySelector("#Collatz-canvas"), {
    type: "line",
    data: data,
    options: config,
  });
}

function App() {
  const numberInputLink = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    calculation(numberInputLink);
  };

  return (
    <div className="App">
      <div>
        <canvas id="Collatz-canvas" width={"400"} height={"100"}></canvas>
      </div>
      <div>
        <label htmlFor="number-input">Input a seed</label>
        <input
          type="number"
          name="number-input"
          className="seed-input"
          ref={numberInputLink}
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => calculation(numberInputLink)}>enter</button>
      </div>
    </div>
  );
}

export default App;
