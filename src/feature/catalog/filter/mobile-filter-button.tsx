import { Settings2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { SortSelect } from '../sorting/sort-select';

import { DiscountFilter } from './discount-filter';
import { ResetFiltersButton } from './reset-filter';
import { useFilterStore } from './use-filter-store';

export const MobileFilterButton = () => {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const { availableTypes, selectedTypes, toggleType } = useFilterStore();

  const handleClickOutside = (event: MouseEvent) => {
    if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0">
          <Settings2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        ref={sheetRef}
        side="right"
        className="w-[300px] p-4"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">Filters</h3>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-6">
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

            <DiscountFilter />
          </div>

          <div className="mt-auto pt-4">
            <ResetFiltersButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
