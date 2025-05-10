import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';

import apiRoot from '@/feature/api/api-client';

export const loginCustomerWithMail = async (
  email: string,
  password: string,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return await apiRoot
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();
};
