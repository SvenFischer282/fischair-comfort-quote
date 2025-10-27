import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'Meno je povinné')
    .max(100, 'Meno môže mať maximálne 100 znakov'),
  email: z.string()
    .trim()
    .min(1, 'E-mail je povinný')
    .email('Neplatný formát e-mailovej adresy')
    .max(255, 'E-mail môže mať maximálne 255 znakov'),
  phone: z.string()
    .trim()
    .max(20, 'Telefón môže mať maximálne 20 znakov')
    .refine((val) => !val || /^(\+421|00421|0)?[0-9]{9}$/.test(val), {
      message: 'Neplatný formát telefónneho čísla (očakávaný formát: +421XXXXXXXXX)',
    })
    .transform(val => val && val.replace(/^(00421|0)/, '+421'))
    .optional(),
  message: z.string()
    .trim()
    .min(1, 'Správa je povinná')
    .max(1000, 'Správa môže mať maximálne 1000 znakov'),
  wantsSiteVisit: z.boolean(),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    wantsSiteVisit: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = contactFormSchema.parse(formData);
      
      // Here you would send the validated data to your backend
      // DO NOT log sensitive user data in production
      
      toast.success('Ďakujeme za správu! Ozveme sa vám čoskoro.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        wantsSiteVisit: false,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error('Nastala chyba pri spracovaní formulára');
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-muted">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
          Kontakt
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Máte otázky alebo záujem o našu ponuku? Neváhajte nás kontaktovať
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">Telefón</h3>
                    <p className="text-muted-foreground">+421 XXX XXX XXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">E-mail</h3>
                    <p className="text-muted-foreground">info@fischair.sk</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">Adresa</h3>
                    <p className="text-muted-foreground">
                      Ulica 123<br />
                      012 34 Mesto<br />
                      Slovensko
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">Otváracie hodiny</h3>
                    <p className="text-muted-foreground">
                      Po - Pia: 8:00 - 17:00<br />
                      So - Ne: Zatvorené
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Mapa</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Kontaktný formulár</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Meno a priezvisko *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefón</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Správa *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="siteVisit"
                    checked={formData.wantsSiteVisit}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, wantsSiteVisit: checked as boolean })
                    }
                  />
                  <Label htmlFor="siteVisit" className="cursor-pointer">
                    Mám záujem o obhliadku
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Odoslať správu
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
  );
};

export default Contact;
