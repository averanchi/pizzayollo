import React from "react";

let renderCount = 0;

const IsFive = React.memo(
  ({ value }) => {
    console.warn(`isFive render: ${++renderCount}`);

    const isFiveCheck = React.useMemo(() => {
      let i = 0;
      while (i < 600000000) i++;

      return value === 5 ? "It's five" : "It isn't five";
    }, [value]);

    return <div>{isFiveCheck}</div>;
  },
  (prevProps, nextProps) => {
    if (nextProps.value === 5) {
      return false;
    } else {
      return true;
    }
  }
);

export default IsFive;
