import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { Button } from "~/components/ui/button";
import { User, Search, Heart } from "lucide-react";

import styles from "./tailwind.css?url";
import { CartProvider } from "./context/usecartcontext";
import CartPopover from "./components/CartPopover";
import { fetchCollections } from "./shopify/collections";

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
        {children}
        {/* Footer */}
        <footer className=" w-full bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Remi-x-commerce</h3>
                <p className="text-gray-600">
                  Your one-stop shop for all your needs.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Customer Service</h3>
                <ul className="flex flex-col gap-2">
                  <Link
                    className="text-gray-600 hover:text-gray-900"
                    to="support"
                    key="Contact Us"
                  >
                    Support
                  </Link>
                  <Link
                    className="text-gray-600 hover:text-gray-900"
                    to="about"
                    key="About"
                  >
                    About
                  </Link>
                </ul>
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

export const loader = async () => {
  const collections = await fetchCollections();
  return { collections };
};

export default function App() {
  const { collections } = useLoaderData<typeof loader>();
  return (
    <CartProvider>
      {/* Header and Navigation */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-bold">
              <Link to="/">Remi-x-commerce</Link>
            </div>
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
              <CartPopover />
            </div>
          </div>

          <NavigationMenu className="pb-2">
            <NavigationMenuList>
              {collections?.map((category) => (
                <NavigationMenuItem key={category.id}>
                  <Link to={`/collections/${category.handle}`}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {category.title}
                    </NavigationMenuLink>
                  </Link>
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
      <Outlet />
    </CartProvider>
  );
}
