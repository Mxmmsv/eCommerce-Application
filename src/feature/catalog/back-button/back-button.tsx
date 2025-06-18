import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

export default function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    void navigate(-1);
  };

  return (
    <div className="flex justify-end px-6 py-4">
      <Button
        onClick={goBack}
        variant="outline"
        className="w-auto gap-2 rounded-full px-10"
        size="lg"
      >
        <div>
          <ArrowLeft size={36} />
        </div>
        Go Back
      </Button>
    </div>
  );
}
