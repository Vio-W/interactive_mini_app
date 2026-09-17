import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed); // callback up -- AddTodo never touches the array itself
    setText("");
  };

  return (
    <form className="add" onSubmit={handleSubmit}>
      <input
        className="add__input"
        value={text}
        onChange={handleChange}
        placeholder="What needs doing?"
        aria-label="New todo"
      />
      <button className="btn btn--solid" type="submit" disabled={!text.trim()}>
        Add todo
      </button>
    </form>
  );
}