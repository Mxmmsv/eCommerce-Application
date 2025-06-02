import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { fetchProductTypes } from '../api/fetch-product-types';

import { useFilterStore } from './use-filter-store';

export const TypeFilter = () => {
  const { availableTypes, selectedTypes, toggleType, setAvailableTypes } = useFilterStore();

  useEffect(() => {
    void fetchProductTypes().then(setAvailableTypes);
  }, [setAvailableTypes]);

  if (availableTypes.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Тип товара</h3>
      <div className="flex flex-wrap gap-2">
        {availableTypes.map((type) => (
          <Button
            key={type.id}
            size="sm"
            variant={selectedTypes.includes(type.id) ? 'default' : 'outline'}
            onClick={() => toggleType(type.id)}
          >
            {type.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
