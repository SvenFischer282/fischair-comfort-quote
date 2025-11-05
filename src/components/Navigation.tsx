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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="FISCHAIR" className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end flex-1">
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className="border-r px-4">
                    <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/' ? "text-primary" : "text-foreground/80")}>Domov</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="border-r px-4">
                    <NavigationMenuTrigger className={cn("text-sm font-medium transition-colors hover:text-primary", isActive('/produkty') ? "text-primary" : "text-foreground/80")}>Produkty</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[250px] gap-3 p-4">
                        <ListItem href="/produkty/tepelne-cerpadla" title="Tepelné čerpadlá" />
                        <ListItem href="/produkty/rekuperacie" title="Rekuperácie" />
                        <li>
                          <p className="p-3 pb-1 font-medium text-sm text-muted-foreground">Klimatizácie</p>
                          <ul className="pl-2">
                            <ListItem href="/produkty/klimatizacie/vnutorne" title="Vnútorné jednotky" />
                            <ListItem href="/produkty/klimatizacie/vonkajsie" title="Vonkajšie jednotky" />
                          </ul>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  {navLinks.map((link, index) => (
                    <NavigationMenuItem key={link.path} className={cn("px-4", index < navLinks.length - 1 ? "border-r" : "")}>
                      <Link
                        to={link.path}
                        className={cn("text-sm font-medium transition-colors hover:text-primary", isActive(link.path) ? "text-primary" : "text-foreground/80")}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              <div className="pl-4">
                <Link to="/dopyt">
                  <Button variant="default" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Košík
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link to="/" onClick={() => setIsOpen(false)} className={`block py-2 text-sm font-medium transition-colors ${location.pathname === '/' ? "text-primary" : "text-foreground/80"}`}>Domov</Link>
            <div>
              <span className="block py-2 text-sm font-medium text-primary">Produkty</span>
              <div className="pl-4 space-y-2">
                <Link to="/produkty" onClick={() => setIsOpen(false)} className={`block py-2 text-sm font-medium transition-colors ${isActive('/produkty') && !productCategories.some(c => isActive(c.path)) ? "text-primary" : "text-foreground/80"}`}>Všetky produkty</Link>
                {productCategories.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 text-sm font-medium transition-colors ${isActive(link.path) ? "text-primary" : "text-foreground/80"}`}
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
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(link.path) ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/dopyt" onClick={() => setIsOpen(false)}>
              <Button variant="default" size="sm" className="w-full relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Košík
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
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