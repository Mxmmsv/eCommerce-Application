import { DribbbleIcon, GithubIcon, TwitterIcon } from 'lucide-react';
import { Link } from 'react-router';

function Footer() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-muted grow" />
      <footer>
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{' '}
              <Link to="/" className="hover:text-chart-3 transition-colors duration-300">
                Poster Store
              </Link>
              . All rights reserved.
            </span>

            <div className="flex flex-col items-center justify-center">
              <span className="text-muted-foreground">Rolling Scopes School</span>
              <ul className="text-muted-foreground flex items-center gap-5">
                <li>
                  <Link
                    to="https://rs.school"
                    target="_blank"
                    className="hover:text-chart-3 p-3 transition-colors duration-300 lg:p-2"
                  >
                    <DribbbleIcon className="h-5 w-5" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://x.com/rollingscopes"
                    target="_blank"
                    className="hover:text-chart-3 p-3 transition-colors duration-300 lg:p-2"
                  >
                    <TwitterIcon className="h-5 w-5" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://github.com/rolling-scopes-school"
                    target="_blank"
                    className="hover:text-chart-3 p-3 transition-colors duration-300 lg:p-2"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
