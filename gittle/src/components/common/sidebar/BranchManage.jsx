import React from "react";
import CreateBranch from "./CreateBranch";
import AddCommitRules from "./AddCommitRules";

import styles from "./BranchManage.module.css";

function BranchManage() {
  return (
    <div className={styles.container}>
      <CreateBranch />
    </div>
  );
}

export default BranchManage;
