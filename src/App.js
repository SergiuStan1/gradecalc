import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [grades, setGrades] = useState([{ id: uuidv4(), value: 0 }]);
  const [average, setAverage] = useState(0);

  const addGrade = () => {
    setGrades((grades) => [...grades, { id: uuidv4(), value: 0 }]);
  };

  const deleteGrade = (index) => {
    setGrades((grades) => grades.filter((_, i) => i !== index));
  };

  const calculate = (e) => {
    e.preventDefault();
    const formValid = grades.every(({ value }) => !isNaN(+value));
    if (!formValid) {
      return;
    }
    setAverage(
      grades.map(({ value }) => value).reduce((a, b) => +a + +b, 0) /
        grades.length
    );
  };

  return (
    <div className="App">
      <form onSubmit={calculate}>
        {grades.map((g, i) => {
          return (
            <div key={g.id}>
              <label>Grade😍</label>
              <input
                value={g.value}
                onChange={(e) => {
                  const grds = [...grades];
                  grds[i].value = e.target.value;
                  setGrades(grds);
                }}
              />
              <button type="button" onClick={() => deleteGrade(i)}>
                Delete Grade🤬
              </button>
            </div>
          );
        })}

        <button type="button" onClick={addGrade}>
          ✚Add Grade✚
        </button>
        <button type="submit">Calculate Average😱</button>
      </form>
      <div>Your average grade is {average}</div>
    </div>
  );
}