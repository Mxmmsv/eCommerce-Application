import { Spinner } from '@/components/ui/spiner';

import { CategoryDropdown } from './category-dropdown';
import { useCategoryManagement } from './use-category-management';
import { useCategoryNavigation } from './use-category-navigation';
import { useCategoryUI } from './use-category-ui';

export const CategoryNavigation = () => {
  const { handleCategoryClick } = useCategoryNavigation();
  const { categories, categoryTree, error, isLoading } = useCategoryManagement();
  const { openedSubmenus, toggleSubmenu } = useCategoryUI();

  if (isLoading) return <Spinner className="mx-auto" />;
  if (error) return <div>Error loading categories</div>;
  if (!categories) return null;

  return (
    <CategoryDropdown
      categoryTree={categoryTree}
      onSelect={handleCategoryClick}
      openedSubmenus={openedSubmenus}
      toggleSubmenu={toggleSubmenu}
    />
  );
};
