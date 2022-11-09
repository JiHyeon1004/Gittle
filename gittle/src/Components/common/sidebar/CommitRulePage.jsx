import React from "react";
import Button from "../Button";
import styles from "./CommitRulePage.module.css";

function CommitRulePage(props) {
  return (
    <>
      <div>
        <h3>commit 규칙</h3>
      </div>
      <div>
        <h5>나의 규칙</h5>
        <div className={styles.myRuleListContainer}>
          <div className={styles.myRuleList}>
            <p>타입</p>
            <p>1</p>
          </div>
          <div className={styles.myRuleList}>
            <p>설명</p>
            <p>1</p>
          </div>
        </div>
      </div>
      <div>
        <h5>규칙 추가하기</h5>
        <div className={styles.newRuleInputContainer}>
          <div className={styles.newRuleInputType}>
            <label className={styles.newRuleInputLabel}>타입</label>
            <input type="text" />
          </div>
          <div className={styles.newRuleInputDesc}>
            <label className={styles.newRuleInputLabel}>설명</label>
            <input className={styles.newRuleInputDescInput} type="text" />
          </div>
        </div>
        <Button content={"추가하기"} />
      </div>
    </>
  );
}

export default CommitRulePage;
