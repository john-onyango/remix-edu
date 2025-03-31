import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { CartInput, CartLineUpdateInput } from "types/storefront.types";
import { cartAddLine, createCart, updateCart } from "~/shopify/cart";

export type CartApiResponse = {
  cart: {
    id: string;
    checkoutUrl: string;
    items: Array<{
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string | null;
        productHandle: string | null;
        productTitle: string | null;
      };
    }>;
  } | null;
  error?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const cartId = url.searchParams.get("cartId");

  if (!cartId) {
    return Response.json({ cart: null });
  }

  try {
    const cart = await updateCart(cartId, []);
    
    if (!cart) {
      return Response.json({ 
        cart: null, 
        error: "Cart not found" 
      }, { status: 404 });
    }
    
    return Response.json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return Response.json({ 
      cart: null, 
      error: "Failed to fetch cart" 
    }, { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action") as string;

  try {
    switch (action) {
      case "createCart": {
        const linesStr = formData.get("lines") as string;
        
        if (!linesStr) {
          return Response.json({ 
            cart: null, 
            error: "Lines data is required" 
          }, { status: 400 });
        }
        
        const lines = JSON.parse(linesStr);
        const cartInput: CartInput = { lines };
        
        const cart = await createCart(cartInput);
        
        if (!cart) {
          return Response.json({ 
            cart: null, 
            error: "Failed to create cart" 
          }, { status: 500 });
        }
              
        return Response.json({ cart });
      }

      case "addToCart": {
        const cartId = formData.get("cartId") as string;
        const merchandiseId = formData.get("merchandiseId") as string;
        const quantity = parseInt(formData.get("quantity") as string, 10) || 1;
        
        if (!cartId || !merchandiseId) {
          return Response.json({ 
            cart: null, 
            error: "Cart ID and merchandise ID are required" 
          }, { status: 400 });
        }

        const cartInput: CartInput = { 
          lines: [{
            merchandiseId,
            quantity
          }]
        };
        
        const cart = await createCart(cartInput);
        
        if (!cart) {
          return Response.json({ 
            cart: null, 
            error: "Failed to add item to cart" 
          }, { status: 500 });
        }
        return Response.json({ cart });
      }

      case "updateCart": {
        const cartId = formData.get("cartId") as string;
        const linesStr = formData.get("lines") as string;
        
        if (!cartId || !linesStr) {
          return Response.json({ 
            cart: null, 
            error: "Cart ID and lines are required" 
          }, { status: 400 });
        }

        const lines = JSON.parse(linesStr) as CartLineUpdateInput[];
        
        try {
          const cart = await updateCart(cartId, lines);
          
          if (!cart) {
            return Response.json({ 
              cart: null, 
              error: "Failed to update cart" 
            }, { status: 500 });
          }
          
          return Response.json({ cart });
        } catch (error) {
          console.error("Error updating cart:", error);
          
          const errorMessage = error instanceof Error ? error.message : String(error);
          
          if (errorMessage.includes("Invalid global id")) {
            return Response.json({ 
              cart: null, 
              error: "Invalid cart line ID. The item may have been removed or the cart was modified elsewhere." 
            }, { status: 400 });
          }
          
          return Response.json({ 
            cart: null, 
            error: "Failed to update cart" 
          }, { status: 500 });
        }
      }
      case "addLineItem": {
        const cartId = formData.get("cartId") as string;
        const linesStr = formData.get("lines") as string;
        
        if (!cartId || !linesStr) {
          return Response.json({ 
            cart: null, 
            error: "Cart ID and lines are required" 
          }, { status: 400 });
        }

        const lines = JSON.parse(linesStr) as CartLineUpdateInput[];
        
        try {
          const cart = await cartAddLine(cartId, lines);
          
          if (!cart) {
            return Response.json({ 
              cart: null, 
              error: "Failed to update cart" 
            }, { status: 500 });
          }
          
          return Response.json({ cart });
        } catch (error) {
          console.error("Error updating cart:", error);
          
          const errorMessage = error instanceof Error ? error.message : String(error);
          
          if (errorMessage.includes("Invalid global id")) {
            return Response.json({ 
              cart: null, 
              error: "Invalid cart line ID. The item may have been removed or the cart was modified elsewhere." 
            }, { status: 400 });
          }
          
          return Response.json({ 
            cart: null, 
            error: "Failed to update cart" 
          }, { status: 500 });
        }
      }
      default:
        return Response.json({ 
          cart: null, 
          error: "Invalid action" 
        }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing cart action:", error);
    return Response.json({ 
      cart: null, 
      error: "An unexpected error occurred" 
    }, { status: 500 });
  }
}