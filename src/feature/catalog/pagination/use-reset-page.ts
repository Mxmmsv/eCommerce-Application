import { useEffect } from 'react';
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

  useEffect(() => {
    const page = searchParams.get('page');
    if (page !== '1') {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', '1');
      setSearchParams(newParams);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [
    selectedTypes,
    onlyDiscounted,
    priceRange,
    sortOption,
    lastCategoryId,
    searchParams,
    setSearchParams,
  ]);
}
