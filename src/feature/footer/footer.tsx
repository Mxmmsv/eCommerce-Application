import { DribbbleIcon, GithubIcon, TwitchIcon, TwitterIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Separator } from '@/components/ui/separator';

import { CustomNavigationMenu } from '../header/nav-menu';

const Footer = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-muted grow" />
      <footer>
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col items-center justify-start py-12">
            <CustomNavigationMenu />
          </div>
          <Separator />
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{' '}
              <Link to="/" target="_blank">
                Poster Store
              </Link>
              . All rights reserved.
            </span>

            <div className="text-muted-foreground flex items-center gap-5">
              <Link to="#" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link to="#" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link to="#" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link to="#" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
