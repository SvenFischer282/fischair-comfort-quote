import { useNavigate } from 'react-router-dom';
import CategoryCard from '@/components/CategoryCard';
import heatPumpImg from '@/assets/heat-pump.jpg';
import airConditioningImg from '@/assets/air-conditioning.jpg';
import recuperationImg from '@/assets/recuperation.jpg';

const Products = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 sm:py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 text-foreground">
            Naše produkty
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground mb-10 sm:mb-16 max-w-3xl mx-auto">
            Vyberte si z našej ponuky moderných riešení pre vykurovanie, chladenie a vetranie
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <CategoryCard
              title="Tepelné čerpadlá"
              description="Ekologické a úsporné vykurovanie pre váš dom"
              image={heatPumpImg}
              link="/produkty/tepelne-cerpadla"
            />
            <CategoryCard
              title="Klimatizácie"
              description="Dokonalý komfort v lete i zime"
              image={airConditioningImg}
              link="/produkty/klimatizacie"
            />
            <CategoryCard
              title="Rekuperácie"
              description="Čerstvý vzduch s úsporou energie"
              image={recuperationImg}
              link="/produkty/rekuperacie"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
