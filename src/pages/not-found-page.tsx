import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-500">404 - Page not found</h1>
      <Link to="/" className="mt-4 text-xl text-blue-500">
        Back to home page
      </Link>
    </div>
  );
}

export default NotFound;
