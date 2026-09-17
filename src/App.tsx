import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TodoApp from "./todos/TodoApp";
import UserDirectory from "./users/UserDirectory";
import UserDetail from "./users/UserDetail";

export default function App() {
  return (
    <Routes>
      {/* Layout renders the nav + <Outlet />, so every child route keeps the
          same shell and navigation never reloads the page. */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="todos" element={<TodoApp />} />
        <Route path="users" element={<UserDirectory />} />
        <Route path="users/:id" element={<UserDetail />} />

        {/* Catch-all. Must be last: routes are matched by specificity,
            and this is the fallback for anything unmatched. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}