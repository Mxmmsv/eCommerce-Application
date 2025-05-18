import { AddressOptions } from './address-options';
import { CityField } from './city-field';
import { CountryField } from './country-field';
import { PostalCodeField } from './postal-code-field';
import { StreetField } from './street-field';

export function AddressFields() {
  return (
    <>
      <h3 className="mt-6 text-lg font-medium">Address Information</h3>

      <CountryField />
      <PostalCodeField />
      <CityField />
      <StreetField />

      <AddressOptions />
    </>
  );
}
