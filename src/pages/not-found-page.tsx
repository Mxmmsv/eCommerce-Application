import { Link } from 'react-router';

import notFoundImgSrc from '@/assets/404-img.svg';
import { Button } from '@/components/ui/button';

function NotFound() {
  return (
    <main className="bg-white-100 m-auto flex min-h-screen w-full flex-col items-center justify-center gap-10">
      <div className="m-5 flex flex-col items-center justify-center gap-7 text-center">
        <img src={notFoundImgSrc} alt="page-not-found" className="flex h-auto w-full" />
        <h1 className="text-4xl font-semibold">Sorry, page not found!</h1>
        <p className="text-2xl text-gray-600">We can&apos;t find page you are looking for.</p>
      </div>
      <div className="flex flex-col items-center justify-around gap-5 md:flex-row">
        <Button
          variant="secondary"
          className="flex h-auto w-38 items-center bg-teal-300 px-10 py-3 text-2xl text-teal-900 hover:bg-teal-200 md:w-48 md:text-3xl"
        >
          <Link to="/">Home</Link>
        </Button>
        <Button
          variant="secondary"
          className="flex h-auto w-38 items-center bg-teal-300 px-10 py-3 text-2xl text-teal-900 hover:bg-teal-200 md:w-48 md:text-3xl"
        >
          <Link to="/catalog">Catalog</Link>
        </Button>
      </div>
    </main>
  );
}

export default NotFound;
