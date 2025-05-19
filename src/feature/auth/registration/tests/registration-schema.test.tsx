import { parse } from 'valibot';
import { describe, it, expect } from 'vitest';

import { schema } from '../registration-schema';

describe('Registration Schema', () => {
  const validData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com',
    password: 'Password123',
    dateOfBirth: '2001-01-02',
    country: 'RU',
    postalCode: '12345',
    city: 'City',
    streetName: 'Street',
  };

  it('should validate correct data', () => {
    expect(() => parse(schema, validData)).not.toThrow();
  });

  it('should require firstName', () => {
    expect(() => parse(schema, { ...validData, firstName: '' })).toThrow('Field is required');
  });

  it('should require lastName', () => {
    expect(() => parse(schema, { ...validData, lastName: '' })).toThrow('Field is required');
  });

  it('should require email', () => {
    expect(() => parse(schema, { ...validData, email: '' })).toThrow('Field is required');
  });

  it('should validate email format', () => {
    expect(() => parse(schema, { ...validData, email: 'invalid-email' })).toThrow(
      'Please enter a valid email (e.g., user@example.com)',
    );
  });

  it('should validate password format', () => {
    const tests = [
      { password: 'short', error: 'Minimum 8 characters' },
      { password: 'lowercase', error: 'At least 1 uppercase letter' },
      { password: 'UPPERCASE', error: 'At least 1 lowercase letter' },
      { password: 'NoNumbers', error: 'At least 1 number' },
    ];

    tests.forEach(({ password, error }) => {
      expect(() => parse(schema, { ...validData, password })).toThrow(error);
    });
  });

  it('should validate date of birth', () => {
    const tests = [
      { date: '', error: 'Field is required' },
      { date: 'invalid-date', error: 'Invalid date format' },
      { date: '1899-12-31', error: 'Year must be 1900 or later' },
      { date: new Date().toISOString().split('T')[0], error: 'You must be at least 12 years old' },
    ];

    tests.forEach(({ date, error }) => {
      expect(() => parse(schema, { ...validData, dateOfBirth: date })).toThrow(error);
    });
  });

  it('should require country', () => {
    expect(() => parse(schema, { ...validData, country: '' })).toThrow('Please select a country');
  });

  it('should validate postal code by country', () => {
    const tests = [
      { country: 'RU', postalCode: '123', error: 'Postal code does not match country' },
      { country: 'AM', postalCode: '12345', error: 'Postal code does not match country' },
      { country: 'RS', postalCode: '1234', error: 'Postal code does not match country' },
    ];

    tests.forEach(({ country, postalCode, error }) => {
      expect(() => parse(schema, { ...validData, country, postalCode })).toThrow(error);
    });
  });

  it('should validate city format', () => {
    expect(() => parse(schema, { ...validData, city: 'City123' })).toThrow(
      'No numbers or special characters allowed',
    );
  });

  it('should validate postal code format', () => {
    expect(() => parse(schema, { ...validData, postalCode: '' })).toThrow('Field is required');
  });

  it('should work without optional fields', () => {
    const minimalData = {
      ...validData,
      setAsDefaultShipping: undefined,
      alternativeShippingCountry: undefined,
    };
    expect(() => parse(schema, minimalData)).not.toThrow();
  });
});
