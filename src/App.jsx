import React, { useRef, useEffect } from "react";
import "./App.css";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

let chart;

function calculation({ current }) {
  let number = current.valueAsNumber;
  let numberGraph = [];
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
  renderChart(numberGraph, chart);
}

function renderChart(numberGraph) {
  const labels = [...Array(numberGraph.length).keys()];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "3x+1 graph",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: numberGraph,
      },
    ],
  };

  const config = {
    type: "line",
    data,
    options: {},
  };
  console.log(chart);
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

  return (
    <div className="App">
      <div>
        <label htmlFor="number-input">Input a seed</label>
        <input
          type="number"
          name="number-input"
          className="seed-input"
          ref={numberInputLink}
        />
        <button onClick={() => calculation(numberInputLink)}>enter</button>
      </div>
      <div>
        <canvas id="Collatz-canvas" width={"400"} height={"100"}></canvas>
      </div>
    </div>
  );
}

export default App;
