import { Command, CommandInput } from '@/components/ui/command';

export default function SearchBar() {
  return (
    <Command className="flex rounded-lg border shadow-md">
      <CommandInput className="outline-none" placeholder="search..." />
    </Command>
  );
}
