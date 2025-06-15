import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/ui/theme-provider';
import { Toggle } from '@/components/ui/toggle';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Toggle
      onClick={toggleTheme}
      className="group hover:text-chart-3 relative h-max w-full has-[>svg]:px-3 has-[>svg]:py-3 lg:p-3 dark:hover:bg-transparent"
      aria-label="toggle-button"
    >
      <Sun
        strokeWidth={1.5}
        className="group-hover:text-chart-3 scale-100 rotate-0 transition-all sm:size-8 dark:scale-0 dark:-rotate-90 [&_svg:not([class*='size-'])]:size-6"
      />
      <Moon
        strokeWidth={1.5}
        className="group-hover:text-chart-3 absolute scale-0 rotate-90 transition-all sm:size-8 dark:scale-100 dark:rotate-0 [&_svg:not([class*='size-'])]:size-6"
      />
    </Toggle>
  );
}
