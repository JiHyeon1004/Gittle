import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { faCircleInfo, faQuestion, faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import styles from "./HelpGuide.module.css";
import Button from "../Button";


function HelpGuide(props) {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [pathname, setPathName] = useState("/add");

  const showInfo = () => {
    setPathName(location.pathname);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrent(0)
  }
  const addImages = useRef([{src: process.env.PUBLIC_URL + "/tutorial/add1.png"}, 
  {src: process.env.PUBLIC_URL + "/tutorial/add2.png"}, 
  {src: process.env.PUBLIC_URL + "/tutorial/add3.png"},
  {src: process.env.PUBLIC_URL + "/tutorial/add4.png"},
  {src: process.env.PUBLIC_URL + "/tutorial/add5.png"},
  {src: process.env.PUBLIC_URL + "/tutorial/add6.png"},
  {src: process.env.PUBLIC_URL + "/tutorial/add7.png"},
  {src: process.env.PUBLIC_URL + "/tutorial/add8.png"},
  {src: process.env.PUBLIC_URL + "/tutorial/add9.png"},
  {src: process.env.PUBLIC_URL + "/tutorial/add10.png"},
  {src: process.env.PUBLIC_URL + "/tutorial/add11.png"},
  {src: process.env.PUBLIC_URL + "/tutorial/add12.png"}
]);

const pushImages = useRef([{src: process.env.PUBLIC_URL + "/tutorial/push1.png"}, 
{src: process.env.PUBLIC_URL + "/tutorial/push2.png"}, 
{src: process.env.PUBLIC_URL + "/tutorial/push3.png"},
]);

const mergeImages = useRef([{src: process.env.PUBLIC_URL + "/tutorial/merge1.png"}, 
{src: process.env.PUBLIC_URL + "/tutorial/merge2.png"}, 
{src: process.env.PUBLIC_URL + "/tutorial/merge3.png"},
{src: process.env.PUBLIC_URL + "/tutorial/merge4.png"},
{src: process.env.PUBLIC_URL + "/tutorial/merge5.png"},
{src: process.env.PUBLIC_URL + "/tutorial/merge6.png"},
{src: process.env.PUBLIC_URL + "/tutorial/merge7.png"},
{src: process.env.PUBLIC_URL + "/tutorial/merge8.png"},
{src: process.env.PUBLIC_URL + "/tutorial/merge9.png"},
{src: process.env.PUBLIC_URL + "/tutorial/merge10.png"}
]);

const mergeReqImages = useRef([{src: process.env.PUBLIC_URL + "/tutorial/merge11.png"}, 
{src: process.env.PUBLIC_URL + "/tutorial/merge12.png"}
])
  
  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`
  });
  const addImgSize = useRef(addImages.current.length);
  const pushImgSize = useRef(pushImages.current.length);
  const mergeImgSize = useRef(mergeImages.current.length);
  const mergeReqImgSize = useRef(mergeReqImages.current.length);

  const addMoveSlide = (i) => {
    let nextIndex = current + i;
    
    if (nextIndex < 0) nextIndex = addImgSize.current - 1;
    else if (nextIndex >= addImgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  const pushMoveSlide = (i) => {
    let nextIndex = current + i;
    
    if (nextIndex < 0) nextIndex = pushImgSize.current - 1;
    else if (nextIndex >= pushImgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  const mergeMoveSlide = (i) => {
    let nextIndex = current + i;
    
    if (nextIndex < 0) nextIndex = mergeImgSize.current - 1;
    else if (nextIndex >= mergeImgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  const mergeReqMoveSlide = (i) => {
    let nextIndex = current + i;
    
    if (nextIndex < 0) nextIndex = mergeReqImgSize.current - 1;
    else if (nextIndex >= mergeReqImgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  useEffect(() => {
      setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={faQuestion}
        onClick={showInfo}
        className={styles.icon}
      />

      <Modal
        open={modalOpen}
        content={
          <>
            <div>
              {/* 구분용 */}
              {/* {pathname.replace("/", "")} 페이지 */}
              {pathname == "/add" ? (
                <div className={styles.modalcontainer}>
                <div className={styles.slide}>
                  <div onClick={() => { addMoveSlide(-1); }}>
                  <FontAwesomeIcon icon={faCircleChevronLeft} className={styles.btn} />
                  </div>
                  <div className={styles.imgbox}>
                    <div className={styles.flexbox} style={style}>
                      {addImages.current.map((img, i) => (
                        <div
                          key={i}
                          className={styles.img}
                          style={{ backgroundImage: `url(${img.src})` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div onClick={() => { addMoveSlide(1); }}>
                  <FontAwesomeIcon icon={faCircleChevronRight} className={styles.btn} />
                  </div>
                </div>
                <div className={styles.position}>
                  {addImages.current.map((x, i) => (
                    <div
                      key={i}
                      className={i === current ? styles.dotcurrent : styles.dot}
                      ></div>
                  ))}
                </div>
                </div>
              ) : pathname === "/push" ? (
                <div className={styles.modalcontainer}>
                <div className={styles.slide}>
                  <div onClick={() => { pushMoveSlide(-1); }}>
                  <FontAwesomeIcon icon={faCircleChevronLeft} className={styles.btn} />
                  </div>
                  <div className={styles.imgbox}>
                    <div className={styles.flexbox} style={style}>
                      {pushImages.current.map((img, i) => (
                        <div
                          key={i}
                          className={styles.img}
                          style={{ backgroundImage: `url(${img.src})` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div onClick={() => { pushMoveSlide(1); }}>
                  <FontAwesomeIcon icon={faCircleChevronRight} className={styles.btn} />
                  </div>
                </div>
                <div className={styles.position}>
                  {pushImages.current.map((x, i) => (
                    <div
                      key={i}
                      className={i === current ? styles.dotcurrent : styles.dot}
                      ></div>
                  ))}
                </div>
                </div>
              ) : pathname === "/merge/ready" ? (
                <div className={styles.modalcontainer}>
                <div className={styles.slide}>
                  <div onClick={() => { mergeMoveSlide(-1); }}>
                  <FontAwesomeIcon icon={faCircleChevronLeft} className={styles.btn} />
                  </div>
                  <div className={styles.imgbox}>
                    <div className={styles.flexbox} style={style}>
                      {mergeImages.current.map((img, i) => (
                        <div
                          key={i}
                          className={styles.img}
                          style={{ backgroundImage: `url(${img.src})` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div onClick={() => { mergeMoveSlide(1); }}>
                  <FontAwesomeIcon icon={faCircleChevronRight} className={styles.btn} />
                  </div>
                </div>
                <div className={styles.position}>
                  {mergeImages.current.map((x, i) => (
                    <div
                      key={i}
                      className={i === current ? styles.dotcurrent : styles.dot}
                      ></div>
                  ))}
                </div>
                </div>
              ) : pathname === "/merge" ? (
                <img />
              ) : pathname === "/merge/request" ? (
                <div className={styles.modalcontainer}>
                <div className={styles.slide}>
                  <div onClick={() => { mergeReqMoveSlide(-1); }}>
                  <FontAwesomeIcon icon={faCircleChevronLeft} className={styles.btn} />
                  </div>
                  <div className={styles.imgbox}>
                    <div className={styles.flexbox} style={style}>
                      {mergeReqImages.current.map((img, i) => (
                        <div
                          key={i}
                          className={styles.img}
                          style={{ backgroundImage: `url(${img.src})` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div onClick={() => { mergeReqMoveSlide(1); }}>
                  <FontAwesomeIcon icon={faCircleChevronRight} className={styles.btn} />
                  </div>
                </div>
                <div className={styles.position}>
                  {mergeReqImages.current.map((x, i) => (
                    <div
                      key={i}
                      className={i === current ? styles.dotcurrent : styles.dot}
                      ></div>
                  ))}
                </div>
                </div>
              ) : (
                // log
                <img />
              )}
            </div>
          </>
        }
        style={{ width: "1000px", height: "750px" }}
      >
        <Button
        action={closeModal}
        content={"돌아가기"}
        style={{ backgroundColor: "#6BCC78" }}
      />
      </Modal>
    </div>
  );
}

export default HelpGuide;
