import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { SortStoreActions } from '../sorting/use-sort-store';
import { useSortStore } from '../sorting/use-sort-store';

import { useFilterStore } from './use-filter-store';

export const ResetFiltersButton = () => {
  const { resetAllFilters } = useFilterStore();
  const { setSortOption }: SortStoreActions = useSortStore();

  const handleReset = () => {
    resetAllFilters();
    setSortOption(undefined);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleReset}
      className={cn(
        'mb-4 rounded-full px-4',
        'text-muted-foreground bg-transparent shadow-sm',
        'transition-all duration-200 ease-in-out',
        'hover:bg-muted/80 hover:text-primary hover:shadow-md',
        'border-border/50 hover:border-primary/60 border',
      )}
    >
      <RefreshCw className="h-4 w-4" />
      Reset
    </Button>
  );
};
