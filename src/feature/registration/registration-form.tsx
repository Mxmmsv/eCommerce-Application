import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { CloseButton } from '../../components/ui/button/close-button';

export function RegistrationForm({ className, ...props }: React.ComponentProps<'div'>) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!(e.currentTarget instanceof HTMLFormElement)) {
      console.log('не является элементом формы');
      return;
    }

    const formData = new FormData(e.currentTarget);

    const getStringValue = (field: string) => {
      const value = formData.get(field);
      return value instanceof File ? '' : String(value ?? '');
    };

    const data = {
      firstName: getStringValue('firstName'),
      lastName: getStringValue('lastName'),
      email: getStringValue('email'),
      password: getStringValue('password'),
    };
    console.log('Данные формы:', data);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative p-12">
        <CloseButton className="flex justify-end" />
        <CardHeader className="flex justify-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-3">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-3xs self-center">
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Button variant="outline" className="w-3xs" asChild>
                <Link to="/login">Already have an account? Sign in</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
