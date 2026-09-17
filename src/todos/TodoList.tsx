import TodoItem from "./TodoItem";
import type { Todo, Filter } from "./types";

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const emptyCopy: Record<Filter, string> = {
  all: "Nothing here yet. Add the first one above.",
  active: "No active todos. Everything is done.",
  completed: "Nothing completed yet.",
};

export default function TodoList({
  todos,
  filter,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty">{emptyCopy[filter]}</p>;
  }

  return (
    <ul className="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}