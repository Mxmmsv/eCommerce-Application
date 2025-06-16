import type { DiscountCode } from '@commercetools/platform-sdk';
import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';

import fetchPromoCode from './api/fetch-promo-code';

function PromotionContent() {
  const { data, error, isLoading } = useSWR<DiscountCode[], Error>('promo-codes', fetchPromoCode);
  if (isLoading) return <Spinner className="mx-auto" />;
  if (error) return <p>Error loading promo code.</p>;
  if (!data || data.length === 0) return;

  const { code, name } = data[0];
  return (
    <>
      <h2>Promo Code: {code}</h2>
      <p>Promotion: {name?.['en-GB'] ?? ''}</p>
    </>
  );
}

export default PromotionContent;
