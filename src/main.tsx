import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// BrowserRouter must wrap everything that uses Link, NavLink, useParams, etc.
// StrictMode in dev mounts -> unmounts -> remounts each component once.
// That is on purpose: if a cleanup is missing, you get two clocks or two
// listeners and you will see it immediately.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);