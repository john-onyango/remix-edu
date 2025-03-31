import { Link } from "@remix-run/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useCart } from "~/context/usecartcontext";
import { X } from "lucide-react";

export default function CartPopover() {
  const { 
    cart, 
    isLoading,
    removeCartItem,
    isRemovingItem,
    closeCart,
    openCart,
    isCartOpen
  } = useCart();
  
  const itemCount = cart?.items?.reduce(
    (total, item) => total + item.quantity, 
    0
  ) || 0;
  
  const hasItems = cart?.items?.length ;
  const subtotal = cart?.items?.reduce(
    (sum, item) => sum + (item.quantity * parseInt(item.merchandise?.price ?? item.merchandise?.amount)), 
    0
  ) || 0;
  return (
    <Popover open={isCartOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {isLoading ? (
                <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
              ) : (
                itemCount
              )}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
        <div className="p-4 font-medium border-b">
          <h3 className="text-lg">Your Cart {itemCount > 0 && `(${itemCount})`}</h3>
        </div>
        
        {isLoading && !hasItems ? (
          <div className="flex items-center justify-center p-4 h-40">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : !hasItems ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button asChild className="w-full" onClick={closeCart}>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-80">
              <ul className="divide-y">
                {cart?.items?.map((item) => {
                  const isRemoving = isRemovingItem(item.id);
                  return (
                    <li key={item.id} className={`p-4 flex items-start ${isRemoving ? 'opacity-50' : ''}`}>
                      <div className="h-16 w-16 flex-shrink-0 bg-muted rounded-md"></div>
                      
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-wrap truncate" title={item.merchandise.productTitle}>
                            {item.merchandise.productTitle}
                          </h4>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.merchandise.title}
                        </p>
                        <div className="mt-1 flex items-center gap-6">
                          <span className="text-sm">
                            {item.quantity} * {parseInt(item.merchandise?.price ?? item.merchandise?.amount)}
                          </span>
                          <Button
                            onClick={() => removeCartItem(item.id)}
                            disabled={isRemoving}
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                          >
                           { isRemoving 
                           ?"Removing..."
                           :
                          <>
                          Remove
                          <X className="w-4 h-4" />
                          </>
                           }
                          
                          </Button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex justify-between py-2">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Shipping and taxes calculated at checkout
              </p>
              
              <div className="space-y-2">
                
                <Button asChild variant="secondary" className="w-full">
                  <a href={cart?.checkoutUrl || '#'}>Checkout</a>
                </Button>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}