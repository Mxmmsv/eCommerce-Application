import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        void navigate(-1);
      }}
      variant="outline"
      className="m-7"
    >
      <ArrowLeft size={36} />
      Back to Catalog
    </Button>
  );
};

export default BackButton;
