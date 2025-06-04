import { NavLink, Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <nav>
      <p>
        <Link to="/">Eshopy</Link>
      </p>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
      </ul>
    </nav>
  );
}
