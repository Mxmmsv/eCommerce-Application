import { Command, CommandInput } from '@/components/ui/command';

export default function SearchBar() {
  return (
    <Command className="flex min-w-40 rounded-lg border">
      <CommandInput placeholder="search..." />
    </Command>
  );
}
