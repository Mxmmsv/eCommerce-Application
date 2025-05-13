import { useState } from 'react';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '../../components/ui/select';

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  return (
    <Select defaultValue={selectedLanguage} onValueChange={setSelectedLanguage}>
      <SelectTrigger className="ont-rubik w-20 border-white text-sm font-normal tracking-wider shadow-none">
        {selectedLanguage.toUpperCase()}
      </SelectTrigger>
      <SelectContent className="w-20">
        <SelectGroup>
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="rus">RUS</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
