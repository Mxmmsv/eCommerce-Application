import { Settings2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { SortSelectPanel } from '../sorting/sort-select';

import { DiscountFilterPanel } from './discount-filter';
import { FilterHeader, ProductTypesFilter } from './product-filter';
import { useFilterStore } from './use-filter-store';

export const MobileFilterButton = () => {
  const [open, setOpen] = useState(false);
  const { resetAllFilters } = useFilterStore();

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
          if (!target.closest('[data-prevent-close]')) {
            e.preventDefault();
          }
        }}
      >
        <div className="my-10 flex flex-col">
          <FilterHeader onClose={() => setOpen(false)} />

          <div className="flex-1 space-y-6" data-prevent-close>
            <SortSelectPanel />
            <ProductTypesFilter />
            <DiscountFilterPanel />
          </div>

          <div className="mt-8 flex justify-end pt-4" data-prevent-close>
            <Button variant="outline" className="rounded-full" onClick={() => resetAllFilters()}>
              Reset filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
