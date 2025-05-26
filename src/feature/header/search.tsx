import { Command, CommandInput } from '@/components/ui/command';

export default function SearchBar() {
  return (
    <Command className="rounded-lg border shadow-md lg:flex">
      <CommandInput className="outline-none" placeholder="search..." />
    </Command>
  );
}
