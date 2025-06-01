import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { SortOption } from '../types';

import { useSortStore } from './use-sort-store';

export const SortSelect = () => {
  const { sortOption, setSortOption } = useSortStore();

  return (
    <Select
      value={sortOption ?? 'none'}
      onValueChange={(value) => setSortOption(value === 'none' ? null : (value as SortOption))}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Not sorted</SelectItem>
        <SelectItem value="price asc">Price (Low to High)</SelectItem>
        <SelectItem value="price desc">Price (High to Low)</SelectItem>
        <SelectItem value="name.en asc">Name (A-Z)</SelectItem>
      </SelectContent>
    </Select>
  );
};
