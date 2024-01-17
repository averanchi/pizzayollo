import { PayloadAction, createSlice } from "@reduxjs/toolkit";
 import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItem, CartSliceState } from "./types";



const {totalPrice, items, uniqId} = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
  uniqId: uniqId,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findByAll = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findByAll) {
        findByAll.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          uniqId: state.uniqId,
        });
        state.uniqId++
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    increaseItem(state, action: PayloadAction<number>) {
      const findByUniqId = state.items.find((obj) => obj.uniqId === action.payload);
      if (findByUniqId) {
        findByUniqId.count++
      }
       
      state.totalPrice = calcTotalPrice(state.items)
    },
    decreaseItem(state, action) {
      const findByUniqId = state.items.find(
        (obj) => obj.uniqId === action.payload
      );
      if(findByUniqId) {
        findByUniqId.count--;
      if (findByUniqId.count < 1) {
        findByUniqId.count = 1;
      }
      }
      
      
      state.totalPrice = calcTotalPrice(state.items)
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.uniqId !== action.payload);
      state.totalPrice = state.items.reduce(
        (acc, obj) => acc + obj.price * obj.count,
        0
      );
      if(state.items.length === 0) {
        state.uniqId = 0
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.uniqId = 0;
    },
  },
});



// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, increaseItem, decreaseItem } =
  cartSlice.actions;
export default cartSlice.reducer;
