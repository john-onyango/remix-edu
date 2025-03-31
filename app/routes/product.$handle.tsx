import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Heart, Share2 } from "lucide-react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { fetchProduct } from "~/shopify/product";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import AddToCartButton from "~/components/AddToCartButton";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const handle = params.handle;
  if (!handle)
    throw new Response("Please provide collection handle", { status: 404 });
  const product = await fetchProduct(handle);
  if (!product) throw new Response("Product not found", { status: 404 });
  return { product };
};


export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    { title: data?.product.handle ?? "Remi-x-commerce" },
    {
      name: "description",
      content: data?.product.description ?? "Product Description",
    },
  ];
};


const ProductDetailPage = () => {
  const { product } = useLoaderData<typeof loader>();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.images[0].url);
  const formatPrice = (price: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4 relative rounded-lg overflow-hidden">
            <img
              src={currentImage}
              alt={product.altText}
              className="w-full object-cover aspect-square"
            />
          </div>

          <Carousel className="w-full">
            <CarouselContent className="h-24">
              {product.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/4 h-full"
                  onClick={() => setCurrentImage(image.url)}
                >
                  <div
                    className={`h-full cursor-pointer border rounded-md overflow-hidden border-black}`}
                  >
                    <img
                      src={image.url}
                      alt={image.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>

        {/* Product Information */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold mr-2">
                {formatPrice(parseInt(product.price))}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              {/* Add to Cart & Wishlist */}
              <div className="flex space-x-4">
                <AddToCartButton merchandiseId={product.id} available />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={toggleWishlist}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>

                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Product Status */}
              <div className="py-2">
                <p className="text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full inline-block mr-2"></span>
                  In Stock & Ready to Ship
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
