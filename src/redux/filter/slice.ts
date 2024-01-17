import { PayloadAction, createSlice } from "@reduxjs/toolkit";
 import { FilterSliceState, SortType, sortPropertyEnum } from "./types";


const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "Популярности",
    sortProperty: sortPropertyEnum.RATING_DESC,
  },
};
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchvalue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    reloadCurrentPage(state) {
      state.currentPage = 1;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});



// Action creators are generated for each case reducer function
export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  reloadCurrentPage,
  setFilters,
  setSearchvalue,
} = filterSlice.actions;

export default filterSlice.reducer;
