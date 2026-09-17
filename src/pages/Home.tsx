import { Link } from "react-router-dom";

/**
 * Index route. If you want your existing product catalog on "/", import it
 * here and render it instead of this text -- the route table in App.tsx does
 * not need to change:
 *
 *   import ProductCatalog from "../components/ProductCatalog";
 *   export default function Home() { return <ProductCatalog />; }
 */
export default function Home() {
  return (
    <section className="panel">
      <h1 className="panel__title">Two views, one shell</h1>
      <p className="panel__lede">
        <Link to="/todos">Todos</Link> holds its state in one place.{" "}
        <Link to="/users">Directory</Link> fetches real people and has a page
        per person.
      </p>
    </section>
  );
}