import { useParams } from 'react-router';

import ProductOverview from '@/feature/product-overview/product-overview-component';

export default function ProductDetailPage() {
  const { slug } = useParams();

  if (!slug) {
    return null;
  }

  const formattedSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <title>{`Product - ${formattedSlug.replace(/-/g, ' ')} :: Poster store`}</title>
      <ProductOverview productSlug={slug} />
    </>
  );
}
