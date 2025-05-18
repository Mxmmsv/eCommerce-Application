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
    country: 'Country',
    postalCode: '12345',
    city: 'City',
    streetName: 'Street',
  };

  it('should validate correct data', () => {
    expect(() => parse(schema, validData)).not.toThrow();
  });

  it('should require firstName', () => {
    expect(() => parse(schema, { ...validData, firstName: '' })).toThrow('First name is required');
  });

  it('should require lastName', () => {
    expect(() => parse(schema, { ...validData, lastName: '' })).toThrow('Last name is required');
  });

  it('should require email', () => {
    expect(() => parse(schema, { ...validData, email: '' })).toThrow('Email is required');
  });

  it('should validate email format', () => {
    expect(() => parse(schema, { ...validData, email: 'invalid-email' })).toThrow(
      'Please enter a valid email (e.g., user@example.com)',
    );
  });

  it('should validate password length', () => {
    expect(() => parse(schema, { ...validData, password: 'short' })).toThrow(
      'Minimum 8 characters',
    );
  });

  it('should require country', () => {
    expect(() => parse(schema, { ...validData, country: '' })).toThrow('Country is required');
  });

  it('should validate city format', () => {
    expect(() => parse(schema, { ...validData, city: 'City123' })).toThrow(
      'City should contain only letters',
    );
  });

  it('should validate postal code format', () => {
    expect(() => parse(schema, { ...validData, postalCode: '!@#$%' })).toThrow(
      'Invalid postal code format',
    );
  });
});
