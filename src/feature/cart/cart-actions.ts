export const useCartActions = () => {
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
  return { handleUpdateQuantity, handleRemove };
};
