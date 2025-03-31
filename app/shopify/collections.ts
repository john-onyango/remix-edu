import client from "~/shopify.server";
import { z } from "zod";

const collectionsResponseSchema = z.object({
  collections: z.object({
    edges: z.array(
      z.object({
        node: z.object({
          id: z.string(),
          handle: z.string(),
          title: z.string(),
          description: z.string().optional(),
          image: z
            .object({
              originalSrc: z.string().url(),
            })
            .nullable(),
          products: z.object({
            edges: z.array(
              z.object({
                node: z.object({
                  id: z.string(),
                  handle: z.string(),
                  title: z.string(),
                  featuredImage: z
                    .object({
                      url: z.string().url(),
                      altText: z.string().nullable(),
                    })
                    .nullable(),
                  variants: z.object({
                    edges: z.array(
                      z.object({
                        node: z.object({
                          price: z.object({
                            amount: z.string(),
                            currencyCode: z.string(),
                          }),
                          id: z.string(),
                        }),
                      })
                    ),
                  }),
                }),
              })
            ),
          }),
        }),
      })
    ),
  }),
}).transform((data) => {
  return data.collections.edges.map(({ node }) => ({
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description || "",
    image: node.image?.originalSrc || "",
    products: node.products.edges.map(({ node }) => ({
      id: node.variants.edges[0]?.node.id,
      handle: node.handle,
      title: node.title,
      image: node.featuredImage?.url || "",
      altText: node.featuredImage?.altText || "",
      price: node.variants.edges[0]?.node.price.amount || "0.00",
      currency: node.variants.edges[0]?.node.price.currencyCode || "USD",
    })),
  }));
});

export type Collection = z.infer<typeof collectionsResponseSchema>;



export const fetchCollections = async () => {
  const { data, errors } = await client.request(
    `#graphql
        query FetchCollectionsAndProducts {
          collections(first: 10) {
            edges {
              node {
                id
                handle
                title
                description
                image {
                  originalSrc
                }
                products(first: 4) {
                  edges {
                    node {
                      id
                      handle
                      title
                      featuredImage {
                        url
                        altText
                      }
                      variants(first: 1) {
                        edges {
                          node {
                          id
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
            }
          }
        }`
  );

  if (errors) {
    console.error(errors);
    return null;
  }
  return collectionsResponseSchema.parse(data);
}
const FetchCollectionSchema = z.object({
  collection: z.object({
    id: z.string(),
    handle: z.string(),
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        originalSrc: z.string().url(),
      })
      .nullable(),
    products: z.object({
      edges: z.array(
        z.object({
          node: z.object({
            id: z.string(),
            handle: z.string(),
            title: z.string(),
            featuredImage: z
              .object({
                url: z.string().url(),
                altText: z.string().nullable(),
              })
              .nullable(),
            variants: z.object({
              edges: z.array(
                z.object({
                  node: z.object({
                    id: z.string(),
                    price: z.object({
                      amount: z.string(),
                      currencyCode: z.string(),
                    }),
                  }),
                })
              ),
            }),
          }),
        })
      ),
    }),
  }),
}).transform((data) => ({
  id: data.collection.id,
  handle: data.collection.handle,
  title: data.collection.title,
  description: data.collection.description || "",
  image: data.collection.image?.originalSrc || "",
  products: data.collection.products.edges.map(({ node }) => ({
    id: node.variants.edges[0]?.node.id,
    handle: node.handle,
    title: node.title,
    image: node.featuredImage?.url || "",
    altText: node.featuredImage?.altText || "",
    price: node.variants.edges[0]?.node.price.amount || "0.00",
    currency: node.variants.edges[0]?.node.price.currencyCode || "USD",
  })),
}));

export const fetchCollection = async (handle: string, minPrice: number = 0, maxPrice: number = 100000) => {
  console.log("handle", handle, minPrice, maxPrice)
  const { data, errors } = await client.request(
    `#graphql
      query FetchCollectionByHandle($handle: String!, $minPrice:Float! , $maxPrice:Float! ) {
        collectionByHandle(handle: $handle) {
          id
          handle
          title
          description
          image {
            originalSrc
          }
          products(first: 10, filters: { price: { min: $minPrice, max: $maxPrice } }) {
            edges {
              node {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                }
                variants(first: 1) {
                  edges {
                    node {
                    id
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
    { variables: { handle, minPrice, maxPrice } }
  );

  if (errors) {
    console.error(errors);
    return null;
  }
  return FetchCollectionSchema.parse({ collection: data?.collectionByHandle });
};
