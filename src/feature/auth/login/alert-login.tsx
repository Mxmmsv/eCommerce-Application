import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertDemo() {
  return (
    <Alert variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Ошибка входа!</AlertTitle>
      <AlertDescription>Проверьте email и пароль и попробуйте снова.</AlertDescription>
    </Alert>
  );
}
