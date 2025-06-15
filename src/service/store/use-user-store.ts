import type { Customer } from '@commercetools/platform-sdk';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CustomerStore = {
  customer: Customer | null;
  setCustomer: (data: Customer) => void;
  clearCustomer: () => void;
};

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set) => ({
      customer: null,
      setCustomer: (data) => set({ customer: data }),
      clearCustomer: () => set({ customer: null }),
    }),
    {
      name: 'CUSTOMER-STORAGE',
    },
  ),
);
