import { Link } from 'react-router';

import { buttonVariants } from '@/components/ui/button';

export function EmptyCart() {
  return (
    <div className="bg-white-100 m-auto w-full max-w-screen-lg flex-col items-center justify-center px-4 py-8">
      <div className="m-5 flex flex-col items-center justify-center gap-7 text-center">
        <img src="/empty-cart.svg" alt="Empty cart" className="h-auto w-full max-w-xl" />
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="text-muted-foreground text-xl">Start shopping to add posters to your cart</p>
      </div>
      <div className="flex flex-col items-center justify-around gap-5 md:flex-row">
        <Link
          className={`${buttonVariants({ variant: 'secondary' })} flex h-auto w-38 items-center px-10 py-3 text-2xl hover:bg-teal-100 max-md:text-2xl md:w-48 md:text-3xl dark:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-black`}
          to={'/catalog'}
        >
          Catalog
        </Link>
      </div>
    </div>
  );
}
