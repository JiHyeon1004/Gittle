import React, { useCallback, useEffect, useState } from "react";
import { Table, Row, Col, Card, Empty } from "antd";
import "antd/dist/antd.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import {
  mutliDragAwareReorder,
  multiSelectTo as multiSelect,
} from "./StatusUtils";
import "./StatusStyle.css";
/**
 * git add
 * git status 상태 값
 * file:///C:/Program%20Files/Git/mingw64/share/doc/git-doc/git-status.html
 */

// 오른쪽 있으면 unstaged 그걸로 추가 ??
//taskids도 비슷하게
const { ipcRenderer } = window.require("electron");
let gitStatus = ipcRenderer
  .sendSync("gitStatus", "asdf")
  .split("\n")
  .filter((element) => element !== "");
function unstagedData() {
  let data = [];
  for (let i of gitStatus) {
    let ii = i.trim().split(" ");
    if (i[0] === " " || i[0] === "?") {
      data.push({ id: data.length.toString(), title: ii[1] });
    }
  }
  return data;
}
//수정 예정
function unstagedIds(state) {
  let unstagedIds = [];
  let stagedIds = [];
  for (let i in gitStatus) {
    unstagedIds.push(i.toString());
  }
  if (state) return unstagedIds;
  else return stagedIds;
}
let entitiesMock = {
  tasks: unstagedData(),
  columnIds: ["unstaged", "staged"],
  columns: {
    unstaged: {
      id: "unstaged",
      title: "Unstaged",
      taskIds: unstagedIds(true),
    },
    staged: {
      id: "staged",
      title: "Staged",
      taskIds: [],
    },
  },
};
const COLUMN_ID_DONE = "staged";

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const PRIMARY_BUTTON_NUMBER = 0;

