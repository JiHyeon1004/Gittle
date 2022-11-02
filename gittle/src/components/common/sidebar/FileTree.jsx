import React, { useState } from "react";

function FileTree() {
  const [files, setFiles] = useState([]);
  //   const [path, setPath] = useState([]);
  const relativePaths = [];
  const getFiles = (e) => {
    setFiles(Array.from(e.target.files || []));
  };
  const getFileRelativePath = () => {
    files.map((file) => relativePaths.push(file.webkitRelativePath));
  };
  getFileRelativePath();

  const splitedPaths = [];
  const fileTree = [];
  const splitRelativePath = () => {
    relativePaths.forEach((path) => {
      let splitedPath;
      splitedPath = path.split("/");
      splitedPaths.push(splitedPath);
    });

    splitedPaths.forEach((path) => {
      for (let i = 0; i < path.length; i++) {
        console.log(path);
      }
    });
    // console.log(path);

    console.log(fileTree);
  };
  splitRelativePath();

  //   const createPathTree = () => {
  //     splitedPaths.map((path) => path.map((folder) => console.log(folder)));
  //   };
  //   createPathTree();

  return (
    <div>
      <input type="file" webkitdirectory="true" onChange={getFiles} />
      {/* <ul>
        {files.map((file) => (
          <li key={file.webkitRelativePath}>{file.webkitRelativePath}</li>
        ))}
      </ul> */}
      {/* {files.map((file) => (
        <p key={file.name}>{file.name}</p>
      ))} */}
    </div>
  );
}

export default FileTree;
