import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <img src={logo} alt="FISCHAIR" className="h-10 sm:h-12 mb-3 sm:mb-4" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              Profesionálne riešenia pre vykurovanie a klimatizáciu s úsporou energie.
            </p>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 text-foreground">Rýchle odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produkty" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produkty
                </Link>
              </li>
              <li>
                <Link to="/stavebne-prace" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Stavebné práce
                </Link>
              </li>
              <li>
                <Link to="/o-nas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 text-foreground">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-xs sm:text-sm text-muted-foreground">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>+421 XXX XXX XXX</span>
              </li>
              <li className="flex items-start text-xs sm:text-sm text-muted-foreground">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>info@fischair.sk</span>
              </li>
              <li className="flex items-start text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>Adresa firmy, Mesto</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FISCHAIR. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
