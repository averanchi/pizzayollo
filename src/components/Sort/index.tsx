import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSortType } from "../../redux/filter/slice";
import { filterSortSelector } from "../../redux/filter/selectors";
import { SortType, sortPropertyEnum } from "../../redux/filter/types";

// type SortType = { name: string; sortProperty: sortPropertyEnum };

export const sortList: SortType[] = [
  { name: "rating (+)", sortProperty: sortPropertyEnum.RATING_DESC },
  { name: "rating (-)", sortProperty: sortPropertyEnum.RATING_ASC },
  { name: "price (+)", sortProperty: sortPropertyEnum.PRICE_DESC },
  { name: "price (-)", sortProperty: sortPropertyEnum.PRICE_ASC },
  { name: "a-z(+)", sortProperty: sortPropertyEnum.TITLE_DESC },
  { name: "a-z(-)", sortProperty: sortPropertyEnum.TITLE_ASC },
];

export const Sort: React.FC = React.memo(() => {
  const sortType = useSelector(filterSortSelector);
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [popUpOpen, setPopUpOpen] = React.useState(false);

  const onClickSortFunc = (obj: SortType) => {
    dispatch(setSortType(obj));
    setPopUpOpen(!popUpOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setPopUpOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setPopUpOpen(!popUpOpen)}>{sortType.name}</span>
      </div>
      {popUpOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, idx) => {
              return (
                <li
                  key={idx}
                  className={
                    sortType.sortProperty === obj.sortProperty ? "active" : ""
                  }
                  onClick={() => onClickSortFunc(obj)}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});
