import { useParams, Navigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/data/products';

const categories = {
  'tepelne-cerpadla': {
    title: 'Tepelné čerpadlá',
    description: 'Moderné tepelné čerpadlá pre efektívne vykurovanie vášho domu',
    category: 'heat-pumps',
  },
  'klimatizacie': {
    title: 'Klimatizácie',
    description: 'Klimatizačné jednotky pre dokonalý komfort v každom ročnom období',
    category: 'air-conditioning',
  },
  'rekuperacie': {
    title: 'Rekuperácie',
    description: 'Rekuperačné systémy pre zdravé vnútorné prostredie',
    category: 'recuperation',
  },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  if (!category || !categories[category as keyof typeof categories]) {
    return <Navigate to="/produkty" replace />;
  }

  const categoryData = categories[category as keyof typeof categories];
  const products = getProductsByCategory(categoryData.category);

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
