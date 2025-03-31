import { useState } from "react";
import { useCart } from "~/context/usecartcontext";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type AddToCartButtonProps = {
  merchandiseId: string;
  available?: boolean;
  className?: string;
};

export default function AddToCartButton({
  merchandiseId,
  available = true,
  className = "",
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isAddingItem } = useCart();

  const isAdding = isAddingItem(merchandiseId);

  const handleAddToCart = () => {
    addToCart(merchandiseId, quantity);
  };

  return (
    <div className="flex items-center flex-wrap gap-4">
      <div className="flex items-center space-x-4">
        <Select onValueChange={(value)=>setQuantity(parseInt(value))} defaultValue="1">
          <SelectGroup className="flex items-center space-x-2">
            <SelectLabel> Quantity</SelectLabel>
            <SelectTrigger className="w-max">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <SelectItem
                  key={value}
                  value={`${value}`}
                >
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      <Button
        type="button"
        onClick={handleAddToCart}
        disabled={isAdding || !available}
        className={`relative flex items-center justify-center 
          ${available ? "" : "cursor-not-allowed"} 
          ${isAdding ? "opacity-75" : ""}
          ${className}`}
      >
        {isAdding ? (
          <>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
            <span className="opacity-0">Adding to Cart</span>
          </>
        ) : !available ? (
          "Out of Stock"
        ) : (
          "Add to Cart"
        )}
      </Button>
    </div>
  );
}
