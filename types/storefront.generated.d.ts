/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type CreateCartMutationVariables = StorefrontTypes.Exact<{
  input: StorefrontTypes.CartInput;
}>;


export type CreateCartMutation = { cartCreate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl'>
      & { lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: Pick<StorefrontTypes.Product, 'handle' | 'title'> }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: Pick<StorefrontTypes.Product, 'handle' | 'title'> }
            ) }
          ) }> } }
    )> }> };

export type UpdateCartMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineUpdateInput> | StorefrontTypes.CartLineUpdateInput;
}>;


export type UpdateCartMutation = { cartLinesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl'>
      & { lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: Pick<StorefrontTypes.Product, 'handle' | 'title'> }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: Pick<StorefrontTypes.Product, 'handle' | 'title'> }
            ) }
          ) }> } }
    )> }> };

export type FetchCollectionsAndProductsQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type FetchCollectionsAndProductsQuery = { collections: { edges: Array<{ node: (
        Pick<StorefrontTypes.Collection, 'id' | 'handle' | 'title' | 'description'>
        & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'originalSrc'>>, products: { edges: Array<{ node: (
              Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title'>
              & { featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>>, variants: { edges: Array<{ node: { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }> } }
            ) }> } }
      ) }> } };

export type FetchCollectionByHandleQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
  minPrice: StorefrontTypes.Scalars['Float']['input'];
  maxPrice: StorefrontTypes.Scalars['Float']['input'];
}>;


export type FetchCollectionByHandleQuery = { collectionByHandle?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Collection, 'id' | 'handle' | 'title' | 'description'>
    & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'originalSrc'>>, products: { edges: Array<{ node: (
          Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title'>
          & { featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>>, variants: { edges: Array<{ node: { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }> } }
        ) }> } }
  )> };

export type FetchProductByHandleQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
}>;


export type FetchProductByHandleQuery = { productByHandle?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description'>
    & { priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText'> }> }, variants: { edges: Array<{ node: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
        ) }> } }
  )> };

interface GeneratedQueryTypes {
  "#graphql\n        query FetchCollectionsAndProducts {\n          collections(first: 10) {\n            edges {\n              node {\n                id\n                handle\n                title\n                description\n                image {\n                  originalSrc\n                }\n                products(first: 4) {\n                  edges {\n                    node {\n                      id\n                      handle\n                      title\n                      featuredImage {\n                        url\n                        altText\n                      }\n                      variants(first: 1) {\n                        edges {\n                          node {\n                            price {\n                              amount\n                              currencyCode\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }": {return: FetchCollectionsAndProductsQuery, variables: FetchCollectionsAndProductsQueryVariables},
  "#graphql\n      query FetchCollectionByHandle($handle: String!, $minPrice:Float! , $maxPrice:Float! ) {\n        collectionByHandle(handle: $handle) {\n          id\n          handle\n          title\n          description\n          image {\n            originalSrc\n          }\n          products(first: 10, filters: { price: { min: $minPrice, max: $maxPrice } }) {\n            edges {\n              node {\n                id\n                handle\n                title\n                featuredImage {\n                  url\n                  altText\n                }\n                variants(first: 1) {\n                  edges {\n                    node {\n                      price {\n                        amount\n                        currencyCode\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }": {return: FetchCollectionByHandleQuery, variables: FetchCollectionByHandleQueryVariables},
  "#graphql\n    query FetchProductByHandle($handle: String!) {\n      productByHandle(handle: $handle) {\n        id\n        priceRange {\n          minVariantPrice {\n            amount\n            currencyCode\n          }\n         }\n        handle\n        title\n        description\n        featuredImage {\n          url\n          altText\n        }\n        images(first: 10) {\n          edges {\n            node {\n              url\n              altText\n            }\n          }\n        }\n        variants(first: 10) {\n          edges {\n            node {\n              id\n              title\n              price {\n                amount\n                currencyCode\n              }\n              availableForSale\n            }\n          }\n        }\n      }\n    }": {return: FetchProductByHandleQuery, variables: FetchProductByHandleQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n    mutation CreateCart($input: CartInput!) {\n      cartCreate(input: $input) {\n        cart {\n          id\n          checkoutUrl\n          lines(first: 10) {\n            edges {\n              node {\n                id\n                quantity\n                merchandise {\n                  ... on ProductVariant {\n                    id\n                    title\n                    product {\n                      handle\n                      title\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }": {return: CreateCartMutation, variables: CreateCartMutationVariables},
  "#graphql\n    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n      cartLinesUpdate(cartId: $cartId, lines: $lines) {\n        cart {\n          id\n          checkoutUrl\n          lines(first: 10) {\n            edges {\n              node {\n                id\n                quantity\n                merchandise {\n                  ... on ProductVariant {\n                    id\n                    title\n                    product {\n                      handle\n                      title\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }": {return: UpdateCartMutation, variables: UpdateCartMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
