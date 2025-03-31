import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import HomePage from "~/components/homepage";
import { fetchCollections } from "~/shopify/collections";

export const meta: MetaFunction = () => {
  return [
    { title: "Remi-x-commerce" },
    { name: "description", content: "Best commerce" },
  ];
};

export const loader = async () => {
  const collections = await fetchCollections();
  return { collections };
};

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  return <HomePage collections={collections} />;
}
