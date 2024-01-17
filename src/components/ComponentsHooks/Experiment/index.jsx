import React from "react";

const Experiment = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3]);
  const [inputValue, setInputValue] = React.useState();
  const [count, setCount] = React.useState(0);

  const addNumbers = (newNum = 0, type) => {
    const newArr = [];
    const newNumber = () => {
      return Math.floor(Math.random() * 33);
    };
    for (let i = 0; i < (type === "add" ? newNum : numbers.length); i++) {
      newArr.push(newNumber());
    }
    setNumbers(type === "add" ? [...numbers, ...newArr] : newArr);
  };

  const removeNumber = () => {
    setNumbers(numbers.splice(0, numbers.length - 1));
  };

  React.useEffect(() => {
    return () => {
      console.log("COMPONENT DID UNMOUNT");
    };
  }, []);

  return (
    <div className="useState">
      <div className="count">
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <ul>
        {numbers.map((el, idx) => {
          return <li key={idx}>{el}</li>;
        })}
      </ul>
      <button onClick={() => addNumbers(undefined, "generate")}>
        Новые числа
      </button>
      Сколько чисел докинуть?
      <input
        type="number"
        value={inputValue}
        onInput={(event) => setInputValue(event.target.value)}
      />{" "}
      <button onClick={() => addNumbers(inputValue, "add")}>Докинуть их</button>
      <button onClick={() => removeNumber()}>Удалить одно</button>
    </div>
  );
};

export default Experiment;
