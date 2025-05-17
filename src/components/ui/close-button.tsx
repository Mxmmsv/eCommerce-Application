import { X } from 'lucide-react';
import { useNavigate } from 'react-router';

import { cn } from '@/lib/utils';

type CloseButtonProps = {
  className?: string;
};

export function CloseButton({ className }: CloseButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'bg-background absolute top-2 right-2 rounded-full p-1 shadow-sm transition-colors hover:bg-gray-100',
        className,
      )}
      aria-label="Close"
    >
      <X />
    </button>
  );
}
