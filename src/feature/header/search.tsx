import { Command, CommandInput } from '@/components/ui/command';

export default function SearchBar() {
  return (
    <Command className="flex min-w-40 rounded-lg border shadow-md">
      <CommandInput placeholder="search..." />
    </Command>
  );
}
