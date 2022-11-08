import React from "react";
import AddBranch from "./AddBranch";
import AddCommitConvention from "./AddCommitConvention";
import DeleteBranch from "./DeleteBranch";

function BranchManage() {
  return (
    <div>
      <AddBranch />
      <DeleteBranch />
      <AddCommitConvention/>
    </div>
  );
}

export default BranchManage;
