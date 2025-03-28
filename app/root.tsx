import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

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
import { ShoppingCart, User, Search, Heart } from 'lucide-react';


import styles from "./tailwind.css?url";
import { categories } from "./lib/mocks";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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
        {children}
              {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Remi-x-commerce</h3>
              <p className="text-gray-600">Your one-stop shop for all your needs.</p>
            </div>
          
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="flex flex-col gap-2">
              <Link className="text-gray-600 hover:text-gray-900" to="support" key="Contact Us">Support</Link>
              <Link className="text-gray-600 hover:text-gray-900" to="about" key="About">About</Link>
              </ul>
            </div>
            <div >
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
