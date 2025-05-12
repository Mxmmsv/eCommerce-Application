import { object, string, minLength, email, custom, regex, pipe } from 'valibot';

const noEdgeWhitespace = custom<string, string>(
  (input) => typeof input === 'string' && input.trim() === input,
  'Must not contain leading or trailing whitespace',
);

const hasUppercase = regex(/[A-Z]/, 'Must contain at least one uppercase letter');
const hasLowercase = regex(/[a-z]/, 'Must contain at least one lowercase letter');
const hasDigit = regex(/[0-9]/, 'Must contain at least one digit');
const hasSpecialChar = regex(/[!@#$%^&*]/, 'Must contain at least one special character');

export const formSchema = object({
  email: pipe(string(), noEdgeWhitespace, email('Please enter a valid email address')),
  password: pipe(
    string(),
    noEdgeWhitespace,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSpecialChar,
    minLength(8, 'Password must be at least 8 characters long'),
  ),
});
