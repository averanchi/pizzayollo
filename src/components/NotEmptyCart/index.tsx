import React from "react";
import styles from "./NotEmptyCart.module.scss";

import { CartItem } from "../index";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearItems } from "../../redux/cart/slice";
import { selectCart } from "../../redux/cart/selectors";

export const NotEmptyCart: React.FC = () => {
  const dispatch = useDispatch();

  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  return (
    <div className={styles.cart}>
      <div className={styles.cart_top}>
        <div className={styles.cart_top_title}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg">
            <rect fill="none" height="256" width="256" />
            <path
              d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <circle
              cx="80"
              cy="204"
              fill="none"
              r="20"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <circle
              cx="184"
              cy="204"
              fill="none"
              r="20"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <path
              d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
          Shopping cart
        </div>
        <div
          className={styles.cart_top_clear}
          onClick={() => dispatch(clearItems())}>
          <svg
            width="18"
            height="18"
            enableBackground="new 0 0 50 50"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg">
            <rect fill="none" height="50" width="50" />
            <circle
              cx="39"
              cy="46"
              fill="none"
              r="3"
              stroke="#000000"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <circle
              cx="26"
              cy="46"
              fill="none"
              r="3"
              stroke="#000000"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <circle cx="2" cy="4" r="2" />
            <path
              d="  M41,43c0,0-12.668,0-15.291,0c-3.42,0-3.922-1.744-4.523-4.025L13.191,6.696C12.472,4.273,11.459,3,8.664,3c0,0-4.754,0-6.664,0"
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.9868"
            />
            <polyline
              fill="none"
              points="  16,16 47,16 39.809,35 20.609,35 "
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.9868"
            />
            <line
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              x1="27"
              x2="35"
              y1="21"
              y2="29"
            />
            <line
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              x1="35"
              x2="27"
              y1="21"
              y2="29"
            />
          </svg>
          Clean the shopping cart
        </div>
      </div>
      <hr />
      <div className={styles.cart_items}>
        {items.map((el: any) => (
          <CartItem key={el.id} {...el} />
        ))}
      </div>
      <div className={styles.cart_bottom}>
        <div className={styles.cart_bottom_top}>
          <div className={styles.total_ammount}>
            There're: <b>{totalCount} pizzas</b>
          </div>
          <div className={styles.total_price}>
            Total amount: <span>{totalPrice} rub.</span>
          </div>
        </div>
        <div className={styles.cart_bottom_buttons}>
          <Link to="/">
            {" "}
            <div className={styles.button_back}>
              <span>&#11164;</span> Go back
            </div>
          </Link>
          <div className={styles.button_pay}>Pay now</div>
        </div>
      </div>
    </div>
  );
};
