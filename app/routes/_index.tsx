import type { MetaFunction } from "@remix-run/node";
import HomePage from "~/components/homepage";

export const meta: MetaFunction = () => {
  return [
    { title: "Remi-x-commerce" },
    { name: "description", content: "Best commerce" },
  ];
};

export default function Index() {
  return (
    <HomePage/>
  )
}

