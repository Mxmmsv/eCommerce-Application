import { DribbbleIcon, GithubIcon, TwitterIcon } from 'lucide-react';
import { Link } from 'react-router';

function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{' '}
              <Link to="/" className="hover:text-chart-3 transition-colors duration-300">
                Poster Store
              </Link>
              .
            </p>
            <p className="text-muted-foreground">All rights reserved</p>
          </div>

          <div className="flex flex-col items-center justify-center md:items-end">
            <span className="text-muted-foreground">Rolling Scopes School</span>
            <ul className="text-muted-foreground flex gap-5">
              <li>
                <Link
                  to="https://rs.school"
                  target="_blank"
                  className="hover:text-chart-3 p-2 transition-colors duration-300 lg:p-1"
                >
                  <DribbbleIcon className="h-5 w-5" />
                </Link>
              </li>
              <li>
                <Link
                  to="https://x.com/rollingscopes"
                  target="_blank"
                  className="hover:text-chart-3 p-2 transition-colors duration-300 lg:p-1"
                >
                  <TwitterIcon className="h-5 w-5" />
                </Link>
              </li>
              <li>
                <Link
                  to="https://github.com/rolling-scopes-school"
                  target="_blank"
                  className="hover:text-chart-3 p-2 transition-colors duration-300 lg:p-1"
                >
                  <GithubIcon className="h-5 w-5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
