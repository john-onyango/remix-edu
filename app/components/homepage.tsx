import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { banners } from "~/lib/mocks";
import { Collection } from "~/shopify/collections";
import ProductCard from "./ProductCard";

const HomePage = ({ collections }: { collections: Collection | null }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Banner Carousel */}
        <section className="container mx-auto py-6">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-10">
                      <h2 className="text-white text-3xl font-bold mb-2">
                        {banner.title}
                      </h2>
                      <p className="text-white text-xl mb-4">
                        {banner.description}
                      </p>
                      <Button>Shop Now</Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </section>

        {/* Featured Categories */}
        <section className="container mx-auto py-8">
          {collections &&
            collections.map(({ handle, products }) => (
              <div key={handle} className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{handle}</h2>
                  <Link to={`/collections/${handle}`}>
                    <Button variant="outline">View More</Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                   <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
