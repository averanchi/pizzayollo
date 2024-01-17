import React from "react";

import styles from "./NotFoundBlock.module.scss";
import NotFoundImg from "../../assets/img/404-error-page-not-found-on-road-block-tools-vector-27171539.jpg";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Error 404. <br />
        The page is not found
      </div>
      <img src={NotFoundImg} alt="Not found" width={500} />
    </div>
  );
};
