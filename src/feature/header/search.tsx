import { Command, CommandInput } from '@/components/ui/command';

export default function SearchBar() {
  return (
    <Command className="flex max-w-70">
      <CommandInput placeholder="search..." />
    </Command>
  );
}
