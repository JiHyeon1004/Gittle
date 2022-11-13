import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from "./Graph.module.css";

export default function Graph() {
  const [graph, setGraph] = useState('')
  const [lines, setLines] = useState([])
  useEffect(() => {
    const { ipcRenderer } = window.require("electron")
    const result = ipcRenderer.sendSync("gitGraph")
    console.log(result)
    setGraph(result)
    setLines(result.split("\n"))
  }, [])
  return (
    <>
    <div className={styles.graph}>
      {graph.replaceAll(" ", "  ")}
    </div>
    {/* {lines.map((line, index) => (
      <div key={index}>{line.replace("*", "")}</div>
    ))} */}
    </>
  )
}