import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Command, CommandInput } from '@/components/ui/command';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    void navigate(`/catalog?search=${value}`);
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
