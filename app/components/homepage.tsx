
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '~/components/ui/navigation-menu';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { ShoppingCart, User, Search, Heart } from 'lucide-react';
import { banners, categories, products } from '~/lib/mocks';
import { Link } from '@remix-run/react';


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header and Navigation */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-bold">Remi-x-commerce</div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
          
          <NavigationMenu className="pb-2">
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.id}>
                  <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory}>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {subcategory}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sale
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

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
                      <h2 className="text-white text-3xl font-bold mb-2">{banner.title}</h2>
                      <p className="text-white text-xl mb-4">{banner.description}</p>
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
          {Object.entries(products).map(([category, items]) => (
            <div key={category} className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{category}</h2>
                <Button variant="outline">View More</Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="font-semibold">${product.price}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ShopSmart</h3>
              <p className="text-gray-600">Your one-stop shop for all your needs.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <Link className="text-gray-600 hover:text-gray-900" to="#" key={category.id}>{category.name}</Link>

                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2">
              <Link className="text-gray-600 hover:text-gray-900" to="#" key="Contact Us">Contact Us</Link>
              <Link className="text-gray-600 hover:text-gray-900" to="#" key="FAQs">FAQs</Link>
              <Link className="text-gray-600 hover:text-gray-900" to="#" key="FAQs">FAQs</Link>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
              <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates and promotions.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="border rounded-l px-4 py-2 w-full focus:outline-none"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-gray-500">
            <p>&copy; 2025 Remi-x-commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;