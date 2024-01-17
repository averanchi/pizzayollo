import React from "react";

import { Link } from "react-router-dom";
import styles from "./EmptyCart.module.scss";

import cartEmptyImg from "../../assets/img/empty-cart.png";

export const EmptyCart: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.root}>
        <span>😕</span>
        <br />
        The shopping cart is empty!
      </h1>
      <img
        src={cartEmptyImg}
        alt="cart is empty"
        width="500"
        className={styles.image}
      />
      <p className={styles.info}>
        <span>You've added no pizzas in your shopping cart.</span>
      </p>
      <div className={styles.bottom}>
        <Link to="/" className="button button--outline button--add go-back-btn">
          <span>To the main page</span>
        </Link>
      </div>
    </div>
  );
};
