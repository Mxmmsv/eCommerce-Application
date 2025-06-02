import { useEffect, useState } from 'react';

import { Slider } from '@/components/ui/slider';

import { useFilterStore } from './use-filter-store';

export const PriceRangeFilter = () => {
  const { priceRange, availablePriceRange, setPriceRange, applyPriceFilter } = useFilterStore();
  const [tempRange, setTempRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    setTempRange(priceRange);
  }, [priceRange]);

  const handleSliderChange = (value: number[]) => {
    if (value.length === 2) {
      setTempRange([value[0], value[1]]);
    }
  };

  const handleSliderCommit = (value: number[]) => {
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
    <div className="space-y-4 p-4">
      <h3 className="text-sm font-medium">
        Price range: {formatPrice(tempRange[0])} - {formatPrice(tempRange[1])}
      </h3>
      <Slider
        min={availablePriceRange[0]}
        max={availablePriceRange[1]}
        step={1}
        value={tempRange}
        onValueChange={handleSliderChange}
        onValueCommit={handleSliderCommit}
        // className="w-full"
      />
    </div>
  );
};
