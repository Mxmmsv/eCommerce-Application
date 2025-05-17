import { Link, Outlet, useLocation } from 'react-router';

export default function UserProfilePage() {
  const location = useLocation();

  return (
    <div className="p-4 text-center">
      {location.pathname === '/profile' && (
        <h1 className="text-2xl font-bold">User Profile Page</h1>
      )}

      {location.pathname === '/profile' && (
        <div className="mt-4 flex flex-col items-center justify-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
          <Link to="/registration" className="text-blue-500 hover:underline">
            Registration
          </Link>
        </div>
      )}

      <Outlet />
    </div>
  );
}
