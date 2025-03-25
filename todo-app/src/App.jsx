import TodoList from "./components/TodoList/TodoList";
import "./App.css";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </>
  );
}

export default App;
