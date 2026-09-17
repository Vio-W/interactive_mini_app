import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <section className="panel">
      <p className="code404">404</p>
      <h1 className="panel__title">No route matches that URL</h1>
      <p className="panel__lede">
        Nothing is registered at <code>{location.pathname}</code>.
      </p>
      <p>
        Go to <Link to="/todos">todos</Link> or the{" "}
        <Link to="/users">directory</Link>.
      </p>
    </section>
  );
}