import { object, string, minLength, email, custom, regex, pipe } from 'valibot';

const noEdgeWhitespace = custom<string, string>(
  (input) => typeof input === 'string' && input.trim() === input,
  'Must not contain leading or trailing whitespace',
);

const hasUppercase = regex(/[A-Z]/, 'At least 1 uppercase letter');
const hasLowercase = regex(/[a-z]/, 'At least 1 lowercase letter');
const hasDigit = regex(/[0-9]/, 'At least 1 number');
const hasSpecialChar = regex(/[!@#$%^&*]/, 'At least 1 special character');

export const formSchema = object({
  email: pipe(
    string(),
    noEdgeWhitespace,
    email('Please enter a valid email (e.g., user@example.com)'),
  ),
  password: pipe(
    string(),
    noEdgeWhitespace,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSpecialChar,
    minLength(8, 'Minimum 8 characters'),
  ),
});
