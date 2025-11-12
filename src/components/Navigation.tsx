import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/contexts/QuoteContext";
import logo from "@/assets/logo.jpeg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href || ''}
          ref={ref}
          className={cn(
            "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent/50 hover:text-primary focus:bg-accent/50 focus:text-primary group",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none group-hover:translate-x-0.5 transition-transform">{title}</div>
          {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            {children}
          </p>}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { items } = useQuote();

  const navLinks = [
    { path: "/stavebne-prace", label: "Stavebné práce" },
    { path: "/o-nas", label: "O nás" },
    { path: "/kontakt", label: "Kontakt" },
  ];
  
  const productCategories = [
    { path: "/produkty/tepelne-cerpadla", label: "Tepelné čerpadlá" },
    { path: "/produkty/rekuperacie", label: "Rekuperácie" },
    { path: "/produkty/klimatizacie/vnutorne", label: "Vnútorné jednotky" },
    { path: "/produkty/klimatizacie/vonkajsie", label: "Vonkajšie jednotky" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl z-50 border-b border-border/50 shadow-[0_1px_0_0_hsl(var(--border)/0.1)]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <img src={logo} alt="FISCHAIR" className="h-10 transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end flex-1 gap-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link 
                    to="/" 
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      location.pathname === '/' 
                        ? "text-primary bg-primary/10" 
                        : "text-foreground/70 hover:text-primary hover:bg-accent/50"
                    )}
                  >
                    Domov
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      "text-sm font-medium rounded-lg transition-all duration-200",
                      isActive('/produkty') 
                        ? "text-primary bg-primary/10" 
                        : "text-foreground/70 hover:text-primary hover:bg-accent/50"
                    )}
                  >
                    Produkty
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-2 p-3">
                      <ListItem href="/produkty/tepelne-cerpadla" title="Tepelné čerpadlá" />
                      <ListItem href="/produkty/rekuperacie" title="Rekuperácie" />
                      <li className="mt-2">
                        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Klimatizácie</p>
                        <ul className="mt-1 space-y-1">
                          <ListItem href="/produkty/klimatizacie/vnutorne" title="Vnútorné jednotky" />
                          <ListItem href="/produkty/klimatizacie/vonkajsie" title="Vonkajšie jednotky" />
                        </ul>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.path}>
                    <Link
                      to={link.path}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive(link.path) 
                          ? "text-primary bg-primary/10" 
                          : "text-foreground/70 hover:text-primary hover:bg-accent/50"
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Link to="/dopyt">
              <Button 
                variant="default" 
                size="sm" 
                className="relative shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Košík
                {items.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center border-2 border-background animate-scale-in">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-accent/50 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/50 animate-fade-in">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)} 
              className={cn(
                "block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                location.pathname === '/' 
                  ? "text-primary bg-primary/10" 
                  : "text-foreground/80 hover:bg-accent/50"
              )}
            >
              Domov
            </Link>
            <div className="space-y-1">
              <span className="block px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Produkty</span>
              <div className="pl-2 space-y-1">
                <Link 
                  to="/produkty" 
                  onClick={() => setIsOpen(false)} 
                  className={cn(
                    "block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive('/produkty') && !productCategories.some(c => isActive(c.path)) 
                      ? "text-primary bg-primary/10" 
                      : "text-foreground/80 hover:bg-accent/50"
                  )}
                >
                  Všetky produkty
                </Link>
                {productCategories.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive(link.path) 
                        ? "text-primary bg-primary/10" 
                        : "text-foreground/80 hover:bg-accent/50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive(link.path) 
                    ? "text-primary bg-primary/10" 
                    : "text-foreground/80 hover:bg-accent/50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/dopyt" onClick={() => setIsOpen(false)} className="block pt-2">
              <Button variant="default" size="sm" className="w-full relative shadow-sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Košík
                {items.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center border-2 border-background">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;