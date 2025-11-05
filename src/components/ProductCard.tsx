import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuote } from "@/contexts/QuoteContext";
import { toast } from "sonner";
import { Product as DBProduct, ProductType, TABLE_TO_ROUTE } from "@/types/database";

interface ProductCardProps {
  product: DBProduct;
  productType: ProductType;
}

const ProductCard = ({ product, productType }: ProductCardProps) => {
  const { items, addToQuote } = useQuote();
  
  const isInQuote = items.some(item => 
    item.id === `${productType}-${product.produkt_id}`
  );

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToQuote({
      id: `${productType}-${product.produkt_id}`,
      name: product.nazov,
      category: productType,
      image: product.hlavny_obrazok || '/placeholder.svg',
      description: product.popis_kratky,
    });
    
    toast.success(`${product.nazov} bol pridaný do dopytu`);
  };

  const productLink = `/produkt/${productType}/${product.produkt_id}`;

  return (
    <Link to={productLink}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full flex flex-col">
        <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
          <img
            src={product.hlavny_obrazok || '/placeholder.svg'}
            alt={product.nazov}
            className="w-full h-full object-cover"
          />
          {product.skladom > 0 && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
              Skladom
            </Badge>
          )}
        </div>
        <CardContent className="p-4 sm:p-6 flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground line-clamp-2">
              {product.nazov}
            </h3>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mb-3 line-clamp-2">
            {product.popis_kratky}
          </p>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-3">
            <Badge variant="outline">{product.znacka}</Badge>
            <Badge variant="outline">{product.dostupnost}</Badge>
            {product.wi_fi_ovladanie && (
              <Badge variant="outline">WiFi</Badge>
            )}
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="text-lg font-bold text-primary">{product.cena_s_dph.toFixed(2)} €</span>
            <span className="text-sm text-muted-foreground">s DPH</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 pt-0">
          {isInQuote ? (
            <Button className="w-full" variant="secondary" disabled>
              <Check className="mr-2 h-4 w-4" />
              V košíku
            </Button>
          ) : (
            <Button className="w-full" onClick={handleAddToQuote}>
              <Plus className="mr-2 h-4 w-4" />
              Pridať do dopytu
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
