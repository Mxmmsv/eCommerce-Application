import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useFilterStore } from './use-filter-store';

export const DiscountFilter = () => {
  const { onlyDiscounted, toggleDiscounted } = useFilterStore();

  return (
    <div className="mt-4 flex items-center space-x-2">
      <Switch id="discount-filter" checked={onlyDiscounted} onCheckedChange={toggleDiscounted} />
      <Label htmlFor="discount-filter">Discount</Label>
    </div>
  );
};
