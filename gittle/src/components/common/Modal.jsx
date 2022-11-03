import React from "react";
import styles from "./Modal.module.css";

function Modal(props) {
  const { open, content } = props;
  return (
    <div
      className={
        open ? `${styles.modal} ${styles.openModal}` : `${styles.modal}`
      }
    >
      {open ? (
        <section>
          <main>
            {content}
            {props.children}
          </main>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
