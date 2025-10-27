import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import constructionImg from '@/assets/construction.jpg';

const Construction = () => {
  const services = [
    'Montáž tepelných čerpadiel',
    'Inštalácia klimatizačných systémov',
    'Montáž rekuperačných jednotiek',
    'Stavebné úpravy a príprava priestorov',
    'Rekonštrukcie vykurovacích systémov',
    'Servis a údržba zariadení',
  ];

  return (
    <div className="min-h-screen pt-20">
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${constructionImg})`,
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stavebné práce
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Kompletné riešenie od projektu po montáž a servis
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Naše služby
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {services.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{service}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Prečo si vybrať nás?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Certifikovaní technici s dlhoročnými skúsenosťami</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Kompletný servis od konzultácie po záverečnú montáž</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Záruka na všetky práce a použité materiály</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Bezplatná obhliadka a konzultácia</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center mt-12">
              <Link to="/kontakt">
                <Button size="lg">
                  Požiadať o cenovú ponuku
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Construction;
