import React from "react";
import { useRecoilValue } from "recoil";
import { pushedBranch, mergingBranch } from "../atoms";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MergePage.module.css";

function MergePage() {
  const pushed = useRecoilValue(pushedBranch);
  const merging = useRecoilValue(mergingBranch);
  return (
    <div>
      <p>merge</p>
      <div className={styles.merge}>
        <div className={styles.text}>
          <p className={styles.branch}>{pushed}</p>
          <p>branch에서</p>
        </div>
        <div className={styles.arrow}>
          <FontAwesomeIcon icon={faCircleArrowRight} className={styles.icon} />
          <p>merge</p>
        </div>
        <div className={styles.text}>
          <p className={styles.branch}>{merging}</p>
          <p>branch로</p>
        </div>
      </div>
      <div>
        <p>제목</p>
        <input type="text" />
      </div>
      <div>
        <p>설명</p>
        <input type="text" />
      </div>
    </div>
  );
}

export default MergePage;
