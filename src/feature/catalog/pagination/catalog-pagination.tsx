import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onCurrentPageChange: (page: number) => void;
};

export const PaginationControls = ({
  currentPage,
  totalPages,
  onCurrentPageChange,
}: PaginationControlsProps) => {
  const createPageArray = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      const result: number[] = [];
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
      return result;
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  const pages = createPageArray();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={cn(
              currentPage === 1
                ? 'text-muted-foreground hover:text-muted-foreground dark:hover:text-muted-foreground cursor-default'
                : 'hover:text-chart-3 cursor-pointer',
            )}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onCurrentPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pages.map((page, index) =>
          typeof page === 'string' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem
              key={`page-${page}`}
              className="transform transition-all duration-300 ease-in-out"
            >
              <PaginationLink
                href="#"
                className={cn(
                  'hover:text-chart-3 transition-all duration-300 ease-in-out',
                  currentPage === page
                    ? 'border-chart-3 text-muted-foreground hover:text-muted-foreground dark:hover:text-muted-foreground hover:bg-background cursor-default border'
                    : '',
                )}
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  onCurrentPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            className={cn(
              currentPage === totalPages
                ? 'text-muted-foreground hover:text-muted-foreground dark:hover:text-muted-foreground cursor-default'
                : 'hover:text-chart-3 cursor-pointer',
            )}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onCurrentPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
