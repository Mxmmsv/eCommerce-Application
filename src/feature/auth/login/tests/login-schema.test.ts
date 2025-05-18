import { safeParse } from 'valibot';
import { describe, it, expect } from 'vitest';

import { formSchema } from '@/feature/auth/login/login-schema';

describe('formSchema', () => {
  it('should pass with valid email and password', () => {
    const result = safeParse(formSchema, {
      email: 'user@example.com',
      password: 'Password1',
    });
    expect(result.success).toBe(true);
  });

  describe('email validation', () => {
    it('should fail if email has leading whitespace', () => {
      const result = safeParse(formSchema, {
        email: ' user@example.com',
        password: 'Password1',
      });
      expect(result.success).toBe(false);
      if (result.issues && result.issues.length > 0) {
        expect(result.issues[0].message).toBe('Must not contain leading or trailing whitespace');
      } else {
        throw new Error('Expected validation issues but got none');
      }
    });

    it('should fail if email is invalid', () => {
      const result = safeParse(formSchema, {
        email: 'not-an-email',
        password: 'Password1',
      });
      expect(result.success).toBe(false);
      if (result.issues && result.issues.length > 0) {
        expect(result.issues[0].message).toBe(
          'Please enter a valid email (e.g., user@example.com)',
        );
      } else {
        throw new Error('Expected validation issues but got none');
      }
    });
  });

  describe('password validation', () => {
    it('should fail if password has no uppercase letter', () => {
      const result = safeParse(formSchema, {
        email: 'user@example.com',
        password: 'password1',
      });
      expect(result.success).toBe(false);
      if (result.issues && result.issues.length > 0) {
        expect(result.issues[0].message).toBe('At least 1 uppercase letter');
      } else {
        throw new Error('Expected validation issues but got none');
      }
    });

    it('should fail if password has no lowercase letter', () => {
      const result = safeParse(formSchema, {
        email: 'user@example.com',
        password: 'PASSWORD1',
      });
      expect(result.success).toBe(false);
      if (result.issues && result.issues.length > 0) {
        expect(result.issues[0].message).toBe('At least 1 lowercase letter');
      } else {
        throw new Error('Expected validation issues but got none');
      }
    });

    it('should fail if password has no digit', () => {
      const result = safeParse(formSchema, {
        email: 'user@example.com',
        password: 'Password',
      });
      expect(result.success).toBe(false);
      if (result.issues && result.issues.length > 0) {
        expect(result.issues[0].message).toBe('At least 1 digit');
      } else {
        throw new Error('Expected validation issues but got none');
      }
    });

    it('should fail if password is too short', () => {
      const result = safeParse(formSchema, {
        email: 'user@example.com',
        password: 'Pass1',
      });
      expect(result.success).toBe(false);
      if (result.issues && result.issues.length > 0) {
        expect(result.issues[0].message).toBe('Minimum 8 characters');
      } else {
        throw new Error('Expected validation issues but got none');
      }
    });

    it('should fail if password has leading/trailing spaces', () => {
      const result = safeParse(formSchema, {
        email: 'user@example.com',
        password: ' Password1 ',
      });
      expect(result.success).toBe(false);
      if (result.issues && result.issues.length > 0) {
        expect(result.issues[0].message).toBe('Must not contain leading or trailing whitespace');
      } else {
        throw new Error('Expected validation issues but got none');
      }
    });
  });
});
