import React from "react";

const ExperimentTwo = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const divRef = React.useRef();

  const addNumbers = () => {
    const lastNum = numbers[numbers.length - 1];
    setNumbers([...numbers, lastNum + 1]);
  };

  const handleScroll = () => {
    console.log("Was scroll");
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
      </div>
      <button onClick={removeScroll}>Не следить</button>
    </>
  );
};

export default React.memo(ExperimentTwo);
