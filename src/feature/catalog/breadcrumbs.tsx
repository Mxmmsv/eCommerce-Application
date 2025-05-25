import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { useCategoryStore } from '@/service/store/use-category-store';

export const Breadcrumbs = () => {
  const { currentPath } = useCategoryStore();

  return (
    <Breadcrumb>
      {currentPath.map((item) => (
        <BreadcrumbItem key={item.id}>
          <BreadcrumbLink>{item.name}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
