import React from "react";
import BranchManage from "./BranchManage";
import BranchSelector from "./BranchSelector";

function SideBar() {
  return (
    <div>
      <BranchSelector />
      <BranchManage />
    </div>
  );
}

export default SideBar;
