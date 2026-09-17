import type { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={todo.completed ? "row row--done" : "row"}>
      <label className="row__label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>

      <button
        type="button"
        className="row__remove"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.text}`}
      >
        Delete
      </button>
    </li>
  );
}