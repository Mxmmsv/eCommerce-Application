import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type Props = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
};

export default function CollapsibleSection({ title, icon, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <Collapsible
        className="w-full overflow-hidden rounded-md border"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="bg-muted/5 border-b">
          <CollapsibleTrigger className="hover:bg-muted/10 flex w-full items-center justify-between px-4 py-3 transition-colors">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                  {icon}
                </div>
              )}
              <span className="font-medium">{title}</span>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    </div>
  );
}
