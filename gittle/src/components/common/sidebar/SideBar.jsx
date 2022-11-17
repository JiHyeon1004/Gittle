import React from "react";
import { useLocation } from "react-router-dom";
import BranchList from "./BranchList";

// import GitCommit from "./GitCommit";
import CommitRuleButton from "./CommitRuleButton";
import LogCheck from "./LogCheck";
import styles from "./SideBar.module.css";

function SideBar() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <div className={styles.container}>
      {/* <GitCommit /> */}
      <div className={styles.selector}>
        <BranchList />
        <LogCheck />
      </div>
      <CommitRuleButton />
    </div>
  );
}

export default SideBar;
