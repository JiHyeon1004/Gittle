import React from "react";
import AddBranch from "./AddBranch";
import DeleteBranch from "./DeleteBranch";
import styles from "./BranchManage.module.css";

function BranchManage() {
  return (
    <div className={styles.container}>
      <AddBranch />
      <DeleteBranch />
    </div>
  );
}

export default BranchManage;
