import React, { useEffect, useState } from "react";

const Boxhunt = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [records, setRecords] = useState([]);
  const [input, setInput] = useState();
  const [isStarted, setIsStarted] = useState(true);
  const [timer, setTimer] = useState(null);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    if (!timer) generateRandomBox();
  };

  const handlePause = () => {
    setTimer(null);
    setActiveBox(null);
  };

  const handleReset = () => {
    handlePause();
    setRecords([]);
    setActiveBox(null);
    setInput("")
  };

  const generateRandomBox = () => {
    const randomBox = Math.floor(Math.random() * 25);
    setActiveBox(randomBox);

    const timer = setTimeout(() => {
      if (isStarted) generateRandomBox();
    }, input * 1000);

    setTimer(timer);
  };

  const handleClick = (index) => {
    if (activeBox === index) {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      setRecords((prev) => [...prev, { click: index + 1, time: duration }]);
      setStartTime(Date.now());
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return (
    <div style={{ margin: "50px" }}>
      <div>
        <input
          value={input}
          type="number"
          style={{ margin: "5px" }}
          onChange={handleChange}
        />
        <button style={{ margin: "5px" }} onClick={handleStart}>
          Start
        </button>
        <button style={{ margin: "5px" }} onClick={handlePause}>
          Pause
        </button>
        <button style={{ margin: "5px" }} onClick={handleReset}>
          Reset
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 80px)",
          gap: "5px",
        }}
      >
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              display: "flex",
              border: "1px solid",
              justifyContent: "center",
              alignItems: "center",
              width: "80px",
              height: "80px",
              backgroundColor: activeBox === index ? "red" : "gray",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Click</th>
            <th>Reaction</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 &&
            records.map((value, noClick) => (
              <tr key={noClick}>
                <td>{noClick + 1}</td>
                <td>{value.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Boxhunt;
