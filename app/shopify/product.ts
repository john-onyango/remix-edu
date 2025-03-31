import { z } from "zod";
import client from "~/shopify.server";

export const ProductResponseSchema = z.object({
    productByHandle: z.object({
        id: z.string(),
        handle: z.string(),
        priceRange: z.object({
            minVariantPrice: z.object({
                amount: z.string(),
                currencyCode: z.string(),
            }),
        }),
        title: z.string(),
        description: z.string().optional(),
        featuredImage: z
            .object({
                url: z.string().url(),
                altText: z.string().nullable(),
            })
            .nullable(),
        images: z.object({
            edges: z.array(
                z.object({
                    node: z.object({
                        url: z.string().url(),
                        altText: z.string().nullable(),
                    }),
                })
            ),
        }),
        variants: z.object({
            edges: z.array(
                z.object({
                    node: z.object({
                        id: z.string(),
                        title: z.string(),
                        price: z.object({
                            amount: z.string(),
                            currencyCode: z.string(),
                        }),
                        availableForSale: z.boolean(),
                    }),
                })
            ),
        }),
    }),
}).transform((data) => ({
    id: data.productByHandle.variants.edges[0].node.id,
    price: data.productByHandle.priceRange.minVariantPrice.amount,
    handle: data.productByHandle.handle,
    title: data.productByHandle.title,
    description: data.productByHandle.description || "",
    featuredImage: data.productByHandle.featuredImage?.url || "",
    altText: data.productByHandle.featuredImage?.altText || "",
    images: data.productByHandle.images.edges.map(({ node }) => ({
        url: node.url,
        altText: node.altText || "",
    })),
    variants: data.productByHandle.variants.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        price: node.price.amount,
        currency: node.price.currencyCode,
        availableForSale: node.availableForSale,
    })),
}));

export type Product = z.infer<typeof ProductResponseSchema>;
export const fetchProduct = async (handle: string) => {
    const { data, errors } = await client.request(
        `#graphql
    query FetchProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
         }
        handle
        title
        description
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }`,
        { variables: { handle } }
    );

    if (errors) {
        console.error(errors);
        return null;
    }
    return ProductResponseSchema.parse({ productByHandle: data?.productByHandle });
};
