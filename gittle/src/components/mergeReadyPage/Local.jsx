import React, { useEffect, useState } from "react";
import styles from "./Local.module.css";

export default function Local() {
  return (
    <>
      <div className={styles.local}>
        <div className={styles.localbox}>
          <p>local</p>
        </div>
      </div>
    </>
  );
}
