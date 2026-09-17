import { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import FilterBar from "./FilterBar";
import type { Todo, Filter } from "./types";

const seed: Todo[] = [
  { id: "seed-1", text: "Lift the todo state", completed: true },
  { id: "seed-2", text: "Clean up every listener", completed: false },
  { id: "seed-3", text: "Guard the fetch with a cancelled flag", completed: false },
];

/**
 * This is the ONLY component that calls useState for todos or filter.
 * Children receive values as props and send changes back as callbacks.
 * AddTodo keeps its own input text in local state -- that is fine, no other
 * component needs to read a half-typed string.
 */
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(seed);
  const [filter, setFilter] = useState<Filter>("all");

  // Every updater uses the prev => form so it never reads a stale `todos`.
  const handleAdd = (text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Derived values. Nothing here needs its own useState -- it is all
  // recomputed from todos + filter on each render.
  const visible = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <section className="panel">
      <h1 className="panel__title">Todos</h1>
      <p className="panel__lede">
        One list, one owner. Everything below talks through props and callbacks.
      </p>

      <AddTodo onAdd={handleAdd} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
        completedCount={completedCount}
        onClearCompleted={handleClearCompleted}
      />

      <TodoList
        todos={visible}
        filter={filter}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </section>
  );
}