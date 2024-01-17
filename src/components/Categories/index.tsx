import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, reloadCurrentPage } from "../../redux/filter/slice";
import { filterCategoryIdSelector } from "../../redux/filter/selectors";

const CatVariants = [
  "All",
  "Meats",
  "Vegetarian",
  "Grill",
  "Spicy",
  "Closed",
];

export const Categories: React.FC = React.memo(() => {
  const onChangeCategory = (idx: number) => {
    dispatch(reloadCurrentPage());
    dispatch(setCategoryId(idx));
  };

  console.log("Render");

  const categoryValue = useSelector(filterCategoryIdSelector);
  const dispatch = useDispatch();
  return (
    <div className="categories">
      <ul>
        {CatVariants.map((catVar, idx) => {
          return (
            <li
              key={idx}
              className={idx === categoryValue ? "active" : ""}
              onClick={() => onChangeCategory(idx)}>
              {catVar}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
