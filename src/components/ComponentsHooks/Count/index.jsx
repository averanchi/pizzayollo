import React from "react";

import style from "./Count.module.scss";

const render = {
  count1: 0,
  count2: 0,
};

const Count = React.memo(({ id, value }) => {
  console.warn(` Count ${id} render: ${++render[`count${id}`]}`);
  return (
    <div>
      <h1 className={style.count}>{value}</h1>
    </div>
  );
});

export default Count;
