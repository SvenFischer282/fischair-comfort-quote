import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { useQuote, Product } from '@/contexts/QuoteContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { items, addToQuote } = useQuote();
  const isInQuote = items.some(item => item.id === product.id);

  const handleAddToQuote = () => {
    addToQuote(product);
    toast.success(`${product.name} bol pridaný do dopytu`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {isInQuote ? (
          <Button variant="secondary" className="w-full" disabled>
            <Check className="mr-2 h-4 w-4" />
            V zozname dopytu
          </Button>
        ) : (
          <Button variant="default" className="w-full" onClick={handleAddToQuote}>
            <Plus className="mr-2 h-4 w-4" />
            Pridať do dopytu
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
