import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertFailedLogin() {
  return (
    <Alert variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Login error!</AlertTitle>
      <AlertDescription>Please check your email and password and try again.</AlertDescription>
    </Alert>
  );
}
