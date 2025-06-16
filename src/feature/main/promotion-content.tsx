import type { DiscountCode } from '@commercetools/platform-sdk';
import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';

import fetchPromoCode from './api/fetch-promo-code';
import handleCopyPromotionContent from './use-promotion-content';

function PromotionContent() {
  const { data, error, isLoading } = useSWR<DiscountCode[], Error>('promo-codes', fetchPromoCode);
  if (isLoading) return <Spinner className="mx-auto" />;
  if (error) return <p>Error loading promo code.</p>;
  if (!data || data.length === 0) return 'Promocode not available';

  const { code, name } = data[0];
  return (
    <div className="flex w-full flex-row items-center gap-10 text-nowrap">
      <h2>Click and get promocode! </h2>
      <button
        className="hover:text-chart-3 cursor-pointer font-bold"
        onClick={() => void handleCopyPromotionContent(code)}
        title="Click to copy"
      >
        {code}
      </button>
      <p>Promotion: {name?.['en-GB'] ?? ''}</p>
    </div>
  );
}

export default PromotionContent;
