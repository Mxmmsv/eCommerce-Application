import { clearCart } from './api/api-clear-cart';

export const useCartActions = () => {
  const handleClearCart = async (): Promise<boolean> => {
    try {
      await clearCart();
      return true;
    } catch (error) {
      console.error('Clearance failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  };
  const handleUpdateQuantity = () => {
    // (id: string, change: number) => {
    // setItems((prev) =>
    //   prev.map((item) => {
    //     if (item.id === id) {
    //       const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + change));
    //       return { ...item, quantity: newQuantity };
    //     }
    //     return item;
    //   }),
    // );
  };

  const handleRemove = () => {
    // (id: string) => {
    // setItems((prev) => prev.filter((item) => item.id !== id));
  };
  return { handleClearCart, handleUpdateQuantity, handleRemove };
};
