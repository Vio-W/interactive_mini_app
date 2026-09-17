import { NavLink, Outlet, Link } from "react-router-dom";
import WindowStatus from "./WindowStatus";

export default function Layout() {
  return (
    <div className="shell">
      <header className="shell__bar">
        <Link to="/" className="shell__mark">
          product-catalog
        </Link>

        <nav className="shell__nav">
          {/* NavLink gives us isActive for free. Link/NavLink do client-side
              navigation: the URL changes, React swaps the view, no reload. */}
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              isActive ? "shell__link shell__link--on" : "shell__link"
            }
          >
            Todos
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "shell__link shell__link--on" : "shell__link"
            }
          >
            Directory
          </NavLink>
        </nav>

        <WindowStatus />
      </header>

      <main className="shell__main">
        {/* Whatever child route matched renders here. */}
        <Outlet />
      </main>
    </div>
  );
}