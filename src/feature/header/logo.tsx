import { NavLink } from 'react-router';

function Logo() {
  return (
    <NavLink to="/" className="w-full text-center">
      <img
        src="/logo.webp"
        alt="poster store logo"
        className="h-auto w-full dark:brightness-0 dark:hue-rotate-180 dark:invert"
      />
    </NavLink>
  );
}

export default Logo;
