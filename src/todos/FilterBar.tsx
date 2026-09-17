import type { Filter } from "./types";

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (next: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const options: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="filters">
      <div className="filters__group" role="group" aria-label="Filter todos">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={
              filter === option.value ? "chip chip--on" : "chip"
            }
            aria-pressed={filter === option.value}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <span className="filters__count">
        {activeCount} left
      </span>

      <button
        type="button"
        className="btn btn--quiet"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed ({completedCount})
      </button>
    </div>
  );
}