import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./filter/slice";
import cartReducer from "./cart/slice"
import pizzaReducer from "./pizzas/slice";
import { useDispatch } from "react-redux";

 

const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()


export default store;
