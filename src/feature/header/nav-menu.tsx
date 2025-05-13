import { NavLink } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function CustomNavigationMenu() {
  const ulNavMenuStyle = 'flex justify-between items-center gap-5 text-xl';
  const liNavMenuStyle =
    'inline-flex rounded-sm px-6 py-1 font-medium cursor-pointer hover:bg-[#f5f5f5]';

  return (
    <NavigationMenu className={ulNavMenuStyle}>
      <NavigationMenuList>
        <NavigationMenuItem className={liNavMenuStyle}>
          <NavLink to="/" end>
            Home
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="inline-flex cursor-pointer rounded-sm px-0 py-0 font-medium hover:bg-[#f5f5f5]">
          <NavigationMenuTrigger className="items-center text-xl hover:bg-[#f5f5f5]">
            Catalog
          </NavigationMenuTrigger>

          <NavigationMenuContent className="flex">
            <NavLink to="/catalog">All products</NavLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className={liNavMenuStyle}>
          <NavLink to="/about_us">About us</NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
