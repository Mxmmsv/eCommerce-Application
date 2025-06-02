import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Command, CommandInput } from '@/components/ui/command';
import { useCategoryStore } from '@/service/store/use-category-store';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { currentPath } = useCategoryStore();
  const lastCategoryId = currentPath[currentPath.length - 1]?.id;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams();
    if (value) params.set('search', value);
    if (lastCategoryId) params.set('category', lastCategoryId);

    void navigate(`/catalog?${params}`);
  };

  return (
    <Command className="rounded-lg border shadow-md lg:flex">
      <CommandInput
        className="cursor-pointer outline-none"
        placeholder="Search products..."
        value={searchQuery}
        onValueChange={handleSearch}
      />
    </Command>
  );
}
