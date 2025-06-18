import { Settings2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { SortSelectPanel } from '../sorting/sort-select';
import { useSortStore } from '../sorting/use-sort-store';

import { DiscountFilterPanel } from './discount-filter';
import { FilterHeader, ProductTypesFilter } from './product-filter';
import { useFilterStore } from './use-filter-store';

export const MobileFilterButton = () => {
  const [open, setOpen] = useState(false);
  const { resetAllFilters } = useFilterStore();
  const { setSortOption } = useSortStore();

  const handleReset = () => {
    resetAllFilters();
    setSortOption(undefined);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="mx-5 shrink-0 rounded-xl p-5 lg:hidden">
          <Settings2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] p-4"
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest('[data-no-close]')) {
            setOpen(false);
          }
        }}
      >
        <SheetTitle className="sr-only">Filters Panel</SheetTitle>
        <SheetDescription className="sr-only">
          Panel for filtering and sorting products
        </SheetDescription>
        <div className="data-no-close my-10 flex flex-col">
          <FilterHeader onClose={() => setOpen(false)} />

          <div className="flex-1 space-y-6" data-no-close>
            <SortSelectPanel />
            <ProductTypesFilter />
            <DiscountFilterPanel />
          </div>

          <div className="mt-8 flex justify-end pt-4" data-no-close>
            <Button variant="outline" className="rounded-full" onClick={handleReset}>
              Reset filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
