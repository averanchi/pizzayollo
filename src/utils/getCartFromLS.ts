import { CartItem } from "../redux/cart/types"
import { calcTotalPrice } from "./calcTotalPrice"

export const getCartFromLS = () => {
   const data = localStorage.getItem('cart')
   const json = data ? JSON.parse(data) as CartItem[]: []

   const totalPrice = calcTotalPrice(json)

   const lastItem = json[json.length-1]?.uniqId

   const returnObj =
   { 
     items: json,
     totalPrice: totalPrice,
     uniqId: json.length > 0 
     ? lastItem ? lastItem + 1 : 0
     : 0
   }
     
   return  returnObj
}