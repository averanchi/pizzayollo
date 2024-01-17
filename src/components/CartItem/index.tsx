import React from "react";
import styles from "./CartItem.module.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { increaseItem, decreaseItem, removeItem } from "../../redux/cart/slice";
import { selectCartItemByUniqId } from "../../redux/cart/selectors";

type CartItemProps = {
  id: string;
  title: string;
  imageUrl: string;
  type: string;
  count: number;
  size: number;
  price: number;
  uniqId: number;
};

export const CartItem: React.FC<CartItemProps> = ({
  // id,
  title,
  imageUrl,
  type,
  count,
  size,
  price,
  uniqId,
}) => {
  const dispatch = useDispatch();

  const cartItemById = useSelector(selectCartItemByUniqId(uniqId));
  return (
    <>
      <div className={styles.cart_item}>
        <div className={styles.cart_item_img}>
          <img src={imageUrl} alt="pizzas photo" />
        </div>
        <div className={styles.cart_item_info}>
          <h3>{title}</h3>
          <p>
            {type}, {size}см
          </p>
        </div>
        <div className={styles.cart_item_count}>
          <button
            disabled={cartItemById?.count === 1}
            className={styles.minus}
            onClick={() => dispatch(decreaseItem(uniqId))}>
            -
          </button>
          <div className={styles.count}>{count}</div>
          <div
            className={classNames(styles.minus, styles.plus)}
            onClick={() => dispatch(increaseItem(uniqId))}>
            +
          </div>
        </div>
        <div className={styles.cart_item_price}>{price * count} р.</div>
        <div
          className={styles.cart_item_remove}
          onClick={() => dispatch(removeItem(uniqId))}>
          х
        </div>
      </div>
      <hr className={styles.hr} />
    </>
  );
};
