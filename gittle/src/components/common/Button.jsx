import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  const { action, content, style, use } = props;
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        style={style}
        onClick={action}
        use={use}
      >
        {content}
      </button>
    </div>
  );
}

export default Button;
