import { NavLink } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function CustomNavigationMenu() {
  return (
    <NavigationMenu className="flex items-center justify-between gap-5 text-xl">
      <NavigationMenuList className="flex items-center justify-between">
        <NavigationMenuItem className="hover:bg-secondary flex h-auto cursor-pointer items-center justify-between rounded-sm px-6 py-4 text-xl font-medium">
          <NavLink to="/" end>
            Home
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hover:bg-secondary relative flex h-auto cursor-pointer justify-between self-center rounded-sm font-medium">
          <NavigationMenuTrigger className="hover:bg-secondary h-auto items-center px-6 py-4 text-xl">
            Catalog
          </NavigationMenuTrigger>

          <NavigationMenuContent className="hover:bg-secondary flex cursor-pointer items-center justify-center p-10 hover:rounded-sm">
            <NavLink to="/catalog">
              <span>All&nbsp;products</span>
            </NavLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hover:bg-secondary flex h-auto cursor-pointer justify-between self-center rounded-sm px-6 py-4 text-xl font-medium">
          <NavLink to="/about_us">About us</NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
