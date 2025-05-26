import { Link, Outlet } from 'react-router';

import { useCustomerStore } from '@/service/store/use-user-store';

export default function UserProfilePage() {
  const customer = useCustomerStore((state) => state.customer);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center text-lg">
      <h1 className="text-2xl font-bold">User Profile Page</h1>
      {customer !== null && (
        <span>
          Hello, {customer?.firstName} {customer?.lastName}
        </span>
      )}
      <div className="mt-4 flex flex-col items-center justify-center">
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link to="/registration" className="text-blue-500 hover:underline">
          Registration
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
