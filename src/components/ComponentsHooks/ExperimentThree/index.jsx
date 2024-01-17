import React from "react";

const ExperimentThree = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const divRef = React.useRef();
  const timerRef = React.useRef();

  const addNumbers = () => {
    setNumbers((prev) => [...prev, prev[prev.length - 1] + 1]);
    console.log(numbers);
  };
  const handleScroll = () => {
    console.log("Was scroll");
  };

  const start = () => {
    timerRef.current = setInterval(addNumbers, 1000);
  };
  const stop = () => {
    console.log(timerRef.current);
    clearInterval(timerRef.current);
  };

  React.useEffect(() => {
    divRef.current.addEventListener("scroll", handleScroll);
  }, []);

  const removeScroll = () => {
    console.log(divRef);
    divRef.current.removeEventListener("scroll", handleScroll);
  };

  return (
    <>
      <div className="useState" ref={divRef}>
        <ul>
          {numbers.map((el, idx) => {
            return (
              <li className="listEl" key={idx}>
                {el}
              </li>
            );
          })}
        </ul>

        <button onClick={() => addNumbers()}>Новое число</button>
        <button onClick={() => start()}>Start</button>
        <button onClick={() => stop()}>Stop</button>
      </div>
      <button onClick={removeScroll}>Не следить</button>
    </>
  );
};

export default ExperimentThree;
