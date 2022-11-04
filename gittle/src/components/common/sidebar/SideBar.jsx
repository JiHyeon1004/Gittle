import React from "react";
import { useLocation } from "react-router-dom";
import BranchManage from "./BranchManage";
import BranchSelector from "./BranchSelector";
// import FileTree from "./FileTree";
import CommitRuleButton from "./CommitRuleButton";

import styles from "./SideBar.module.css";

function SideBar() {
  const location = useLocation();
  if (location.pathname === "/") return null;
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
