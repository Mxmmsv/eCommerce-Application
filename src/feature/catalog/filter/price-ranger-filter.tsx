import { useEffect, useState } from 'react';

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

import { useFilterStore } from './use-filter-store';

export const PriceRangeFilter = () => {
  const { priceRange, defaultPriceRange, setPriceRange, isPriceFilterActive, applyPriceFilter } =
    useFilterStore();
  const [localRange, setLocalRange] = useState<PriceRange>(priceRange);

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

  const handleChange = (value: number[]): void => {
    if (value.length === 2) {
      setLocalRange([value[0], value[1]]);
    }
  };

  const handleCommit = (value: number[]): void => {
    if (value.length === 2) {
      setPriceRange([value[0], value[1]]);
      applyPriceFilter(true);
    }
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  type PriceRange = [number, number];

  return (
    <div>
      <h3
        className={cn(
          'text-sm font-medium',
          isPriceFilterActive ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        Price range: {formatPrice(localRange[0])} - {formatPrice(localRange[1])}
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
          min={defaultPriceRange[0]}
          max={defaultPriceRange[1]}
          value={localRange}
          onValueChange={handleChange}
          onValueCommit={handleCommit}
          className={cn('[&_.slider-thumb]:bg-primary', '[&_.slider-range]:bg-primary/50')}
        />
      </div>
    </div>
  );
};
