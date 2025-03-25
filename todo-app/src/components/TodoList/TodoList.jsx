import styles from "./TodoList.module.css";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "../TodoItem/TodoItem";
import Logo from "../../assets/images/LogoTodoList.svg";
import TasksEmptyIcon from "../../assets/images/TasksEmptyIcon.svg";
import classNames from "classnames";
import Button from "../Button/Button";
import { useTodoContext } from "../../context/TodoContext";

function TodoList() {
  const {
    tasks,
    newTask,
    handleInputChange,
    handleAddTask,
    handleKeyDown,
    handleToggleTaskStatus,
    handleDeleteTask,
    filteredTasks,
    filter,
    setFilter,
  } = useTodoContext();

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
          <Button onClick={handleAddTask} className={styles.button__addTask}>
            +
          </Button>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.filterBtn}>
          <Button
            className={classNames(styles.button__filter, {
              [styles.active]: filter === "all",
            })}
            onClick={() => setFilter("all")}
          >
            All tasks
          </Button>
          <Button
            className={classNames(styles.button__filter, {
              [styles.active]: filter === "completed",
            })}
            onClick={() => setFilter("completed")}
          >
            Completed tasks
          </Button>
        </div>

        <div className={styles.tasksList}>
          {filteredTasks.length === 0 ? (
            filter === "completed" ? (
              <p className={styles.tasksList__completedEmptyText}>
                You don't have any completed tasks yet. <br />
                Check All Tasks!
              </p>
            ) : (
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
            )
          ) : (
            <ul>
              {filteredTasks.map((item) => (
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
