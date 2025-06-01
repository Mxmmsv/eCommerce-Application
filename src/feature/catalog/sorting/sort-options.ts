export const SORT_OPTIONS = [
  { label: 'Not sorted', value: 'none' },
  { label: 'Price (Low to High)', value: 'variants.price.centAmount asc' },
  { label: 'Price (High to Low)', value: 'variants.price.centAmount desc' },
  { label: 'Name (A-Z)', value: 'name.en asc' },
  { label: 'Name (Z-A)', value: 'name.en desc' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];
