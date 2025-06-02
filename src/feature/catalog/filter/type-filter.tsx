import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useSortStore } from '../sorting/use-sort-store';

import { DiscountFilter } from './discount-filter';
import { ResetFiltersButton } from './reset-filter';
import { useFilterStore } from './use-filter-store';

export const TypeFilter = () => {
  const { availableTypes, selectedTypes, toggleType, onlyDiscounted } = useFilterStore();
  const { sortOption } = useSortStore();

  const hasActiveFilters = selectedTypes.length > 0 || onlyDiscounted || sortOption;

  return (
    <div className="mx-6 mt-8 flex justify-end gap-2 space-y-2">
      {hasActiveFilters && <ResetFiltersButton />}
      <div className="flex flex-wrap gap-2">
        {availableTypes.map((type) => (
          <Button
            key={type.id}
            size="sm"
            variant="ghost"
            className={cn(
              'rounded-full px-4',
              selectedTypes.includes(type.id)
                ? 'bg-background text-primary font-medium shadow-sm'
                : 'text-muted-foreground bg-transparent shadow-sm',
              'transition-all duration-200 ease-in-out',
              'hover:bg-muted/80 hover:text-primary hover:shadow-md',
              'border-border/50 hover:border-primary/60 border',
              '[&:hover_svg]:text-primary',
            )}
            onClick={() => toggleType(type.id)}
          >
            {type.name}
          </Button>
        ))}
        <div className="flex items-center justify-center">
          <DiscountFilter />
        </div>
      </div>
    </div>
  );
};
