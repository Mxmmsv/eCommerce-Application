import { useParams } from 'react-router';

import ProductOverview from '@/feature/product-overview/product-overview-form';

export default function ProductDetailPage() {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return <ProductOverview productId={id} />;
}
