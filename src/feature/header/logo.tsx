import { NavLink } from 'react-router';

function Logo() {
  return (
    <NavLink to="/" className="w-full text-center">
      <span className="logo text-5xl dark:text-white">Poster Store</span>
    </NavLink>
  );
}

export default Logo;
