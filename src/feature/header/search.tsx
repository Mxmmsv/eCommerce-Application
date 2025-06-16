import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';

import { Command, CommandInput } from '@/components/ui/command';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedNavigate = useDebouncedCallback((value: string) => {
    void navigate(`/catalog?search=${value}`);
  }, 500);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    debouncedNavigate(value);
  };

  return (
    <Command className="bg-muted rounded-lg lg:flex">
      <CommandInput
        className="cursor-pointer"
        placeholder="Search products..."
        value={searchQuery}
        onValueChange={handleSearch}
      />
    </Command>
  );
}
