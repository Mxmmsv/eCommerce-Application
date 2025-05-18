export type RegistrationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  country: string;
  postalCode: string;
  city: string;
  streetName: string;
  setAsDefaultShipping: boolean;
  setAsDefaultBilling: boolean;
  alternativeShippingAddress?: {
    country: string;
    postalCode: string;
    city: string;
    streetName: string;
  };
  alternativeBillingAddress?: {
    country: string;
    postalCode: string;
    city: string;
    streetName: string;
  };
};
