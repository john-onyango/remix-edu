import { CartInput, CartLineUpdateInput } from "types/storefront.types";
import { z } from "zod";
import client from "~/shopify.server";

export const CartResponseSchema = z.object({
  cartCreate: z.object({
    cart: z.object({
      id: z.string(),
      checkoutUrl: z.string().url(),
      lines: z.object({
        edges: z.array(
          z.object({
            node: z.object({
              id: z.string(),
              quantity: z.number(),
              merchandise: z.object({
                id: z.string(),
                title: z.string().nullable().optional(),
                product: z
                  .object({
                    handle: z.string().nullable().optional(),
                    title: z.string().nullable().optional(),
                  })
                  .nullable()
                  .optional(),
                price: z
                  .object({
                    amount: z.string(),
                    currencyCode: z.string(),
                  })
                  .nullable()
                  .optional(),
              }),
            }),
          })
        ),
      }),
    }),
  }),
}).transform((result) => ({
  id: result.cartCreate.cart.id,
  checkoutUrl: result.cartCreate.cart.checkoutUrl,
  items: result.cartCreate.cart.lines.edges.map(({ node }) => ({
    id: node.id,
    quantity: node.quantity,
    merchandise: {
      id: node.merchandise.id,
      title: node.merchandise?.title || null,
      productHandle: node.merchandise?.product?.handle || null,
      productTitle: node.merchandise?.product?.title || null,
      price: node.merchandise?.price?.amount || null,
      currencyCode: node.merchandise?.price?.currencyCode || null,
    },
  })),
}));


export const createCart = async (cartInput: CartInput) => {
  const { data, errors } = await client.request(
    `#graphql
    mutation CreateCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id  
                     product {
                      handle
                      title
                    },
                    price{
                    amount
                    currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
    { variables: { input: cartInput } }
  );


  if (errors) {
    console.error(errors.graphQLErrors);
    return null;
  }
  return CartResponseSchema.parse({ cartCreate: data?.cartCreate });
};


const UpdateCartResponseSchema = z.object({
  cartLinesUpdate: z.object({
    cart: z.object({
      id: z.string(),
      checkoutUrl: z.string().url(),
      lines: z.object({
        edges: z.array(
          z.object({
            node: z.object({
              id: z.string(),
              quantity: z.number(),
              merchandise: z.object({
                id: z.string(),
                title: z.string(),
                product: z.object({
                  handle: z.string(),
                  title: z.string(),
                }),
                price: z.object({
                  amount: z.string(),
                  currencyCode: z.string()
                })
              }),
            }),
          })
        ),
      }),
    }),
  }),
}).transform((data) => ({
  id: data.cartLinesUpdate.cart.id,
  checkoutUrl: data.cartLinesUpdate.cart.checkoutUrl,
  items: data.cartLinesUpdate.cart.lines.edges.map(({ node }) => ({
    id: node.id,
    quantity: node.quantity,
    merchandise: {
      id: node.merchandise.id,
      title: node.merchandise.title,
      productHandle: node.merchandise.product.handle,
      productTitle: node.merchandise.product.title,
      amount: node.merchandise.price.amount,
      currencyCode: node.merchandise.price.currencyCode
    },
  })),
}));

export const updateCart = async (cartId: string, lines: CartLineUpdateInput | CartLineUpdateInput[]) => {
  const { data, errors } = await client.request(
    `#graphql
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      handle
                      title
                    },
                    price{
                    amount
                    currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
    { variables: { cartId, lines } }
  );

  if (errors) {
    console.error(errors);
    return null;
  }

  return UpdateCartResponseSchema.parse({ cartLinesUpdate: data?.cartLinesUpdate });
};

const CartLinesAddResponseSchema = z.object({
  cartLinesAdd: z.object({
    cart: z.object({
      id: z.string(),
      checkoutUrl: z.string().url(),
      lines: z.object({
        edges: z.array(
          z.object({
            node: z.object({
              id: z.string(),
              quantity: z.number(),
              merchandise: z.object({
                id: z.string(),
                title: z.string().nullable().optional(),
                product: z
                  .object({
                    handle: z.string().nullable().optional(),
                    title: z.string().nullable().optional(),
                  })
                  .nullable()
                  .optional(),
                price: z
                  .object({
                    amount: z.string(),
                    currencyCode: z.string(),
                  })
                  .nullable()
                  .optional(),
              }),
            }),
          })
        ),
      }),
    }),
  }),
}).transform((data) => ({
  id: data.cartLinesAdd.cart.id,
  checkoutUrl: data.cartLinesAdd.cart.checkoutUrl,
  items: data.cartLinesAdd.cart.lines.edges.map(({ node }) => ({
    id: node.id,
    quantity: node.quantity,
    merchandise: {
      id: node.merchandise.id,
      title: node.merchandise?.title || null,
      productHandle: node.merchandise?.product?.handle || null,
      productTitle: node.merchandise?.product?.title || null,
      price: node.merchandise?.price?.amount || null,
      currencyCode: node.merchandise?.price?.currencyCode || null,
    },
  })),
}));

export const cartAddLine = async (cartId: string, lines: CartLineUpdateInput | CartLineUpdateInput[]) => {
  const { data, errors } = await client.request(
    `#graphql
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      handle
                      title
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
    { variables: { cartId, lines } }
  );

  if (errors) {
    console.error(errors);
    return null;
  }

  return CartLinesAddResponseSchema.parse({ cartLinesAdd: data?.cartLinesAdd });
};
