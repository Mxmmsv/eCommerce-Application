const rawData = import.meta.env.VITE_PRODUCTS_PER_PAGE as string | undefined;

if (rawData === undefined || rawData === '') {
  throw new Error('VITE_PRODUCTS_PER_PAGE variable was not specified in .env file');
}

const parsedData = Number(rawData);

if (isNaN(parsedData)) {
  throw new Error('VITE_PRODUCTS_PER_PAGE variable must be a number in range of [0...500]');
}

export const config = {
  productsPerPage: parsedData,
};
