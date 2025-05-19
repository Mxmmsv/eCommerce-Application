import {
  object,
  string,
  minLength,
  pipe,
  custom,
  regex,
  email,
  boolean,
  optional,
  forward,
  partialCheck,
} from 'valibot';

const nameValidator = pipe(
  string(),
  minLength(1, 'Field is required'),
  regex(/^[\p{Letter}\s\-']{2,}$/u, 'No numbers or special characters allowed'),
);

const requiredValidator = pipe(string(), minLength(1, 'Field is required'));

const postalCodePatterns: Record<string, RegExp> = {
  RU: /^\d{6}$/,
  BY: /^\d{6}$/,
  KZ: /^\d{6}$/,
  AM: /^\d{4}$/,
  UZ: /^\d{6}$/,
  RS: /^\d{5}$/,
};

export const schema = pipe(
  object({
    firstName: nameValidator,
    lastName: nameValidator,
    email: pipe(requiredValidator, email('Please enter a valid email (e.g., user@example.com)')),
    password: pipe(
      string(),
      minLength(8, 'Minimum 8 characters'),
      regex(/[A-Z]/, 'At least 1 uppercase letter'),
      regex(/[a-z]/, 'At least 1 lowercase letter'),
      regex(/[0-9]/, 'At least 1 number'),
    ),
    dateOfBirth: pipe(
      requiredValidator,
      custom((value) => {
        if (typeof value !== 'string') return false;
        const date = new Date(value);
        return !isNaN(date.getTime());
      }, 'Invalid date format'),

      custom((value) => {
        if (typeof value !== 'string') return false;
        const year = new Date(value).getFullYear();
        return year >= 1900;
      }, 'Year must be 1900 or later'),

      custom((value) => {
        if (typeof value !== 'string') return false;
        const birthDate = new Date(value);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 12);
        return birthDate <= minDate;
      }, 'You must be at least 12 years old'),
    ),
    country: pipe(string(), minLength(1, 'Please select a country')),
    postalCode: pipe(requiredValidator),
    city: nameValidator,
    streetName: nameValidator,
    setAsDefaultShipping: optional(boolean()),
    setAsDefaultBilling: optional(boolean()),
    alternativeShippingCountry: optional(requiredValidator),
    alternativeShippingPostalCode: optional(requiredValidator),
    alternativeShippingCity: optional(requiredValidator),
    alternativeShippingStreet: optional(requiredValidator),
    alternativeBillingCountry: optional(requiredValidator),
    alternativeBillingPostalCode: optional(requiredValidator),
    alternativeBillingCity: optional(requiredValidator),
    alternativeBillingStreet: optional(requiredValidator),
  }),
  forward(
    partialCheck(
      [['country'], ['postalCode']],
      (input) => {
        const { country, postalCode } = input;

        const postalPattern = postalCodePatterns[country];

        console.log(postalPattern);
        return postalPattern.test(postalCode);
      },
      'Postal code does not match country',
    ),
    ['postalCode'],
  ),
);
