import heatPumpImg from '@/assets/heat-pump.jpg';
import airConditioningImg from '@/assets/air-conditioning.jpg';
import recuperationImg from '@/assets/recuperation.jpg';
import { Product } from '@/contexts/QuoteContext';

export const products: Product[] = [
  {
    id: 'hp-1',
    name: 'Tepelné čerpadlo vzduch-voda 8kW',
    category: 'heat-pumps',
    image: heatPumpImg,
    description: 'Efektívne tepelné čerpadlo pre rodinné domy. COP až 4.5, ideálne pre novostavby.',
  },
  {
    id: 'hp-2',
    name: 'Tepelné čerpadlo vzduch-voda 12kW',
    category: 'heat-pumps',
    image: heatPumpImg,
    description: 'Výkonné riešenie pre väčšie objekty. Nízke prevádzkové náklady, tichá prevádzka.',
  },
  {
    id: 'hp-3',
    name: 'Tepelné čerpadlo vzduch-voda 16kW',
    category: 'heat-pumps',
    image: heatPumpImg,
    description: 'Prémiové tepelné čerpadlo pre veľké rodinné domy a objekty.',
  },
  {
    id: 'ac-1',
    name: 'Klimatizácia SPLIT 2.5kW',
    category: 'air-conditioning',
    image: airConditioningImg,
    description: 'Tichá a úsporná klimatizácia do spálne alebo detskej izby. Energetická trieda A++.',
  },
  {
    id: 'ac-2',
    name: 'Klimatizácia SPLIT 3.5kW',
    category: 'air-conditioning',
    image: airConditioningImg,
    description: 'Univerzálne riešenie pre obývacie priestory. WiFi ovládanie, nočný režim.',
  },
  {
    id: 'ac-3',
    name: 'Klimatizácia MULTI SPLIT 2x2.5kW',
    category: 'air-conditioning',
    image: airConditioningImg,
    description: 'Klimatizácia pre dve miestnosti s jednou vonkajšou jednotkou.',
  },
  {
    id: 'rec-1',
    name: 'Rekuperácia 250 m³/h',
    category: 'recuperation',
    image: recuperationImg,
    description: 'Energeticky úsporná rekuperácia pre byty a menšie domy. Účinnosť až 90%.',
  },
  {
    id: 'rec-2',
    name: 'Rekuperácia 350 m³/h',
    category: 'recuperation',
    image: recuperationImg,
    description: 'Ideálne riešenie pre rodinné domy. Filtrácia vzduchu, zníženie tepelných strát.',
  },
  {
    id: 'rec-3',
    name: 'Rekuperácia 500 m³/h',
    category: 'recuperation',
    image: recuperationImg,
    description: 'Profesionálna rekuperácia pre väčšie objekty a komerčné priestory.',
  },
];

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};
