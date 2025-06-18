import { Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { DiscountFilter } from './filter/discount-filter';
import { ResetFiltersButton } from './filter/reset-filter';
import { SortSelect } from './sorting/sort-select';

export const FilterButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0">
          <Settings2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px]" aria-describedby="filter-panel-description">
        <SheetTitle className="sr-only">Filters & Sort</SheetTitle>
        <div className="space-y-6 pt-6">
          <h3 className="text-lg font-bold">Filters & Sort</h3>
          <SortSelect />
          <DiscountFilter />
          <ResetFiltersButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};
