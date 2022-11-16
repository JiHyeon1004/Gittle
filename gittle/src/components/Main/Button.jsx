import React from "react";
import styles from "./Button.module.css";

function button(props) {
  return (
    <div
      className={styles.button}
      onClick={() => {
        props.callModal();
      }}
    >
      <p>Repo {props.comment}</p>
    </div>
  );
}

export default button;
