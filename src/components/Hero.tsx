import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-home.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            FISCHAIR
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90">
            Profesionálne riešenia tepelných čerpadiel, klimatizácií a
            rekuperačných systémov
          </p>
          <Link to="/kontakt">
            <Button size="lg" className="text-base sm:text-lg w-full sm:w-auto">
              Požiadať o ponuku
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
