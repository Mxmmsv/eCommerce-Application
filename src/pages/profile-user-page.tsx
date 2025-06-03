
import { MapPinCheck, Lock, User } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllCustomerAddress from '@/feature/user-profile/card-address-book';
import PasswordCard from '@/feature/user-profile/card-password';
import ProfileCard from '@/feature/user-profile/card-profile';
import { useCustomerStore } from '@/service/store/use-user-store';

export default function UserProfilePage() {
  const customer = useCustomerStore((state) => state.customer);

  return (
<title>{'Profile :: Poster store'}</title>
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
                <TabsTrigger value="password" className="text-xs max-sm:px-1">
                  <Lock size={16} strokeWidth={1.5} className="mr-2 max-[375px]:hidden" />
                  Password
                </TabsTrigger>
                <TabsTrigger value="addresses" className="text-xs max-sm:px-1">
                  <MapPinCheck size={16} strokeWidth={1.5} className="mr-2 max-[375px]:hidden" />
                  Address Book
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <ProfileCard />
              </TabsContent>
              <TabsContent value="password">
                <PasswordCard />
              </TabsContent>
              <TabsContent value="addresses">
                <AllCustomerAddress />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
