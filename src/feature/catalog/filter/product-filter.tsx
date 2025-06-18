import { X } from 'lucide-react';
import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { useFilterStore } from './use-filter-store';

export const FilterHeader = memo(function FilterHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-bold">Filters</h3>
      <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
});
FilterHeader.displayName = 'FilterHeader';

export const ProductTypesFilter = memo(function ProductTypesFilter() {
  const { availableTypes, selectedTypes, toggleType } = useFilterStore();

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Product Types</h4>
      <div className="grid gap-2">
        {availableTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-2" data-prevent-close>
            <Checkbox
              id={`type-${type.id}`}
              checked={selectedTypes.includes(type.id)}
              onCheckedChange={() => toggleType(type.id)}
            />
            <label htmlFor={`type-${type.id}`} className="text-sm">
              {type.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
});
