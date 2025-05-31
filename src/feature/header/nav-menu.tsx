import { NavLink, useLocation } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export function CustomNavigationMenu() {
  const location = useLocation();
  const path = location.pathname;
  const isCatalogActive = path === '/catalog';
  const isCategoryActive = /^\/catalog\/category\/[^/]+$/.test(path);
  return (
    <NavigationMenu className="items-center justify-between gap-5 text-xl max-lg:hidden lg:flex">
      <NavigationMenuList className="flex items-center justify-between">
        <NavigationMenuItem className="hover:text-chart-3 flex h-auto items-center justify-between rounded-sm text-xl font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `before:text-chart-3 relative px-6 py-4 transition-all duration-300 ease-in-out before:absolute before:right-0 before:bottom-2 before:left-0 before:mx-auto before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 before:content-[''] hover:before:w-[calc(100%-3rem)] ${isActive ? 'text-chart-3 cursor-default before:w-[calc(100%-3rem)]' : ''}`
            }
          >
            Home
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hover:text-chart-3 flex h-auto items-center justify-between rounded-sm text-xl font-medium">
          <NavLink
            to="/catalog"
            className={cn(
              "before:text-chart-3 relative px-6 py-4 transition-all duration-300 ease-in-out before:absolute before:right-0 before:bottom-2 before:left-0 before:mx-auto before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 before:content-[''] hover:before:w-[calc(100%-3rem)]",
              isCatalogActive && 'text-chart-3 cursor-default before:w-[calc(100%-3rem)]',
              isCategoryActive && 'text-chart-3 before:w-[calc(100%-3rem)]',
            )}
          >
            Catalog
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hover:text-chart-3 flex h-auto justify-between self-center rounded-sm text-xl font-medium">
          <NavLink
            to="/about_us"
            className={({ isActive }) =>
              `before:text-chart-3 relative px-6 py-4 transition-all duration-300 ease-in-out before:absolute before:right-0 before:bottom-2 before:left-0 before:mx-auto before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 before:content-[''] hover:before:w-[calc(100%-3rem)] ${isActive ? 'text-chart-3 cursor-default before:w-[calc(100%-3rem)]' : ''}`
            }
          >
            About us
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
