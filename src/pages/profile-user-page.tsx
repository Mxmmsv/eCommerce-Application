import { MapPinCheck, Key, Lock, User } from 'lucide-react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileCard from '@/feature/user-profile/profile-card';
import { useCustomerStore } from '@/service/store/use-user-store';

export default function UserProfilePage() {
  const customer = useCustomerStore((state) => state.customer);

  return (
    <main className="flex flex-col items-center justify-center text-lg">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-col items-center justify-center gap-4">
            <h1 className="text-center text-2xl font-semibold uppercase">
              Welcome back, {customer?.firstName}!
            </h1>
            <p className="text-muted-foreground text-center text-sm">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="flex flex-col gap-2 space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="text-xs max-sm:px-1">
                  <User size={16} strokeWidth={1.5} className="mr-2 max-[375px]:hidden" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="text-xs max-sm:px-1">
                  <Lock size={16} strokeWidth={1.5} className="mr-2 max-[375px]:hidden" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="addresses" className="text-xs max-sm:px-1">
                  <MapPinCheck size={16} strokeWidth={1.5} className="mr-2 max-[375px]:hidden" />
                  Address Book
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <ProfileCard />
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you will be logged out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirm-new">Confirm new password</Label>
                      <Input id="confirm-new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button>
                      <Key size={20} strokeWidth={1.25} />
                      Change
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>Address Book</CardTitle>
                    <CardDescription>
                      Choose your shipping and billing addresses here. Save all your available
                      address.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2"></CardContent>
                  <CardFooter className="justify-end"></CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
