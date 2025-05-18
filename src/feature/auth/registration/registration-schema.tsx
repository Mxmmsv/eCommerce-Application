import { object, string, minLength, pipe, custom, regex, email } from 'valibot';

const nameValidator = pipe(
  string(),
  minLength(1, 'Field is required'),
  regex(/^[\p{Letter}\s\-']{2,}$/u, 'No numbers or special characters allowed'),
);

export const schema = object({
  firstName: nameValidator,
  lastName: nameValidator,
  email: pipe(
    string(),
    minLength(1, 'Email is required'),
    email('Please enter a valid email (e.g., user@example.com)'),
  ),
  password: pipe(
    string(),
    minLength(8, 'Minimum 8 characters'),
    regex(/[A-Z]/, 'At least 1 uppercase letter'),
    regex(/[a-z]/, 'At least 1 lowercase letter'),
    regex(/[0-9]/, 'At least 1 number'),
  ),
  dateOfBirth: pipe(
    string(),
    minLength(1, 'Date is required'),
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
  postalCode: pipe(string(), minLength(1, 'Postal code is required')),
  city: nameValidator,
  streetName: nameValidator,
});
