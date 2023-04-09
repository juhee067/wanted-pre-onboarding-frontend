import React, { useState, useEffect } from "react";
import "./todolist.scss";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../modules/Auth";
import axiosInstance from "../modules/AxiosInstance";
import axios from "axios";

const TodoList = () => {
  const navigate = useNavigate();
  let access_token = getAccessToken();

  // input value
  let [inputValue, setInputValue] = useState("");
  // todoList 아이템
  let [todoItems, setTodoItems] = useState([]);
  // 수정 활성화 input 창
  let [inputModifyValue, setInputModifyValue] = useState("");
  // getTodos
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://www.pre-onboarding-selection-task.shop/todos",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setTodoItems([...response.data]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [access_token]);

  // input 작성
  const onTodoHandler = (e) => {
    setInputValue(e.currentTarget.value);
  };

  // 추가
  const onTodoAdd = async () => {
    if (!inputValue) return;
    const body = {
      todo: inputValue,
    };

    try {
      let response = await axiosInstance.post("/todos", body, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setTodoItems((prevList) => [...prevList, { ...response.data }]);
      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };

  // 삭제
  const onTodoDelete = async (todoId) => {
    try {
      await axios.delete(
        `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setTodoItems((prevList) =>
        prevList.filter((todoItems) => todoItems.id !== todoId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 완료
  const onTodoToggle = async (todoId, inputValue) => {
    const body = {
      todo: inputValue,
      isCompleted: !todoItems.find((todo) => todo.id === todoId)?.isCompleted,
    };
    try {
      await axiosInstance.put(`/todos/${todoId}`, body, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setTodoItems((prevList) =>
        prevList.map((todo) =>
          todo.id === todoId
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  //수정
  const onTodoModify = (todoId) => {
    setInputModifyValue(todoItems.find((item) => item.id === todoId)?.todo);
    setTodoItems((prevList) =>
      prevList.map((todo) =>
        todo.id === todoId
          ? { ...todo, isModify: true }
          : { ...todo, isModify: false }
      )
    );
  };

  // 수정 data put 요청
  const onTodoSubmit = async (todoId) => {
    const body = {
      todo: inputModifyValue,
      isCompleted: todoItems.find((todo) => todo.id === todoId)?.isCompleted,
    };
    try {
      await axiosInstance.put(`/todos/${todoId}`, body, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setTodoItems((prevList) =>
        prevList.map((todo) =>
          todo.id === todoId
            ? { ...todo, todo: inputModifyValue, isModify: !todo.isModify }
            : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  // 수정 내용 제출
  const modifyTodo = (todoItem) => {
    setTodoItems((prevList) =>
      prevList.map((t) =>
        t.id === todoItem.id ? { ...t, todo: inputModifyValue } : t
      )
    );
    onTodoSubmit(todoItem.id);
  };

  //제출 취소
  const onTodoModifyCancel = (todoId) => {
    setTodoItems((prevList) =>
      prevList.map((todo) =>
        todo.id === todoId ? { ...todo, isModify: !todo.isModify } : todo
      )
    );
  };

  // token redirection
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);
  return (
    <div className="todo">
      <div className="add">
        <h1>Todo List</h1>
        <input
          data-testid="new-todo-input"
          onChange={onTodoHandler}
          value={inputValue}
        />

        <button data-testid="new-todo-add-button" onClick={onTodoAdd}>
          추가
        </button>
      </div>
      <ul>
        <li className="title">
          <span>해야 할 일</span>
        </li>
        {todoItems.map((todoItem) => {
          return (
            <li key={todoItem.id}>
              <label>
                <input
                  type="checkbox"
                  className="checkBox"
                  checked={todoItem.isCompleted}
                  onChange={() => {
                    onTodoToggle(todoItem.id, todoItem.todo);
                  }}
                />
                {todoItem.isModify ? (
                  <>
                    <input
                      type="text"
                      className="modifyInput"
                      value={inputModifyValue}
                      onChange={(e) => setInputModifyValue(e.target.value)}
                    />
                    <div className="edit">
                      {" "}
                      <button
                        data-testid="submit-button"
                        onClick={() => {
                          modifyTodo(todoItem);
                        }}
                      >
                        제출
                      </button>
                      <button
                        className="modifyCancel"
                        data-testid="cancel-button"
                        onClick={() => {
                          onTodoModifyCancel(todoItem.id);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{todoItem.todo}</span>
                    <div className="edit">
                      {" "}
                      <button
                        data-testid="modify-button"
                        onClick={() => onTodoModify(todoItem.id)}
                      >
                        수정
                      </button>
                      <button
                        data-testid="delete-button"
                        onClick={() => {
                          onTodoDelete(todoItem.id);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
