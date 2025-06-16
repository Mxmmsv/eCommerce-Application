import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

export default function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    void navigate(-1);
  };

  return (
    <Button onClick={goBack} variant="outline" className="m-7">
      <ArrowLeft size={36} />
      Go Back
    </Button>
  );
}
