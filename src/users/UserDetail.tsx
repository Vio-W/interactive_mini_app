import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "./types";
import type { User } from "./types";

export default function UserDetail() {
  // The URL is the input. /users/3 -> id === "3".
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    setStatus("loading");
    setErrorMessage("");

    fetch(`${API}/users/${id}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error(`No user with id ${id}.`);
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json() as Promise<User>;
      })
      .then((data) => {
        if (cancelled) return;
        setUser(data);
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
    // `id` is the only outside value this effect reads. Click from user 3 to
    // user 4 quickly and the stale response for 3 is discarded, not rendered.
  }, [id]);

  return (
    <section className="panel">
      <Link to="/users" className="back">
        Back to directory
      </Link>

      {status === "loading" && (
        <div className="skeleton skeleton--block" aria-busy="true">
          <span className="skeleton__line skeleton__line--wide" />
          <span className="skeleton__line" />
          <span className="skeleton__line" />
        </div>
      )}

      {status === "error" && (
        <div className="notice notice--error" role="alert">
          <p>{errorMessage}</p>
          <p className="notice__hint">
            Ids 1 to 10 exist. Try <Link to="/users/1">/users/1</Link>.
          </p>
        </div>
      )}

      {status === "ready" && user && (
        <article>
          <h1 className="panel__title">{user.name}</h1>
          <p className="panel__lede">
            @{user.username} · {user.company.name}
          </p>

          <dl className="facts">
            <dt>Email</dt>
            <dd>{user.email}</dd>
            <dt>Phone</dt>
            <dd>{user.phone}</dd>
            <dt>Website</dt>
            <dd>{user.website}</dd>
            <dt>Address</dt>
            <dd>
              {user.address.suite} {user.address.street}, {user.address.city}{" "}
              {user.address.zipcode}
            </dd>
            <dt>Company line</dt>
            <dd>{user.company.catchPhrase}</dd>
          </dl>
        </article>
      )}
    </section>
  );
}