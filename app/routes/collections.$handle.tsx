import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { fetchCollection } from "~/shopify/collections";
import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import ProductCard from "~/components/ProductCard";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const handle = params.handle;
  if (!handle)
    throw new Response("Please provide collection handle", { status: 404 });
  const url = new URL(request.url);
  const minPrice = parseInt(url.searchParams.get("minPrice") ?? "0");
  const maxPrice = parseInt(url.searchParams.get("maxPrice") ?? "100000");
  const collection = await fetchCollection(handle, minPrice, maxPrice);
  if (!collection) throw new Response("Collection not found", { status: 404 });
  return { collection, maxPrice, minPrice };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const handle = params.handle;
  if (!handle)
    throw new Response("Please provide collection handle", { status: 404 });
  const data = Object.fromEntries(formData) as {
    minPrice: string;
    maxPrice: string;
  };

  const minPrice = data.minPrice.length ? parseInt(data.minPrice) : 0;
  const maxPrice = data.maxPrice.length ? parseInt(data.maxPrice) : 10000;
  console.log(
    `/collections/${handle}?minPrice=${minPrice}&maxPrice=${maxPrice}`,
    formData
  );
  return redirect(
    `/collections/${handle}?minPrice=${minPrice ?? 0}&maxPrice=${maxPrice ?? 10000}`
  );
};

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    { title: data?.collection.handle ?? "Remi-x-commerce" },
    {
      name: "description",
      content: data?.collection.description ?? "Collection Description",
    },
  ];
};

const CollectionPage = () => {
  const { collection, maxPrice, minPrice } = useLoaderData<typeof loader>();
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const products = collection.products;

  const formRef = useRef<HTMLFormElement>(null);

  const handlePriceChange = (value: number[] ) => {
    setPriceRange(value);
    formRef.current?.submit();
  };

  const clearAllFilters = () => {
    setPriceRange([minPrice, maxPrice]);
  };

 

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Collection Hero */}
        <section className="relative py-12 px-4 mb-8">
          <div className="absolute inset-0 z-0">
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h1 className="text-4xl font-bold mb-4">{collection.title}</h1>
              <p className="text-lg">{collection.description}</p>
            </div>
          </div>
        </section>

        {/* Collection Content */}
        <section className="container mx-auto px-4 pb-16">
          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Button variant="outline" className="mr-2 flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Filters Sidebar */}
            {
              <div className="w-full md:w-64 lg:w-80 md:mr-8 mb-6 md:mb-0">
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-gray-500"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </Button>
                  </div>

                  <Accordion type="single" collapsible defaultValue="price">
                    <AccordionItem value="price">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-4">
                          <Form
                            ref={formRef}
                            method="POST"
                            className="flex justify-between gap-2"
                          >
                            <div className="border rounded p-2 w-max">
                              <span className="text-xs text-gray-500">Min</span>
                              <div className="flex items-center">
                                <span className="text-xs mr-1">$</span>
                                <Input
                                  type="number"
                                  name="minPrice"
                                  value={priceRange[0]}
                                  className="border-0 p-0 h-6 focus-visible:ring-0"
                                  onChange={(e)=>handlePriceChange([parseInt(e.target.value),priceRange[1]])}
                                />
                              </div>
                            </div>
                            <div className="border rounded p-2 w-max">
                              <span className="text-xs text-gray-500">Max</span>
                              <div className="flex items-center">
                                <span className="text-xs mr-1">$</span>
                                <Input
                                  type="number"
                                  name="maxPrice"
                                  value={priceRange[1]}
                                  className="border-0 p-0 h-6 focus-visible:ring-0"
                                  onChange={(e)=>handlePriceChange([priceRange[0],parseInt(e.target.value)])}
                                />
                              </div>
                            </div>
                          </Form>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            }

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product,i) => (
                  <ProductCard key={i} product={product}/>
                ))}
              </div>

              {/* Empty State */}
              {products.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your filters to find what you&apos;re looking
                    for.
                  </p>
                  <Button onClick={clearAllFilters}>Clear all filters</Button>
                </div>
              )}

              {/* Results Count */}
              <div className="mt-8 text-center text-gray-500">
                Showing {products.length} products
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CollectionPage;
