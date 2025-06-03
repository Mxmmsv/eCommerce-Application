import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

import { useFilterStore } from './use-filter-store';

export const DiscountFilter = () => {
  const { onlyDiscounted, toggleDiscounted } = useFilterStore();

  return (
    <div
      className={cn(
        'flex items-center space-x-2',
        'transition-all duration-200 ease-in-out',
        onlyDiscounted ? 'text-primary font-medium' : 'text-muted-foreground bg-transparent',
      )}
    >
      <Label
        htmlFor="discount-filter"
        className={cn('cursor-pointer', onlyDiscounted ? 'text-primary' : 'text-muted-foreground')}
      >
        Discount
      </Label>
      <Switch
        id="discount-filter"
        checked={onlyDiscounted}
        onCheckedChange={toggleDiscounted}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
};
