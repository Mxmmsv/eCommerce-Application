export const SORT_OPTIONS = [
  { label: 'Price (Low to High)', value: 'price asc' },
  { label: 'Price (High to Low)', value: 'price desc' },
  { label: 'Name (A-Z)', value: 'name.en-GB asc' },
  { label: 'Name (Z-A)', value: 'name.en-GB desc' },
] as const;

export const DEFAULT_SORT = 'none';
