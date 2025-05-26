import { useState } from 'react';

export const useCategoryUI = () => {
  const [openedSubmenus, setOpenedSubmenus] = useState<Record<string, boolean>>({});
  const toggleSubmenu = (id: string) => setOpenedSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));

  return {
    openedSubmenus,
    toggleSubmenu,
  };
};
