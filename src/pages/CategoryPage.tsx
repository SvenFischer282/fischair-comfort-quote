import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/supabase/queries';
import { CATEGORY_MAP, Product, ProductType, Klimatizacie } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categories = {
  'tepelne-cerpadla': {
    title: 'Tepelné čerpadlá',
    description: 'Moderné tepelné čerpadlá pre efektívne vykurovanie vášho domu',
  },
  'klimatizacie': {
    title: 'Klimatizácie',
    description: 'Klimatizačné jednotky pre dokonalý komfort v každom ročnom období',
  },
  'rekuperacie': {
    title: 'Rekuperácie',
    description: 'Rekuperačné systémy pre zdravé vnútorné prostredie',
  },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  if (!category || !categories[category as keyof typeof categories]) {
    return <Navigate to="/produkty" replace />;
  }

  const categoryData = categories[category as keyof typeof categories];
  const productType = CATEGORY_MAP[category];
  const isKlimatizacie = productType === 'klimatizacie';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByCategory(productType);
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [productType]);

  // Filter klimatizacie by komponent_typ
  const getFilteredProducts = (filter?: 'vnutorna' | 'vonkajsia') => {
    if (!isKlimatizacie || !filter) return products;
    
    return (products as Klimatizacie[]).filter(
      p => p.komponent_typ.toLowerCase().includes(filter)
    );
  };

  const vnutorneJednotky = isKlimatizacie ? getFilteredProducts('vnutorna') : [];
  const vonkajsieJednotky = isKlimatizacie ? getFilteredProducts('vonkajsia') : [];
  const hasVnutorne = vnutorneJednotky.length > 0;
  const hasVonkajsie = vonkajsieJednotky.length > 0;

  const renderProductGrid = (productsList: Product[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {productsList.map(product => (
        <ProductCard 
          key={product.produkt_id} 
          product={product} 
          productType={productType}
        />
      ))}
    </div>
  );

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <p className="text-lg text-muted-foreground">
        Momentálne nemáme žiadne produkty v tejto kategórii.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 sm:py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 text-foreground">
            {categoryData.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground mb-10 sm:mb-16 max-w-3xl mx-auto">
            {categoryData.description}
          </p>

          {loading ? (
            renderLoadingSkeleton()
          ) : isKlimatizacie && (hasVnutorne || hasVonkajsie) ? (
            <Tabs defaultValue="vnutorne" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                {hasVnutorne && (
                  <TabsTrigger value="vnutorne">
                    Vnútorné jednotky ({vnutorneJednotky.length})
                  </TabsTrigger>
                )}
                {hasVonkajsie && (
                  <TabsTrigger value="vonkajsie">
                    Vonkajšie jednotky ({vonkajsieJednotky.length})
                  </TabsTrigger>
                )}
              </TabsList>
              
              {hasVnutorne && (
                <TabsContent value="vnutorne">
                  {vnutorneJednotky.length > 0 ? renderProductGrid(vnutorneJednotky) : renderEmptyState()}
                </TabsContent>
              )}
              
              {hasVonkajsie && (
                <TabsContent value="vonkajsie">
                  {vonkajsieJednotky.length > 0 ? renderProductGrid(vonkajsieJednotky) : renderEmptyState()}
                </TabsContent>
              )}
            </Tabs>
          ) : products.length > 0 ? (
            renderProductGrid(products)
          ) : (
            renderEmptyState()
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
