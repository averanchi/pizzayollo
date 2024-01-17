import React from "react";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCart } from "../redux/cart/selectors";
import { NotEmptyCart, EmptyCart } from "../components";

const Cart: React.FC = () => {
  const { items } = useSelector(selectCart);
  return <div>{items.length > 0 ? <NotEmptyCart /> : <EmptyCart />}</div>;
};

export default Cart;
