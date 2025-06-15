export const useSavePageOnClick = (page: number) => {
  return () => sessionStorage.setItem('lastPage', page.toString());
};
