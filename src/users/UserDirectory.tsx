import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { endpoints } from "./types";
import type { Source, User } from "./types";

export default function UserDirectory() {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const [source, setSource] = useState<Source>("live");
  const [attempt, setAttempt] = useState(0); // bump to refetch the same URL
  const [query, setQuery] = useState("");

  useEffect(() => {
    // The race guard. If `source` changes while a slow request is in flight,
    // React runs this cleanup first, flipping the old run's `cancelled` to
    // true. When that stale response finally lands it writes nothing, so a
    // slow first request can never overwrite a fast second one.
    let cancelled = false;

    setStatus("loading");
    setErrorMessage("");

    fetch(endpoints[source])
      .then((response) => {
        // fetch only rejects on network failure, so check the status yourself.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json() as Promise<User[]>;
      })
      .then((data) => {
        if (cancelled) return;
        setUsers(data);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong"
        );
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
    // Only the two values the effect actually reads.
  }, [source, attempt]);

  const term = query.trim().toLowerCase();
  const visible = term
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.company.name.toLowerCase().includes(term)
      )
    : users;

  return (
    <section className="panel">
      <h1 className="panel__title">Directory</h1>
      <p className="panel__lede">
        Real data from jsonplaceholder. Switch the source to see each state.
      </p>

      <div className="controls">
        <div className="filters__group" role="group" aria-label="Data source">
          {(["live", "empty", "error"] as Source[]).map((option) => (
            <button
              key={option}
              type="button"
              className={source === option ? "chip chip--on" : "chip"}
              aria-pressed={source === option}
              onClick={() => setSource(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <input
          className="add__input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or company"
          aria-label="Search the directory"
        />
      </div>

      {/* 1. Loading */}
      {status === "loading" && (
        <ul className="list list--skeleton" aria-busy="true">
          {[0, 1, 2, 3].map((n) => (
            <li key={n} className="skeleton">
              <span className="skeleton__line skeleton__line--wide" />
              <span className="skeleton__line" />
            </li>
          ))}
        </ul>
      )}

      {/* 2. Error */}
      {status === "error" && (
        <div className="notice notice--error" role="alert">
          <p>Could not load the directory. {errorMessage}</p>
          <button
            type="button"
            className="btn btn--solid"
            onClick={() => setAttempt((n) => n + 1)}
          >
            Try again
          </button>
        </div>
      )}

      {/* 3. Empty -- the request worked, there is just nobody in it */}
      {status === "ready" && users.length === 0 && (
        <p className="empty">The directory is empty. Nobody to show yet.</p>
      )}

      {/* 3b. Search narrowed everything away */}
      {status === "ready" && users.length > 0 && visible.length === 0 && (
        <p className="empty">No one matches “{query.trim()}”. Try a shorter search.</p>
      )}

      {/* 4. Data */}
      {status === "ready" && visible.length > 0 && (
        <ul className="list">
          {visible.map((user) => (
            <li key={user.id} className="row">
              <div>
                <Link to={`/users/${user.id}`} className="row__link">
                  {user.name}
                </Link>
                <p className="row__meta">
                  {user.company.name} · {user.address.city}
                </p>
              </div>
              <span className="row__tag">#{user.id}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}