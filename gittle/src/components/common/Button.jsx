import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  const { action, content, style, use, value } = props;
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        style={style}
        onClick={action}
        // use={use}
        value={value}
      >
        {content}
      </button>
    </div>
  );
}

export default Button;
