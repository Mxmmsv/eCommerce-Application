import { useState } from 'react';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  return (
    <Select defaultValue={selectedLanguage} onValueChange={setSelectedLanguage}>
      <SelectTrigger className="flex w-20 items-center justify-center border-white shadow-none">
        {selectedLanguage.toUpperCase()}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="w-full">
          <SelectItem value="en" className="flex justify-center">
            EN
          </SelectItem>
          <SelectItem value="ru" className="flex justify-center">
            RU
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
