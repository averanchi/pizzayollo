import { RootState } from "../store";

export const filterCurrPageSelector = (state: RootState) => state.filter.currentPage;
export const filterSelector = (state: RootState) => state.filter;
export const filterCategoryIdSelector = (state: RootState) => state.filter.categoryId;
export const filterSortSelector = (state: RootState) => state.filter.sort;