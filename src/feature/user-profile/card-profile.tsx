import type {
  MyCustomerChangeEmailAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { SquarePen } from 'lucide-react';
import { useRef, useState } from 'react';
import { mutate } from 'swr';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createApiClientWithToken } from '@/feature/api/api-client-token-flow';
import { useCustomerStore } from '@/service/store/use-user-store';

export default function ProfileCard() {
  const customer = useCustomerStore((state) => state.customer);
  const setCustomer = useCustomerStore((state) => state.setCustomer);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    if (!customer) return;
    if (firstNameRef.current) firstNameRef.current.value = customer.firstName || '';
    if (lastNameRef.current) lastNameRef.current.value = customer.lastName || '';
    if (emailRef.current) emailRef.current.value = customer.email || '';
    if (dobRef.current) dobRef.current.value = customer.dateOfBirth || '';
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!customer) {
      console.error('Customer is null');
      return;
    }

    const accessToken = localStorage.getItem('ACCESS_TOKEN_KEY');
    if (!accessToken) {
      console.error('ACCESS_TOKEN_KEY not found');
      return;
    }

    const apiRoot = createApiClientWithToken(accessToken);

    const actions: MyCustomerUpdateAction[] = [
      {
        action: 'setFirstName',
        firstName: firstNameRef.current?.value || '',
      } as MyCustomerSetFirstNameAction,
      {
        action: 'setLastName',
        lastName: lastNameRef.current?.value || '',
      } as MyCustomerSetLastNameAction,
      {
        action: 'changeEmail',
        email: emailRef.current?.value || '',
      } as MyCustomerChangeEmailAction,
      {
        action: 'setDateOfBirth',
        dateOfBirth: dobRef.current?.value || '',
      } as MyCustomerSetDateOfBirthAction,
    ];

    try {
      const response = await apiRoot
        .me()
        .post({
          body: {
            version: customer.version,
            actions,
          },
        })
        .execute();

      setCustomer(response.body);
      await mutate('customer-profile', response.body, false);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Make changes to your profile here. Click save when you are done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">First name</Label>
          <Input
            id="name"
            defaultValue={customer?.firstName}
            ref={firstNameRef}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="surname">Last name</Label>
          <Input
            id="surname"
            defaultValue={customer?.lastName}
            ref={lastNameRef}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue={customer?.email} ref={emailRef} disabled={!isEditing} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="date">Date of birth</Label>
          <Input
            id="date"
            defaultValue={customer?.dateOfBirth}
            ref={dobRef}
            disabled={!isEditing}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-3">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <SquarePen size={20} strokeWidth={1.25} />
            Edit profile
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                void handleSave();
              }}
            >
              Save Changes
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
