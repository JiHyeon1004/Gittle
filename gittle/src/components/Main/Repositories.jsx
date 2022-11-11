import React, { useState, useEffect } from "react";
import styles from "./Repositories.module.css";
import Repo from "./Repo";
import { useNavigate } from "react-router";
import { result } from "lodash";

function Repoes() {
  // console.log('myRe : '+myRe)
  const navigate = useNavigate();

  const [myRe, setMyRe] = useState([ ]);

  useEffect(() => {
    const temp = callMyRepo();
    setMyRe(temp);
  }, []);

  const callMyRepo = () => {
    console.log("start");
    // const temp = ipcRenderer.sendSync("call-my-repo");
    
    let arr;
    if(localStorage.getItem("repoList")===null || localStorage.getItem("repoList")===""){
      arr=[]
    }else{
      arr = JSON.parse(localStorage.getItem("repoList"))
    }

  
    console.log("arr : " + arr);
  
    let result = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== null || arr[i]==="") {
        result.push(arr[i]);
        console.log("branch : ",arr[i].branch)
        console.log("root : ",arr[i].root)
      }
  
      console.log(arr[i]);
    }
  
    if (result.length !== arr.length) {
      localStorage.setItem(JSON.stringify(result))
    }
  
    console.log("end");
    return result;
  };







  const repoFiles = (
    <div>
      {myRe.map((item, idx) => (
        <>
          <Repo
            className="hi"
            id={idx}
            branch={item.branch}
            root={item.root}
            startGittle={() => {
              navigate("/add", {
                state: { name: item.branch, root: item.root },
              });
              localStorage.setItem("currentRepo",item.root)
              let tempArr=JSON.parse(localStorage.getItem("repoList"))
              // tempArr.unshift({ name: item.branch, root: item.root })

              let resultArr=[]
              resultArr.push({ name: item.branch, root: item.root })
              for(let i=0;i<tempArr.length;i++){
                if(resultArr.length===3){
                  break
                }
                if(tempArr[i].root !== item.root){
                  resultArr.push(tempArr[i])
                }
              }

              localStorage.setItem("repoList",JSON.stringify(resultArr))

            }}
          />
        </>
      ))}
    </div>
  );

  return (
    <div className={styles.repo}>
      최근 repo
      {repoFiles}
    </div>
  );
}

export default Repoes;
