import { Trash2, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type RemoveButtonProps = {
  onRemove: () => Promise<void>;
  isRemoving: boolean;
};

export function RemoveItemButton({ onRemove, isRemoving }: RemoveButtonProps) {
  const handleClick = () => {
    void onRemove();
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isRemoving}
      aria-label="Remove item"
    >
      {isRemoving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}
