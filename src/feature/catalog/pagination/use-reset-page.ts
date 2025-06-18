import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';

type UseResetPageDeps = {
  selectedTypes: string[];
  onlyDiscounted: boolean;
  priceRange: [number, number];
  sortOption?: string;
  lastCategoryId: string;
};

export function useResetPage({
  selectedTypes,
  onlyDiscounted,
  priceRange,
  sortOption,
  lastCategoryId,
}: UseResetPageDeps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const previousFilterValues = useRef('');
  const currentFilterValues = JSON.stringify({
    selectedTypes,
    onlyDiscounted,
    priceRange,
    sortOption,
    lastCategoryId,
  });

  useEffect(() => {
    const currentPage = searchParams.get('page');

    if (currentFilterValues !== previousFilterValues.current) {
      previousFilterValues.current = currentFilterValues;

      if (currentPage !== '1') {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', '1');
        setSearchParams(newParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentFilterValues, searchParams, setSearchParams]);
}
