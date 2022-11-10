import React from "react";
import { useState } from "react";
import Assignee from "../components/mergeRequestListPage/Assignee";
import Merged from "../components/mergeRequestListPage/Merged";
import styles from "./MergeRequestListPage.module.css";

export default function MergeRequestListPage() {
  const [assignee, setAssignee] = useState(true);
  const [merged, setMerged] = useState(false);

  const showAssignee = () => {
    setAssignee(true);
  };

  const showMerged = () => {
    setAssignee(false);
    setMerged(true);
  };
  return (
    <div>
      <div>Merge 요청 목록</div>
      <div className={styles.tabs}>
        <div className={styles.tab} onClick={showAssignee}>
          merge 대기
        </div>
        <div className={styles.tab} onClick={showMerged}>
          merge 완료
        </div>
      </div>
      <div className={styles.tabbox}>
        {assignee ? <Assignee /> : <Merged />}
      </div>
    </div>
  );
}
