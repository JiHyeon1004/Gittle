import React from "react";
import CreateBranch from "./CreateBranch";
import AddCommitConvention from "./AddCommitConvention";

import styles from "./BranchManage.module.css";

function BranchManage() {
  return (
    <div className={styles.container}>
      <CreateBranch />
    </div>
  );
}

export default BranchManage;
