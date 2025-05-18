import type { ComponentProps } from 'react';

import { Toggle as ShadToggle } from '@/components/ui/toggle';

export function Toggle(props: ComponentProps<typeof ShadToggle>) {
  return <ShadToggle {...props} />;
}
