import { Images } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { Link } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCategoryStore } from '@/service/store/use-category-store';

import { useCategoryNavigation } from './use-category-navigation';

export const Breadcrumbs = () => {
  const { currentPath } = useCategoryStore();
  const { handleAllCategoriesClick } = useCategoryNavigation();

  if (currentPath.length === 0) return null;

  return (
    <Breadcrumb className="bg-muted rounded-lg px-4 py-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/catalog"
              onClick={handleAllCategoriesClick}
              className="hover:text-primary flex items-center gap-1"
            >
              <Images className="h-4 w-4" />
              <span>All Categories</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {currentPath.map((item, index) => (
          <Fragment key={item.id}>
            <BreadcrumbSeparator />
            <BreadcrumbItem key={item.id}>
              {index === currentPath.length - 1 ? (
                <BreadcrumbPage className="text-primary font-medium">{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    to={`/category/${item.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
