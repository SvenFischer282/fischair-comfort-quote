import { useState } from "react";
import { useQuote } from "@/contexts/QuoteContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const quoteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Meno je povinné")
    .max(100, "Meno môže mať maximálne 100 znakov"),
  phone: z
    .string()
    .trim()
    .min(1, "Telefón je povinný")
    .regex(
      /^(\+421|00421|0)?[0-9]{9}$/,
      "Neplatný formát telefónneho čísla (očakávaný formát: +421XXXXXXXXX)"
    )
    .transform((val) => val.replace(/^(00421|0)/, "+421")),
  email: z
    .string()
    .trim()
    .min(1, "E-mail je povinný")
    .email("Neplatný formát e-mailovej adresy")
    .max(255, "E-mail môže mať maximálne 255 znakov"),
  note: z
    .string()
    .trim()
    .max(1000, "Poznámka môže mať maximálne 1000 znakov")
    .optional(),
});

const Quote = () => {
  const { items, removeFromQuote, updateQuantity, clearQuote } = useQuote();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = quoteFormSchema.parse(formData);

      const payload = {
        ...validatedData,
        items, // Include the items from the quote context
      };

      // --- START: CORRECTED Backend Logic ---

      
      const SUPABASE_FUNCTION_URL =
        "https://jzxtodqqgwqdykvtpcoy.supabase.co/functions/v1/send_quote";
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!SUPABASE_ANON_KEY || !import.meta.env.VITE_SUPABASE_URL) {
        throw new Error("Chýbajú konfiguračné premenné Supabase!");
      }

      const response = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Provides the error from the Edge Function if possible
        throw new Error(
          errorData.error || "Odoslanie dopytu zlyhalo: Neznáma chyba servera"
        );
      }

      // --- END: CORRECTED Backend Logic ---

      toast.success("Ďakujeme! Ozveme sa vám s cenovou ponukou.");
      clearQuote();
      setFormData({ name: "", phone: "", email: "", note: "" });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        // Handle custom fetch error with a more specific fallback
        toast.error(error.message || "Nastala chyba pri spracovaní formulára");
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            Váš zoznam dopytu je prázdny
          </h1>
          <p className="text-muted-foreground mb-8">
            Pridajte produkty, o ktoré máte záujem
          </p>
          <Button onClick={() => navigate("/produkty")}>
            Prejsť na produkty
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-muted">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          Zoznam dopytu
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Vybrané produkty
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromQuote(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6 text-foreground">
                  Kontaktné údaje
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Meno a priezvisko *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefón *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="note">Poznámka / otázky</Label>
                    <Textarea
                      id="note"
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                      rows={4}
                      placeholder="Napríklad: Mám záujem o obhliadku, kedy by bola montáž..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Odoslať dopyt
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    * Povinné polia
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
