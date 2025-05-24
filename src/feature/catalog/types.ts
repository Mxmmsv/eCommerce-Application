export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type CommercetoolsProduct = {
  id: string;
  masterData?: {
    current?: {
      name?: { [key: string]: string };
      description?: { [key: string]: string };
      masterVariant?: {
        images?: { url: string }[];
      };
    };
  };
};
