import { Link } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

type ProductCardProps = {
  product: {
    id: string;
    handle: string;
    title: string;
    image: string;
    altText: string;
    price: string;
    currency: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };
  return (
    <Card key={product.id} className="overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.altText}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full hover:bg-white"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <CardHeader className="p-4 pb-1">
        <Link to={`/product/${product.handle}`} key={product.id}>
          <CardTitle className="text-base">{product.title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-1">
        <p className="font-medium">
          {formatPrice(parseInt(product.price), "USD")}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <AddToCartButton
          merchandiseId={ product.id}
          available
          className="px-3 py-1.5 text-xs"
        />
      </CardFooter>
    </Card>
  );
}
