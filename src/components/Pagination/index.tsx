import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/filter/slice";
import { filterCurrPageSelector } from "../../redux/filter/selectors";

export const Pagination: React.FC = () => {
  const currentPage = useSelector(filterCurrPageSelector);
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1}
    />
  );
};
