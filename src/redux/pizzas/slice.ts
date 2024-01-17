import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from "./types";
 
 



export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasById",
  async (params: SearchPizzaParams) => {
    const { currentPage, categories, sorts, order, search } = params;
    const { data } = await axios.get(
      `https://65038458a0f2c1f3faec027e.mockapi.io/pizzas?page=${currentPage}&limit=4&${categories}${search}&sortBy=${sorts}&order=${order}`
    );
    return data as Pizza[];
  }
);



const initialState: PizzaSliceState = {
  status: Status.LOADING, //loading, success, error
  items: [],
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
         
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});


// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
