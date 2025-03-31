
import {
  createStorefrontApiClient,
} from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_APP_URL!,
  apiVersion: '2025-01',
  privateAccessToken: process.env.SHOPIFY_PRIVATE_API_TOKEN!,
  customFetchApi: fetch
});

export default client;