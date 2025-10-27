import { useParams, Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, ArrowLeft, CheckCircle } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { products } from '@/data/products';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { items, addToQuote } = useQuote();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return <Navigate to="/produkty" replace />;
  }

  const isInQuote = items.some(item => item.id === product.id);

  const handleAddToQuote = () => {
    addToQuote(product);
    toast.success(`${product.name} bol pridaný do dopytu`);
  };

  // Technical specifications based on category
  const getSpecs = () => {
    if (product.category === 'heat-pumps') {
      return [
        { label: 'Výkon', value: product.name.match(/\d+kW/)?.[0] || 'N/A' },
        { label: 'Typ', value: 'Vzduch-voda' },
        { label: 'COP', value: '4.5' },
        { label: 'Energetická trieda', value: 'A+++' },
        { label: 'Hladina hluku', value: '45-55 dB(A)' },
        { label: 'Rozsah teplôt', value: '-20°C až +43°C' },
        { label: 'Záručná doba', value: '5 rokov' },
      ];
    } else if (product.category === 'air-conditioning') {
      return [
        { label: 'Výkon chladenia', value: product.name.match(/\d+\.?\d*kW/)?.[0] || 'N/A' },
        { label: 'Výkon vykurovania', value: product.name.match(/\d+\.?\d*kW/)?.[0] || 'N/A' },
        { label: 'Energetická trieda', value: 'A++' },
        { label: 'Hladina hluku', value: '19-42 dB(A)' },
        { label: 'WiFi ovládanie', value: 'Áno' },
        { label: 'Filtrácia vzduchu', value: 'Áno' },
        { label: 'Záručná doba', value: '3 roky' },
      ];
    } else {
      return [
        { label: 'Prietok vzduchu', value: product.name.match(/\d+ m³\/h/)?.[0] || 'N/A' },
        { label: 'Účinnosť', value: '90%' },
        { label: 'Filtrácia', value: 'F7/M5' },
        { label: 'Hladina hluku', value: '25-35 dB(A)' },
        { label: 'Ovládanie', value: 'Dotykový panel' },
        { label: 'Spôsob inštalácie', value: 'Stropný/nástenný' },
        { label: 'Záručná doba', value: '3 roky' },
      ];
    }
  };

  const specs = getSpecs();

  const features = [
    'Nízka spotreba energie',
    'Tichá prevádzka',
    'Jednoduché ovládanie',
    'Dlhá životnosť',
    'Ekologické riešenie',
    'Profesionálna montáž',
  ];

  const categoryNames = {
    'heat-pumps': 'Tepelné čerpadlá',
    'air-conditioning': 'Klimatizácie',
    'recuperation': 'Rekuperácie',
  };

  return (
    <div className="min-h-screen pt-20 bg-muted">
      <div className="container mx-auto px-4 py-8">
        <Link to={`/produkty/${product.category === 'heat-pumps' ? 'tepelne-cerpadla' : product.category === 'air-conditioning' ? 'klimatizacie' : 'rekuperacie'}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Späť na {categoryNames[product.category as keyof typeof categoryNames]}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="bg-background rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <Badge className="mb-4">{categoryNames[product.category as keyof typeof categoryNames]}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-foreground">Technické parametre</h2>
                <div className="space-y-3">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{spec.label}:</span>
                      <span className="font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-foreground">Výhody</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {isInQuote ? (
              <Button variant="secondary" size="lg" className="w-full" disabled>
                <Check className="mr-2 h-5 w-5" />
                V zozname dopytu
              </Button>
            ) : (
              <Button size="lg" className="w-full" onClick={handleAddToQuote}>
                <Plus className="mr-2 h-5 w-5" />
                Pridať do dopytu
              </Button>
            )}

            <p className="text-sm text-muted-foreground text-center mt-4">
              Cena na dopyt • Bezplatná konzultácia • Profesionálna montáž
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-6xl mx-auto mt-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Podrobný popis</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  {product.name} predstavuje moderné a efektívne riešenie pre váš dom alebo objekt. 
                  Zariadenie je navrhnuté s dôrazom na nízku spotrebu energie, vysokú účinnosť a dlhú životnosť.
                </p>
                <p className="mb-4">
                  Naša firma zabezpečuje komplexný servis - od odbornej konzultácie, cez výber vhodného 
                  riešenia až po profesionálnu montáž a pravidelnú údržbu. Všetky produkty dodávame s 
                  kompletnou zárukou a následným servisom.
                </p>
                <p>
                  Máte záujem o viac informácií alebo cenovú ponuku? Pridajte si produkt do dopytu a my 
                  sa vám ozveme s individuálnou ponukou prispôsobenou vašim potrebám.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
