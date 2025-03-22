import styles from "./TodoList.module.css";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "../TodoItem/TodoItem";
import Logo from "../../assets/images/LogoTodoList.svg";
import TasksEmptyIcon from "../../assets/images/TasksEmptyIcon.svg";
import classNames from "classnames";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: uuidv4(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleToggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header__logoBox}>
          <img
            className={classNames(styles.logo__img, "logo")}
            src={Logo}
            alt="LogoTodoList"
          />
        </div>
        <div className={styles.inputBox}>
          <input
            className={styles.input__addTask}
            type="text"
            value={newTask}
            placeholder="Your new task..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddTask} className={styles.button__addTask}>
            +
          </button>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.filterBtn}>
          <button className={styles.button__filter}>All tasks</button>
          <button className={styles.button__filter}>Completed tasks</button>
        </div>

        <div className={styles.tasksList}>
          {tasks.length === 0 ? (
            <div className={styles.tasksList__empty}>
              <img
                src={TasksEmptyIcon}
                alt="tasksList__emptyIcon"
                className={styles.tasksList__emptyIcon}
              />
              <p className={styles.tasksList__emptyText}>
                You don't have any tasks registered <br />
                <span>(Create tasks and organize your to-do items)</span>
              </p>
            </div>
          ) : (
            <ul>
              {tasks.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleTaskStatus}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
