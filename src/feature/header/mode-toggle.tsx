import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/ui/theme-provider';
import { Toggle } from '@/components/ui/toggle';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Toggle onClick={toggleTheme} aria-label="toggle-button">
      <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 [&_svg:not([class*='size-'])]:size-6" />
      <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 [&_svg:not([class*='size-'])]:size-6" />
    </Toggle>
  );
}
