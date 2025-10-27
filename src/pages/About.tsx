import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Target, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
              O nás
            </h1>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Profesionálne riešenia pre komfortné a energeticky úsporné bývanie
            </p>

            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-muted-foreground leading-relaxed mb-6">
                FISCHAIR je rodinná firma s viac ako 15-ročnými skúsenosťami v oblasti 
                vykurovacích a klimatizačných systémov. Špecializujeme sa na dodávku a montáž 
                tepelných čerpadiel, klimatizácií a rekuperačných jednotiek.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Naším cieľom je priniesť našim zákazníkom nielen moderné technológie, ale aj 
                komplexný servis od konzultácie, cez projekt až po realizáciu a pravidelnú 
                údržbu. Všetky naše riešenia sú navrhnuté s dôrazom na efektívnosť, spoľahlivosť 
                a úsporu energií.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Skúsenosti</h3>
                  <p className="text-muted-foreground">
                    Viac ako 15 rokov na trhu a stovky úspešne realizovaných projektov
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Tím expertov</h3>
                  <p className="text-muted-foreground">
                    Certifikovaní technici a inžinieri s hlbokými znalosťami HVAC systémov
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Kvalita</h3>
                  <p className="text-muted-foreground">
                    Používame výhradne prémiové značky s dlhou životnosťou a zárukou
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Prístup</h3>
                  <p className="text-muted-foreground">
                    Individuálny prístup ku každému zákazníkovi a komplexný servis
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
