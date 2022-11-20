import React, { useState, useEffect, useRef } from "react";
import styles from "./Tutorial.module.css";
import Modal from "../common/Modal";
import Button from "../common/Button";
import {
  faCircleChevronLeft, faCircleChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Tutorial() {

  const images = useRef([{src: process.env.PUBLIC_URL + "/tutorial/main1.png"}, 
  {src: process.env.PUBLIC_URL + "/tutorial/main2.png"}, 
  {src: process.env.PUBLIC_URL + "/tutorial/main3.png"}]);
  
  const [current, setCurrent] = useState(0);
  const [des, setDes] = useState(false)
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`
  });
  const imgSize = useRef(images.current.length);

  const moveSlide = (i) => {
    let nextIndex = current + i;
    
    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  useEffect(() => {
      setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  const showDes = () => {
    setDes(true)
  }

  const closeDes = () => {
    setDes(false)
  }

  return (<>
    <div className={styles.tutorial} onClick={showDes}>시작이 어렵다면?</div>
    <Modal
        open={des}
        content={
          <div className={styles.container}>
            <div className={styles.slide}>
              <div onClick={() => { moveSlide(-1); }}>
              <FontAwesomeIcon icon={faCircleChevronLeft} className={styles.btn} />
              </div>
              <div className={styles.imgbox}>
                <div className={styles.flexbox} style={style}>
                  {images.current.map((img, i) => (
                    <div
                      key={i}
                      className={styles.img}
                      style={{ backgroundImage: `url(${img.src})` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div onClick={() => { moveSlide(1); }}>
              <FontAwesomeIcon icon={faCircleChevronRight} className={styles.btn} />
              </div>
            </div>
            <div className={styles.position}>
              {images.current.map((x, i) => (
                <div
                  key={i}
                  className={i === current ? styles.dotcurrent : styles.dot}
                  ></div>
              ))}
            </div>
          </div>
        }
        style={{ width: "1000px", height: "750px" }}
      >
      <Button
        action={closeDes}
        content={"돌아가기"}
        style={{ backgroundColor: "#6BCC78" }}
      />
      </Modal>
  </>)
  
}

export default Tutorial;
