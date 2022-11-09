import React from "react";
import Assignee from "../components/mergeRequestListPage/Assignee";
import styles from "./MergeRequestListPage.module.css";

export default function MergeRequestListPage() {
  return (
    <div>
      <div>Merge 요청 목록</div>
      <Assignee />
    </div>
  );
}
