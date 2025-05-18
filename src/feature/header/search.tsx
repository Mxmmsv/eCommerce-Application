import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export default function SearchBar() {
  return (
    <div className="flex max-w-3xs min-w-16 items-center gap-2 border-b bg-white p-2">
      <Search size={32} />
      <Input
        type="text"
        placeholder="Search"
        className="font-rubik border-white text-base font-normal tracking-wider shadow-none sm:text-lg md:text-xl"
      />
    </div>
  );
}
