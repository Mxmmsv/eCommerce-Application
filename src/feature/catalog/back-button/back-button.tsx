import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function BackButton() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Button onClick={goBack} variant="outline" className="m-7">
      <ArrowLeft size={36} />
      Go Back
    </Button>
  );
}
