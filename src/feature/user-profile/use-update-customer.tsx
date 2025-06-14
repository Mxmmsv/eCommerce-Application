import { toast } from 'sonner';

import { updateMyCustomer } from '@/feature/user-profile/api/update-my-customer';
import { useCustomerStore } from '@/service/store/use-user-store';

export function useUpdateCustomer() {
  const customer = useCustomerStore((state) => state.customer);
  const setCustomer = useCustomerStore((state) => state.setCustomer);

  const update = async (updates: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
  }) => {
    if (!customer) throw new Error('Customer not available');

    const hasChanges =
      updates.firstName !== customer.firstName ||
      updates.lastName !== customer.lastName ||
      updates.email !== customer.email ||
      updates.dateOfBirth !== customer.dateOfBirth;

    if (!hasChanges) {
      toast.info('You have not entered updated data.');
      throw new Error('No updated data provided');
    }

    if (!customer) throw new Error('Customer not available');

    const updatedCustomer = await updateMyCustomer(customer, updates);
    setCustomer(updatedCustomer);
  };

  return { update };
}
