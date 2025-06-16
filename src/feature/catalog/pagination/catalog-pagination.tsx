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

import { createPageArray } from './pagination-utils';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  const pages = createPageArray(currentPage, totalPages);

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
              if (currentPage > 1) onPageChange(currentPage - 1);
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
                  onPageChange(page);
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
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
