import { Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { SortSelect } from '../sorting/sort-select';

import { DiscountFilter } from './discount-filter';
import { ResetFiltersButton } from './reset-filter';
import { useFilterStore } from './use-filter-store';

export const MobileFilterButton = () => {
  const { availableTypes, selectedTypes, toggleType } = useFilterStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn('md:hidden', 'shrink-0 rounded-full')}
          aria-label="Open filters"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] p-4">
        <div className="h-full space-y-6">
          <h3 className="pt-2 text-lg font-bold">Filters</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Sort by</h4>
              <SortSelect />
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Product Types</h4>
              <div className="grid gap-2">
                {availableTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type.id}`}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={() => toggleType(type.id)}
                    />
                    <label htmlFor={`type-${type.id}`} className="text-sm leading-none font-medium">
                      {type.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Discount</h4>
              <DiscountFilter />
            </div>
          </div>

          <div className="absolute right-4 bottom-4 left-4">
            <ResetFiltersButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
