import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { useCategoryStore } from '@/service/store/use-category-store';

export const Breadcrumbs = () => {
  const { currentPath } = useCategoryStore();

  if (currentPath.length === 0) return null;

  return (
    <Breadcrumb>
      {currentPath.map((item, index) => (
        <BreadcrumbItem key={item.id}>
          {index === currentPath.length - 1 ? (
            <span className="text-foreground font-medium">{item.name}</span>
          ) : (
            <BreadcrumbLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="hover:text-primary"
            >
              {item.name}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
