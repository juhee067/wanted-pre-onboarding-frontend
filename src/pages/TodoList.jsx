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

  // getTodos
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://www.pre-onboarding-selection-task.shop/todos",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTodoItems([...response.data]);
        console.log(response.data);
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
      await axiosInstance.delete(`/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setTodoItems((prevList) =>
        prevList.filter((todoItems) => todoItems.id !== todoId)
      );
    } catch (error) {
      console.log(error);
    }
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
          <span>완료</span>
          <span>해야 할 일</span>
        </li>
        {todoItems.map((todoItem) => {
          return (
            <li key={todoItem.id}>
              <label>
                <input type="checkbox" className="checkBox" />
                <span>{todoItem.todo}</span>
                <div className="edit">
                  <button data-testid="modify-button">수정</button>
                  <button
                    data-testid="delete-button"
                    onClick={() => {
                      onTodoDelete(todoItem.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
