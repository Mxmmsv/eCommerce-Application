import type { Poster, SortOption } from '../types';

export const sortPosters = (posters: Poster[], sortOption: SortOption): Poster[] => {
  if (!posters || !sortOption) return posters || [];

  const sorted = [...posters];

  switch (sortOption) {
    case 'price asc':
      return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case 'price desc':
      return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    case 'name asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return posters;
  }
};
