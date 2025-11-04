import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heatPumpImg from "@/assets/heat-pump.jpg";
import airConditioningImg from "@/assets/air-conditioning.jpg";
import recuperationImg from "@/assets/recuperation.jpg";
import reference1 from "@/assets/reference-1.jpg";
import reference2 from "@/assets/reference-2.jpg";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/supabaseClient";
import getProducts from "../lib/supabase/getProducts";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts("test");
      if (data) {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />

      {products.map((e) => (
        <h1 className="text-3xl text-red-600" key={e.id}>
          {e.name}
        </h1>
      ))}

      {/* Categories Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-foreground">
            Naše riešenia
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <CategoryCard
              title="Tepelné čerpadlá"
              description="Moderné a ekologické vykurovanie s minimálnymi prevádkovými nákladmi"
              image={heatPumpImg}
              link="/produkty/tepelne-cerpadla"
            />
            <CategoryCard
              title="Klimatizácie"
              description="Efektívne chladenie a vykurovanie pre maximálny komfort"
              image={airConditioningImg}
              link="/produkty/klimatizacie"
            />
            <CategoryCard
              title="Rekuperácie"
              description="Kvalitný vzduch a úspora energie rekuperáciou tepla"
              image={recuperationImg}
              link="/produkty/rekuperacie"
            />
          </div>
        </div>
      </section>

      {/* Why FISCHAIR Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-foreground">
            Prečo FISCHAIR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <Card>
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">
                  Skúsenosti
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Viac ako 15 rokov skúseností v oblasti vykurovacích a
                  klimatizačných systémov
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">
                  Kvalita
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Používame len prémiové značky a komponenty s dlhou životnosťou
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">
                  Spokojnosť
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Stovky spokojných zákazníkov a komplexný servis po celej SR
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-foreground">
            Naše referencie
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={reference1}
                alt="Referencia 1"
                className="w-full h-60 sm:h-80 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={reference2}
                alt="Referencia 2"
                className="w-full h-60 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Zanechajte kontakt – ozveme sa vám do 24 hodín
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
            Nezáväzná konzultácia a cenová ponuka na mieru
          </p>
          <Link to="/kontakt">
            <Button
              size="lg"
              variant="secondary"
              className="text-base sm:text-lg w-full sm:w-auto"
            >
              Kontaktovať nás
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
