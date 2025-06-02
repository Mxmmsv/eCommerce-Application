import { useState } from 'react';

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

import { useFilterStore } from './use-filter-store';

export const PriceRangeFilter = () => {
  const { priceRange, setPriceRange, applyPriceFilter, isPriceFilterActive } = useFilterStore();
  const [tempRange, setTempRange] = useState<[number, number]>(priceRange);

  const handleValueChange = (value: number[]) => {
    if (value.length === 2) {
      setTempRange([value[0], value[1]]);
    }
  };

  const handleValueCommit = (value: number[]) => {
    if (value.length === 2) {
      setPriceRange([value[0], value[1]]);
      applyPriceFilter(true);
    }
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);

  return (
    <div>
      <h3
        className={cn(
          'text-sm font-medium',
          isPriceFilterActive ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        Price range: {formatPrice(tempRange[0])} - {formatPrice(tempRange[1])}
      </h3>
      <div
        className={cn(
          'flex items-center gap-3 rounded-full border px-4 py-2',
          'transition-all duration-200 ease-in-out',
          'shadow-sm hover:shadow-md',
          'border-border/50 hover:border-primary/60',
          isPriceFilterActive
            ? 'bg-background text-primary'
            : 'text-muted-foreground bg-transparent',
          'hover:bg-muted/80 hover:text-primary',
        )}
      >
        <Slider
          min={0}
          max={30}
          step={0.01}
          value={tempRange}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          className={cn('[&_.slider-thumb]:bg-primary', '[&_.slider-range]:bg-primary/50')}
        />
      </div>
    </div>
  );
};
