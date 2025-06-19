import { toast } from 'sonner';

async function handleCopyPromotionContent(code: string) {
  try {
    await navigator.clipboard.writeText(code);
    toast.success('Promo code copied!');
  } catch (error) {
    console.error('Failed to copy promo code:', error);
  }
}

export default handleCopyPromotionContent;
