import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { DEFAULT_SORT, SORT_OPTIONS } from './sort-options';
import { useSortStore } from './use-sort-store';

export const SortSelect = () => {
  const { sortOption, setSortOption } = useSortStore();

  return (
    <>
      <Select
        value={sortOption || DEFAULT_SORT}
        onValueChange={(value) => setSortOption(value === DEFAULT_SORT ? undefined : value)}
      >
        <SelectTrigger
          className={cn(
            'hover:text-primary w-[200px] rounded-full pl-4',
            sortOption ? 'bg-background' : 'bg-transparent',
            sortOption ? 'text-primary font-medium' : 'text-muted-foreground',
            'transition-all duration-200 ease-in-out',
            'hover:bg-muted/80 shadow-sm hover:shadow-md',
            'border-border/50 hover:border-primary/60',
            '[&:hover_svg]:text-primary [&_svg]:transition-colors [&_svg]:duration-200',
          )}
        >
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={DEFAULT_SORT}>Not sorted</SelectItem>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
