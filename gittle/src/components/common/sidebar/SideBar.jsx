import React from "react";
import { useLocation } from "react-router-dom";
import BranchManage from "./BranchManage";
import BranchSelector from "./BranchSelector";
// import FileTree from "./FileTree";
import CommitRuleButton from "./CommitRuleButton";
import LogCheck from "./LogCheck";

import styles from "./SideBar.module.css";

function SideBar() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.selector}>
          <BranchSelector />
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
