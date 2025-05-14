import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav className="bg-muted">
      <ul className="flex justify-center gap-2">
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/catalog">Catalog</Link>
        </li>
        <li>
          <Link to="/catalog/123">Product Detail</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/basket">Basket</Link>
        </li>
        <li>
          <Link to="/about">About us</Link>
        </li>
      </ul>
    </nav>
  );
}
