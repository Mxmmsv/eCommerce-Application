import { Link } from 'react-router';

import { buttonVariants } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <>
      <title>{'Page not found :: Poster store'}</title>
      <main className="bg-white-100 m-auto flex w-full flex-col items-center justify-center gap-10">
        <div className="m-5 flex flex-col items-center justify-center gap-7 text-center">
          <img
            src="/404-img.svg"
            alt="Sorry, page not found! We can not find page you are looking for"
            className="flex h-auto w-full"
          />
          <h1 className="text-4xl font-semibold">Sorry, page not found!</h1>
          <p className="text-2xl">We can&apos;t find page you are looking for.</p>
        </div>
        <div className="flex flex-col items-center justify-around gap-5 md:flex-row">
          <Link
            className={`${buttonVariants({ variant: 'secondary' })} flex h-auto w-38 items-center px-10 py-3 text-2xl hover:bg-teal-100 max-md:text-2xl md:w-48 md:text-3xl dark:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-black`}
            to={'/'}
          >
            Home
          </Link>

          <Link
            className={`${buttonVariants({ variant: 'secondary' })} flex h-auto w-38 items-center px-10 py-3 text-2xl hover:bg-teal-100 max-md:text-2xl md:w-48 md:text-3xl dark:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-black`}
            to={'/catalog'}
          >
            Catalog
          </Link>
        </div>
      </main>
    </>
  );
}
