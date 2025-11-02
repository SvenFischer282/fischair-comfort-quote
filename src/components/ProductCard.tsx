import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Check, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuote, Product } from '@/contexts/QuoteContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { items, addToQuote } = useQuote();
  const isInQuote = items.some(item => item.id === product.id);

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    addToQuote(product);
    toast.success(`${product.name} bol pridaný do dopytu`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/produkt/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Eye className="h-8 w-8 text-white" />
          </div>
        </div>
      </Link>
      <CardContent className="p-4 sm:p-6">
        <Link to={`/produkt/${product.id}`}>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-0 flex-col sm:flex-row gap-2">
        <Link to={`/produkt/${product.id}`} className="w-full sm:flex-1">
          <Button variant="outline" className="w-full">
            Detail
          </Button>
        </Link>
        {isInQuote ? (
          <Button variant="secondary" className="w-full sm:flex-1" disabled>
            <Check className="mr-2 h-4 w-4" />
            V dopytu
          </Button>
        ) : (
          <Button variant="default" className="w-full sm:flex-1" onClick={handleAddToQuote}>
            <Plus className="mr-2 h-4 w-4" />
            Pridať
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
