import { cn } from '@/lib/utils';

import type { SeparatorWaveProp } from './types';

function SeparatorWave({ className }: SeparatorWaveProp) {
  return (
    <div
      className={cn(
        "w-ful h-3 overflow-hidden bg-[url('/separator-wave.svg')] bg-[length:40px_10px] bg-center bg-repeat-x pt-12 opacity-100",
        className,
      )}
    />
  );
}

export default SeparatorWave;
