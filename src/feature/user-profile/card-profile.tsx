
import { SquarePen } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

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
import { useCustomerStore } from '@/service/store/use-user-store';

import { useUpdateCustomer } from './use-update-customer';

export default function ProfileCard() {
  const customer = useCustomerStore((state) => state.customer);

  const [isEditing, setIsEditing] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);

  const { update } = useUpdateCustomer();

  const handleSave = async () => {
    try {
      await update({
        firstName: firstNameRef.current?.value || '',
        lastName: lastNameRef.current?.value || '',
        email: emailRef.current?.value || '',
        dateOfBirth: dobRef.current?.value || '',
      });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
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
      <CardFooter className="justify-end">
        {isEditing ? (
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                void handleSave();
              }}
            >
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <SquarePen size={20} strokeWidth={1.25} />
            Edit profile
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
