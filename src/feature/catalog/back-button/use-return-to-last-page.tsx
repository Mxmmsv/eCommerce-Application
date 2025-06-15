import { useEffect } from 'react';

export function useReturnToLastPage(
  currentPage: number,
  onCurrentPageChange: (page: number) => void,
) {
  useEffect(() => {
    const savedPage = sessionStorage.getItem('lastPage');
    if (savedPage) {
      const pageNumber = Number(savedPage);
      if (!isNaN(pageNumber) && pageNumber !== currentPage) {
        onCurrentPageChange(pageNumber);
      }
      sessionStorage.removeItem('lastPage');
    }
  }, [currentPage, onCurrentPageChange]);
}
