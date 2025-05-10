import { object, string, minLength, pipe, email, custom, regex } from 'valibot';

export const schema = object({
  firstName: pipe(string(), minLength(2, 'Minimum 2 characters')),
  lastName: pipe(string(), minLength(2, 'Minimum 2 characters')),
  email: pipe(string(''), email('Incorrect email')),
  password: pipe(string(''), minLength(8, 'Minimum 8 characters')),
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
  country: pipe(string(), minLength(1, 'Country is required')),
  city: pipe(
    string(),
    minLength(1, 'City is required'),
    regex(/^[a-zA-Zа-яА-Я\s]+$/, 'City should contain only letters'),
  ),
  street: pipe(string(), minLength(1, 'Street is required')),
});
