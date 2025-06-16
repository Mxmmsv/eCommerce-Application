import { useParams } from 'react-router';

import BackButton from '@/feature/catalog/back-button/back-button';
import ProductOverview from '@/feature/product-overview/product-overview-component';

export default function ProductDetailPage() {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <>
      <title>{'Product overview :: Poster store'}</title>
      <BackButton />
      <ProductOverview productId={id} />
    </>
  );
}
