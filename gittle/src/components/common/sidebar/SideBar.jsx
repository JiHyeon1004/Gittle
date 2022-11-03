import React from "react";
import BranchManage from "./BranchManage";
import BranchSelector from "./BranchSelector";
import CommitRuleButton from "./CommitRuleButton";

import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.container}>
      <BranchSelector />
      <BranchManage />
      <CommitRuleButton />
    </div>
  );
}

export default SideBar;
