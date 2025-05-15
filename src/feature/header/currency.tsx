import { Euro, RussianRuble } from 'lucide-react';
import { useState } from 'react';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '../../components/ui/select';

export default function Currency() {
  const [selectedCurrency, setSelectedCurrency] = useState('eur');

  return (
    <Select defaultValue={selectedCurrency} onValueChange={setSelectedCurrency}>
      <SelectTrigger className="flex w-20 items-center justify-center border-white shadow-none">
        {selectedCurrency === 'eur' ? <Euro size={20} /> : <RussianRuble size={20} />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="w-full">
          <SelectItem value="eur" className="flex justify-center">
            <Euro color="black" size={20} />
          </SelectItem>
          <SelectItem value="rub" className="flex justify-center">
            <RussianRuble color="black" size={20} />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
