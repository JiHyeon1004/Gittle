import React from "react";
import { useLocation } from "react-router-dom";
import BranchList from "./BranchList";
import BranchManage from "./BranchManage";
import GitCommit from "./GitCommit";
import CommitRuleButton from "./CommitRuleButton";
import LogCheck from "./LogCheck";

import styles from "./SideBar.module.css";

function SideBar() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <div className={styles.container}>
      {/* <GitCommit /> */}
      <div>
        <div className={styles.selector}>
          <BranchList />
          {/* <BranchChanger /> */}
          <LogCheck />
        </div>
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
