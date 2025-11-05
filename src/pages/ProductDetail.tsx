import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, ArrowLeft, CheckCircle, Minus } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { toast } from 'sonner';
import { getProductById } from '@/lib/supabase/queries';
import { Product, ProductType, TABLE_TO_ROUTE, Klimatizacie, TepelneCerpadla, Rekuperacie } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const { items, addToQuote, updateQuantity, removeFromQuote } = useQuote();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!type || !id) return;
      
      setLoading(true);
      const data = await getProductById(type as ProductType, parseInt(id));
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [type, id]);

  if (!type || !id) {
    return <Navigate to="/produkty" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-muted">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <Skeleton className="h-96" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/produkty" replace />;
  }

  const productType = type as ProductType;
  const quoteItem = items.find(item => item.id === `${productType}-${product.produkt_id}`);
  const isInQuote = !!quoteItem;

  const handleAddToQuote = () => {
    addToQuote({
      id: `${productType}-${product.produkt_id}`,
      name: product.nazov,
      category: productType,
      image: product.hlavny_obrazok || '/placeholder.svg',
      description: product.popis_kratky,
    });
    toast.success(`${product.nazov} bol pridaný do dopytu`);
  };

  const productId = `${productType}-${product.produkt_id}`;

  const handleIncrement = () => {
    if (quoteItem) {
      updateQuantity(productId, quoteItem.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quoteItem) {
      if (quoteItem.quantity === 1) {
        removeFromQuote(productId);
        toast.info(`${product.nazov} bol odstránený z dopytu`);
      } else {
        updateQuantity(productId, quoteItem.quantity - 1);
      }
    }
  };

  // Technical specifications based on product type
  const getSpecs = () => {
    if (productType === 'tepelnecerpadla') {
      const tp = product as TepelneCerpadla;
      return [
        { label: 'Typ montáže', value: tp.montaz_typ },
        { label: 'Účinnosť rekuperácie', value: `${tp.ucinnost_rekuperacie}%` },
        { label: 'Vzduchový výkon', value: `${tp.vzduchovy_vykon} m³/h` },
        { label: 'Hladina hluku', value: `${tp.hladina_hluku_db} dB` },
        { label: 'Priemer potrubia', value: tp.priemer_potrubia },
        { label: 'Filtrácia', value: tp.filtracia },
        { label: 'Hmotnosť', value: `${tp.hmotnost_kg} kg` },
        { label: 'WiFi ovládanie', value: tp.wi_fi_ovladanie ? 'Áno' : 'Nie' },
      ];
    } else if (productType === 'klimatizacie') {
      const kl = product as Klimatizacie;
      return [
        { label: 'Pre miestnosť', value: `${kl.klima_pre_miestnost_m2} m²` },
        { label: 'Výkon chladenia', value: `${kl.vykon_chladenia_kw} kW` },
        { label: 'Výkon kúrenia', value: `${kl.vykon_kurenia_kw} kW` },
        { label: 'Energia trieda chladenie', value: kl.ener_trieda_chlad },
        { label: 'Energia trieda kúrenie', value: kl.ener_trieda_kuren },
        { label: 'Hluk vonkajšia', value: `${kl.hlu_vonkajsia_db} dB` },
        { label: 'Hluk vnútorná', value: `${kl.hlu_vnutorna_db} dB` },
        { label: 'Systém typ', value: kl.system_typ },
        { label: 'Typ vnútornej', value: kl.typ_vnutornej },
        { label: 'Chladivo', value: kl.chladivo },
        { label: 'Hmotnosť', value: `${kl.hmotnost_kg} kg` },
        { label: 'WiFi ovládanie', value: kl.wi_fi_ovladanie ? 'Áno' : 'Nie' },
      ];
    } else {
      const rek = product as Rekuperacie;
      return [
        { label: 'Typ', value: rek.typ_rekuperacie },
        { label: 'Účinnosť', value: `${rek.ucinnost_percenta}%` },
        { label: 'Hladina hluku', value: `${rek.hladina_hluku_db} dB` },
        { label: 'Energetická trieda', value: rek.energeticka_trieda },
        { label: 'Hmotnosť', value: `${rek.hmotnost_kg} kg` },
        { label: 'WiFi ovládanie', value: rek.wi_fi_ovladanie ? 'Áno' : 'Nie' },
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

  const categoryNames: Record<ProductType, string> = {
    'tepelnecerpadla': 'Tepelné čerpadlá',
    'klimatizacie': 'Klimatizácie',
    'rekuperacie': 'Rekuperácie',
  };

  const categoryRoute = TABLE_TO_ROUTE[productType];

  return (
    <div className="min-h-screen pt-20 bg-muted">
      <div className="container mx-auto px-4 py-8">
        <Link to={`/produkty/${categoryRoute}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Späť na {categoryNames[productType]}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="bg-background rounded-lg overflow-hidden shadow-lg h-64 sm:h-80 lg:h-auto">
            <img 
              src={product.hlavny_obrazok || '/placeholder.svg'} 
              alt={product.nazov}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="flex gap-2 mb-3">
              <Badge>{categoryNames[productType]}</Badge>
              <Badge variant="outline">{product.znacka}</Badge>
              {product.skladom > 0 && (
                <Badge variant="secondary">Skladom: {product.skladom} ks</Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
              {product.nazov}
            </h1>
            <p className="text-sm text-muted-foreground mb-2">
              Kód produktu: {product.kod_produktu}
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
              {product.popis_kratky}
            </p>
            <div className="flex gap-4 mb-4 md:mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Cena bez DPH</p>
                <p className="text-xl font-bold text-foreground">{product.cena_bez_dph.toFixed(2)} €</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cena s DPH</p>
                <p className="text-2xl font-bold text-primary">{product.cena_s_dph.toFixed(2)} €</p>
              </div>
            </div>
            <Badge variant="outline" className="mb-4">{product.dostupnost}</Badge>

            <Card className="mb-4 md:mb-6">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground">Technické parametre</h2>
                <div className="space-y-2 md:space-y-3">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border last:border-0 text-sm md:text-base">
                      <span className="text-muted-foreground">{spec.label}:</span>
                      <span className="font-medium text-foreground text-right ml-4">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-4 md:mb-6">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground">Výhody</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                      <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {isInQuote ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-4 bg-muted/50 p-4 rounded-lg">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleDecrement}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="text-center min-w-[80px]">
                    <div className="text-2xl font-bold text-foreground">{quoteItem?.quantity}</div>
                    <div className="text-xs text-muted-foreground">v košíku</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleIncrement}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Link to="/dopyt">
                  <Button variant="default" size="lg" className="w-full">
                    <Check className="mr-2 h-5 w-5" />
                    Prejsť do košíka
                  </Button>
                </Link>
              </div>
            ) : (
              <Button size="lg" className="w-full" onClick={handleAddToQuote}>
                <Plus className="mr-2 h-5 w-5" />
                Pridať do dopytu
              </Button>
            )}

            <p className="text-xs md:text-sm text-muted-foreground text-center mt-3 md:mt-4">
              Cena na dopyt • Bezplatná konzultácia • Profesionálna montáž
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-6xl mx-auto mt-8 md:mt-12">
          <Card>
            <CardContent className="p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Podrobný popis</h2>
              <div className="prose max-w-none text-muted-foreground text-sm md:text-base">
                <div className="whitespace-pre-wrap">
                  {product.popis_dlhy}
                </div>
                <p className="mt-4">
                  Naša firma zabezpečuje komplexný servis - od odbornej konzultácie, cez výber vhodného 
                  riešenia až po profesionálnu montáž a pravidelnú údržbu. Všetky produkty dodávame s 
                  kompletnou zárukou a následným servisom.
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
