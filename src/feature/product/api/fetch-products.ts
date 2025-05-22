import apiRoot from '@/feature/api/api-client-credentials-flow';

async function fetchProducts() {
  const response = await apiRoot.productProjections().get().execute();
  const products = response.body.results;

  products.forEach((product) => {
    const name = product.name['en-GB'];
    const description = product.description?.['en-GB'] ?? '';
    const prices = product.masterVariant.prices;
    const imageUrl = product.masterVariant.images;

    let priceInfo = 'No price available';
    if (prices && prices.length > 0) {
      const priceValue = prices[0].value;
      priceInfo = `${(priceValue.centAmount / 100).toFixed(2)} ${priceValue.currencyCode}`;
    }

    console.log('Название:', name);
    console.log('Описание:', description);
    console.log('Цена:', priceInfo);
    console.log('Картинка:', imageUrl);
  });
}

export default fetchProducts;