function MultiTableDrag() {
  const [entities, setEntities] = useState(entitiesMock);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [draggingTaskId, setDraggingTaskId] = useState(null);
  const [selectedTaskTitles, setSelectedTaskTitles] = useState([]);
  //이거가 테이블 헤더? 그거
  const tableColumns = [
    {
      title: "파일 이름",
      dataIndex: "title",
    },
  ];

  /**
   * On window click
   * 선택한 행 초기화
   */
  const onWindowClick = useCallback((e) => {
    if (e.defaultPrevented) {
      return;
    }
    setSelectedTaskIds([]);
    setSelectedTaskTitles([]);
  }, []);

  /**
   * On window key down
   * esc 클릭 시 선택한 행 초기화
   */
  const onWindowKeyDown = useCallback((e) => {
    if (e.defaultPrevented) {
      return;
    }

    if (e.key === "Escape") {
      setSelectedTaskIds([]);
      setSelectedTaskTitles([]);
    }
  }, []);

  /**
   * Event Listener
   */
  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      window.removeEventListener("click", onWindowClick);
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, [onWindowClick, onWindowKeyDown]);

  /**
   * Droppable table body
   */
  const DroppableTableBody = ({ columnId, tasks, ...props }) => {
    return (
      <Droppable
        droppableId={columnId}
        // isDropDisabled={columnId === 'unstaged'}
      >
        {(provided, snapshot) => (
          <tbody
            ref={provided.innerRef}
            {...props}
            {...provided.droppableProps}
            className={`${props.className} ${
              snapshot.isDraggingOver && columnId === COLUMN_ID_DONE
                ? "is-dragging-over"
                : ""
            }`}
          ></tbody>
        )}
      </Droppable>
    );
  };

  /**
   * Draggable table row
   */
  const DraggableTableRow = ({ index, record, columnId, tasks, ...props }) => {
    if (!tasks.length) {
      return (
        <tr className="ant-table-placeholder row-item" {...props}>
          <td colSpan={tableColumns.length} className="ant-table-cell">
            <div className="ant-empty ant-empty-normal">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          </td>
        </tr>
      );
    }

    const isSelected = selectedTaskIds.some(
      (selectedTaskId) => selectedTaskId === record.id
    );

    const isGhosting =
      isSelected && Boolean(draggingTaskId) && draggingTaskId !== record.id;

    return (
      <Draggable
        key={props["data-row-key"]}
        draggableId={props["data-row-key"]}
        index={index}
      >
        {(provided, snapshot) => {
          return (
            <tr
              ref={provided.innerRef}
              {...props}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`row-item ${isSelected ? "row-selected" : ""} ${
                isGhosting ? "row-ghosting" : ""
              } ${snapshot.isDragging ? "row-dragging" : ""}`}
              // onClick={onClick}
              // onKeyDown={event => onKeyDown(event, provided, snapshot)}
            ></tr>
          );
        }}
      </Draggable>
    );
  };

  /**
   * Get tasks
   */
  const getTasks = (entities, id) => {
    return entities.columns[id].taskIds.map((taskId) =>
      entities.tasks.find((item) => item.id === taskId)
    );
  };

  /**
   * On before capture
   */
  const onBeforeCapture = (start) => {
    const draggableId = start.draggableId;
    const selected = selectedTaskIds.find((taskId) => taskId === draggableId);
    // if dragging an item that is not selected - unselect all items
    // 드래그 중인 아이템이 선택된 것이 아닐 때 초기화
    if (!selected) {
      setSelectedTaskIds([]);
      setSelectedTaskTitles([]);
    }
    //드래그 중인 아이템에 현재 드래그 중인 행 추가
    // setDraggingTaskId(draggableId);   얘가 문제!!!!!!!!!!!!!!!!!!!!!!!
  };

  /**
   * On drag end
   */
  const onDragEnd = (result) => {
    const destination = result.destination;
    const source = result.source;
    // 같은 테이블 or 테이블 밖이면 초기화
    if (
      !destination ||
      destination.droppableId === source.droppableId ||
      result.reason === "CANCEL"
    ) {
      setDraggingTaskId(null);
      return;
    }
    for (let i of selectedTaskIds) {
      const state = entitiesMock.tasks.find(
        (element) => element.id === i.toString()
      );
    }

    //try catch 할 예정
    // if(destination.droppableId==="staged"){
    //   const state = ipcRenderer.ipcRenderer.sendSync("gitAdd","추가예정");
    // }
    // else if(destination.droppableId==="unstaged"){

    // }
    const processed = mutliDragAwareReorder({
      entities,
      selectedTaskIds,
      source,
      destination,
    });

    setEntities(processed.entities);
    setDraggingTaskId(null);
  };

  /**
   * Toggle selection
   * 키 안누르고 행 선택할 때
   */
  const toggleSelection = (task) => {
    const wasSelected = selectedTaskIds.includes(task.id);
    const wasSelctedFiles = selectedTaskIds.includes(task.title);
    const newTaskIds = (() => {
      // Task was not previously selected
      // now will be the only selected item
      // 선택 안 되어 있었으면 추가
      if (!wasSelected) {
        return [task.id];
      }

      // Task was part of a selected group
      // will now become the only selected item
      // 여러개 선택되어 있었으면 그 행만 선택, 나머지 초기화
      if (selectedTaskIds.length > 1) {
        return [task.id];
      }
      // task was previously selected but not in a group
      // we will now clear the selection
      // 선택 되어있었으면 빼기
      return [];
    })();
    const newTaskTitles = (() => {
      if (!wasSelctedFiles) {
        return [task.title];
      }
      if (setSelectedTaskTitles.length > 1) {
        return [task.title];
      }
      return [];
    })();
    setSelectedTaskIds(newTaskIds);
    setSelectedTaskTitles(newTaskTitles);
  };

  /**
   * Toggle selection in group
   * ctrl키 누르고 선택 시
   */
  const toggleSelectionInGroup = (task) => {
    const index = selectedTaskIds.indexOf(task.id);
    const title = task.title;
    // if not selected - add it to the selected items
    // 선택 안되어 있었으면 추가
    if (index === -1) {
      setSelectedTaskIds([...selectedTaskIds, task.id]);
      setSelectedTaskTitles([...selectedTaskTitles, task.title]);
      return;
    }

    // it was previously selected and now needs to be removed from the group
    // 선택 되어 있었으면 빼기
    const shallow = [...selectedTaskIds];
    const shallowTitles = [...selectedTaskTitles];
    shallow.splice(index, 1);
    shallowTitles.splice(title, 1);

    setSelectedTaskIds(shallow);
    setSelectedTaskTitles(shallowTitles);
  };

  /**
   * Multi select to
   * This behaviour matches the MacOSX finder selection
   * shift키 선택시
   */
  const multiSelectTo = (task) => {
    //util.js 확인
    const updated = multiSelect(entities, selectedTaskIds, task.id);
    if (updated == null) {
      return;
    }

    const updatedTitles = multiSelect(entities, selectedTaskTitles, task.title);
    if (updatedTitles == null) {
      return;
    }

    setSelectedTaskIds(updated);
    setSelectedTaskTitles(updatedTitles);
  };

  /**
   * On click to row
   * Using onClick as it will be correctly
   * preventing if there was a drag
   */
  const onClickRow = (e, record) => {
    if (e.defaultPrevented) {
      return;
    }
    //좌클릭 아니면 반응 X
    if (e.button !== PRIMARY_BUTTON_NUMBER) {
      return;
    }

    // marking the event as used
    e.preventDefault();
    performAction(e, record);
  };

  /**
   * Was toggle in selection group key used
   * Determines if the platform specific toggle selection in group key was used
   * ctrl키 누르고 있는지 boolean 값 반환
   */
  const wasToggleInSelectionGroupKeyUsed = (e) => {
    const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
    return isUsingWindows ? e.ctrlKey : e.metaKey;
  };

  /**
   * Was multi select key used
   * Determines if the multiSelect key was used
   * shift키 사용한 다중 선택
   */
  const wasMultiSelectKeyUsed = (e) => e.shiftKey;

  /**
   * Perform action
   * 행 선택했을 때 ctrl, shift, 기본 별 분기점
   */
  const performAction = (e, record) => {
    //ctrl
    if (wasToggleInSelectionGroupKeyUsed(e)) {
      toggleSelectionInGroup(record);
      return;
    }

    //shift
    if (wasMultiSelectKeyUsed(e)) {
      multiSelectTo(record);
      return;
    }

    //default
    toggleSelection(record);
  };

  return (
    <>
      <Card className={`c-multi-drag-table`}>
        <div>selectedTaskIds: {JSON.stringify(selectedTaskIds)}</div>
        <div>selectedTaskTitles: {JSON.stringify(selectedTaskTitles)}</div>
        <br />
        <DragDropContext
          onBeforeCapture={onBeforeCapture}
          onDragEnd={onDragEnd}
        >
          <Row gutter={24}>
            <Col key="unstaged" span={12}>
              <div className="inner-col-unstaged">
                <Row>
                  <h2>Unstaged</h2>
                </Row>
                <Table
                  dataSource={getTasks(entities, "unstaged")}
                  columns={tableColumns}
                  pagination={false}
                  scroll={{ y: 200 }}
                  rowKey="id"
                  components={{
                    body: {
                      // Custom tbody
                      wrapper: (val) =>
                        DroppableTableBody({
                          columnId: entities.columns["unstaged"].id,
                          tasks: getTasks(entities, "unstaged"),
                          ...val,
                        }),
                      // Custom td
                      row: (val) =>
                        DraggableTableRow({
                          tasks: getTasks(entities, "unstaged"),
                          ...val,
                        }),
                    },
                  }}
                  // Set props on per row (td)
                  onRow={(record, index) => ({
                    index,
                    record,
                    onClick: (e) => onClickRow(e, record),
                  })}
                />
              </div>
            </Col>
            <Col key="staged" span={12}>
              <div className="inner-col-staged">
                <Row justify="space-between" align="middle">
                  <h2>staged</h2>
                </Row>
                <Table
                  dataSource={getTasks(entities, "staged")}
                  columns={tableColumns}
                  pagination={false}
                  scroll={{ y: 200 }}
                  rowKey="id"
                  components={{
                    body: {
                      // Custom tbody
                      wrapper: (val) =>
                        DroppableTableBody({
                          columnId: entities.columns["staged"].id,
                          tasks: getTasks(entities, "staged"),
                          ...val,
                        }),
                      // Custom td
                      row: (val) =>
                        DraggableTableRow({
                          tasks: getTasks(entities, "staged"),
                          ...val,
                        }),
                    },
                  }}
                  // Set props on per row (td)
                  onRow={(record, index) => ({
                    index,
                    record,
                    onClick: (e) => onClickRow(e, record),
                  })}
                />
              </div>
            </Col>
          </Row>
          <br />
          <i>Multi select: Ctrl/Shift + Left Click</i>
        </DragDropContext>
      </Card>
    </>
  );
}

export default MultiTableDrag;
