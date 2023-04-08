import React from "react";
const TodoList = () => {
  return (
    <div className="todo">
      <div className="add">
        <h1>Todo List</h1>
        <input data-testid="new-todo-input" />
        <button data-testid="new-todo-add-button">추가</button>
      </div>

      <ul>
        <li className="title">
          <span>완료</span>
          <span>해야 할 일</span>
        </li>
        <li>
          <label>
            <input type="checkbox" className="checkBox" />
            <span>아침 먹고 운동가기</span>
            <div className="edit">
              <button data-testid="modify-button">수정</button>
              <button data-testid="delete-button">삭제</button>
            </div>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default TodoList;
