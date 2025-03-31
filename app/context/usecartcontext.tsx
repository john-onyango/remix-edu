import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from "react";
import { useFetcher } from "@remix-run/react";

type CartItem = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string ;
    productHandle: string ;
    productTitle: string ;
    price: string ;
    currencyCode: string ;
    amount: string ;
  };
};

type Cart = {
  id: string;
  checkoutUrl: string;
  items: CartItem[];
};

type CartContextType = {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (merchandiseId: string, quantity?: number) => void;
  updateCartItem: (lineId: string, quantity: number) => void;
  removeCartItem: (lineId: string) => void;
  isAddingItem: (merchandiseId: string) => boolean;
  isUpdatingItem: (lineId: string) => boolean;
  isRemovingItem: (lineId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
};

type CartApiResponse = {
  cart: Cart | null;
  error?: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'shopify-cart-id';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [pendingOperations, setPendingOperations] = useState<{
    adding: string[];
    updating: string[];
    removing: string[];
  }>({
    adding: [],
    updating: [],
    removing: []
  });

  const fetcher = useFetcher<CartApiResponse>();

  useEffect(() => {
    const loadInitialCart = () => {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (cartId) {
        setIsLoading(true);
        fetcher.load(`/api/cart?cartId=${cartId}`);
      }
    };
    
    loadInitialCart();
  }, []);

  useEffect(() => {
    if (fetcher.data && fetcher.state === 'idle') {
      if (fetcher.data.cart) {
        if (fetcher.data.cart.id) {
          localStorage.setItem(CART_ID_KEY, fetcher.data.cart.id);
        }
        
        setCart(fetcher.data.cart);
      } 
      else if (fetcher.data.error) {
        console.error("Cart operation error:", fetcher.data.error);
        
        if (fetcher.data.error.includes("Cart not found") ||
            fetcher.data.error.includes("Invalid global id")) {
          localStorage.removeItem(CART_ID_KEY);
        }
      }
      
      setIsLoading(false);
      setPendingOperations({
        adding: [],
        updating: [],
        removing: []
      });
    }
  }, [fetcher.data, fetcher.state]);

  const refreshCart = useCallback(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      fetcher.load(`/api/cart?cartId=${cartId}`);
    }
  }, [fetcher]);

  const addToCart = useCallback((merchandiseId: string, quantity = 1) => {
    if (pendingOperations.adding.includes(merchandiseId)) {
      return;
    }
    
    setIsLoading(true);
    setPendingOperations(prev => ({
      ...prev,
      adding: [...prev.adding, merchandiseId]
    }));
    
    const cartId = localStorage.getItem(CART_ID_KEY);
    
    if (cartId) {
      const existingItem = cart?.items.find(item => 
        item.merchandise.id === merchandiseId
      );
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        fetcher.submit(
          {
            action: "updateCart",
            cartId,
            lines: JSON.stringify([{
              id: existingItem.id,
              quantity: newQuantity
            }])
          },
          { method: "post", action: "/api/cart" }
        );
      } else {
        fetcher.submit(
          {
            action: "addLineItem",
            cartId,
            lines: JSON.stringify([{
              merchandiseId,
              quantity
            }])
          },
          { method: "post", action: "/api/cart" }
        );
      }
    } 
    else {
      fetcher.submit(
        {
          action: "createCart",
          lines: JSON.stringify([{
            merchandiseId,
            quantity
          }])
        },
        { method: "post", action: "/api/cart" }
      );
    }
    
    setIsCartOpen(true);
  }, [cart, fetcher, pendingOperations]);

  const updateCartItem = useCallback((lineId: string, quantity: number) => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    
    if (!cartId || pendingOperations.updating.includes(lineId)) {
      return;
    }
    
    setIsLoading(true);
    setPendingOperations(prev => ({
      ...prev,
      updating: [...prev.updating, lineId]
    }));
    
    fetcher.submit(
      {
        action: "updateCart",
        cartId,
        lines: JSON.stringify([{
          id: lineId,
          quantity
        }])
      },
      { method: "post", action: "/api/cart" }
    );
  }, [fetcher, pendingOperations]);

  const removeCartItem = useCallback((lineId: string) => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    
    if (!cartId || pendingOperations.removing.includes(lineId)) {
      return;
    }
    
    setIsLoading(true);
    setPendingOperations(prev => ({
      ...prev,
      removing: [...prev.removing, lineId]
    }));
    
    fetcher.submit(
      {
        action: "updateCart",
        cartId,
        lines: JSON.stringify([{
          id: lineId,
          quantity: 0
        }])
      },
      { method: "post", action: "/api/cart" }
    );
  }, [fetcher, pendingOperations]);

  const isAddingItem = useCallback((merchandiseId: string) => {
    return pendingOperations.adding.includes(merchandiseId);
  }, [pendingOperations.adding]);

  const isUpdatingItem = useCallback((lineId: string) => {
    return pendingOperations.updating.includes(lineId);
  }, [pendingOperations.updating]);

  const isRemovingItem = useCallback((lineId: string) => {
    return pendingOperations.removing.includes(lineId);
  }, [pendingOperations.removing]);

  const openCart = useCallback(() => {
    refreshCart();
    setIsCartOpen(true);
  }, [refreshCart]);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const contextValue: CartContextType = {
    cart,
    isLoading,
    addToCart,
    updateCartItem,
    removeCartItem,
    isAddingItem,
    isUpdatingItem,
    isRemovingItem,
    openCart,
    closeCart,
    isCartOpen
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}