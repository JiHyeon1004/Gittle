import React from "react";
import BranchManage from "./BranchManage";
import BranchSelector from "./BranchSelector";
import FileTree from "./FileTree";
import CommitRuleButton from "./CommitRuleButton";

import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.container}>
      <div>
        <BranchSelector />
        <BranchManage />
      </div>
      {/* <FileTree /> */}
      <div>
        <CommitRuleButton />
      </div>
    </div>
  );
}

export default SideBar;
