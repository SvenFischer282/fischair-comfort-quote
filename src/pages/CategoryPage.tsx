import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/supabase/queries';
import { CATEGORY_MAP, Product } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const categories = {
  'tepelne-cerpadla': {
    title: 'Tepelné čerpadlá',
    description: 'Moderné tepelné čerpadlá pre efektívne vykurovanie vášho domu',
  },
  'klimatizacie': {
    title: 'Klimatizácie',
    description: 'Klimatizačné jednotky pre dokonalý komfort v každom ročnom období',
    subcategories: {
      'vnutorne': {
        title: 'Vnútorné jednotky',
        description: 'Vnútorné klimatizačné jednotky pre váš domov alebo kanceláriu.',
        kategoria_id: 302,
      },
      'vonkajsie': {
        title: 'Vonkajšie jednotky',
        description: 'Vonkajšie klimatizačné jednotky pre váš domov alebo kanceláriu.',
        kategoria_id: 202,
      },
    }
  },
  'rekuperacie': {
    title: 'Rekuperácie',
    description: 'Rekuperačné systémy pre zdravé vnútorné prostredie',
  },
};

const CategoryPage = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  if (!category || !categories[category as keyof typeof categories]) {
    return <Navigate to="/produkty" replace />;
  }

  const categoryData = categories[category as keyof typeof categories];
  const productType = CATEGORY_MAP[category];

  let pageTitle = categoryData.title;
  let pageDescription = categoryData.description;
  let kategoria_id: number | undefined = undefined;

  const isKlimatizacieBase = category === 'klimatizacie' && !subcategory;

  if (subcategory && 'subcategories' in categoryData && subcategory in categoryData.subcategories) {
    const subcategoryData = categoryData.subcategories[subcategory as keyof typeof categoryData.subcategories];
    pageTitle = subcategoryData.title;
    pageDescription = subcategoryData.description;
    kategoria_id = subcategoryData.kategoria_id;
  }

  useEffect(() => {
    if (isKlimatizacieBase) {
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByCategory(productType, kategoria_id);
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [productType, kategoria_id, isKlimatizacieBase]);

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
  
  const renderSubcategoryChoice = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <Link to="/produkty/klimatizacie/vnutorne" className="hover:scale-105 transition-transform">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Vnútorné jednotky</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Prezrite si našu ponuku vnútorných klimatizačných jednotiek.</p>
          </CardContent>
        </Card>
      </Link>
      <Link to="/produkty/klimatizacie/vonkajsie" className="hover:scale-105 transition-transform">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Vonkajšie jednotky</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Prezrite si našu ponuku vonkajších klimatizačných jednotiek.</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 sm:py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 text-foreground">
            {pageTitle}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground mb-10 sm:mb-16 max-w-3xl mx-auto">
            {pageDescription}
          </p>

          {loading ? (
            renderLoadingSkeleton()
          ) : isKlimatizacieBase ? (
            renderSubcategoryChoice()
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
