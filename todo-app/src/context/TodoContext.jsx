import React, { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

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
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    return true;
  });

  const value = {
    tasks,
    setTasks,
    newTask,
    setNewTask,
    handleInputChange,
    handleAddTask,
    handleKeyDown,
    handleToggleTaskStatus,
    handleDeleteTask,
    filteredTasks,
    filter,
    setFilter,
  };

  return <TodoContext.Provider value={value}> {children}</TodoContext.Provider>;
};
export const useTodoContext = () => useContext(TodoContext);
