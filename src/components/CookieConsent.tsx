import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    document.cookie = 'cookieConsent=accepted; max-age=31536000; path=/';
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    document.cookie = 'cookieConsent=rejected; max-age=31536000; path=/';
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t shadow-lg animate-in slide-in-from-bottom">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Používame cookies</h3>
            <p className="text-sm text-muted-foreground">
              Táto stránka používa cookies na zlepšenie vášho zážitku z prehliadania. Súhlasíte s použitím cookies?
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              onClick={rejectCookies}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              Odmietnuť
            </Button>
            <Button
              onClick={acceptCookies}
              size="sm"
              className="flex-1 sm:flex-none"
            >
              Prijať všetky
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
