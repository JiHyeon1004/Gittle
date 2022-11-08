import React from "react";
import BranchManage from "./BranchManage";
import BranchSelector from "./BranchSelector";
import GitCommit from "./GitCommit";

import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.container}>
      <BranchSelector />
      <BranchManage />
      <GitCommit/>
    </div>
  );
}

export default SideBar;
