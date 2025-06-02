import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { fetchProductTypes } from '../api/fetch-product-types';

import { DiscountFilter } from './discount-filter';
import { useFilterStore } from './use-filter-store';

export const TypeFilter = () => {
  const { availableTypes, selectedTypes, toggleType, setAvailableTypes } = useFilterStore();

  useEffect(() => {
    void fetchProductTypes().then(setAvailableTypes);
  }, [setAvailableTypes]);

  if (availableTypes.length === 0) return null;

  return (
    <div className="mx-6 mt-8 flex justify-end space-y-2">
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
