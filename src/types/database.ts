// Database types matching the schema
export interface Kategoria {
  kategoria_id: number;
  nazov_kategorie: string;
  parent_id: number;
}

export interface Rekuperacie {
  produkt_id: number;
  typ_rekuperacie: string;
  ucinnost_percenta: number;
  hladina_hluku_db: number;
  energeticka_trieda: string;
  nazov: string;
  kod_produktu: string;
  popis_kratky: string;
  popis_dlhy: string;
  cena_bez_dph: number;
  cena_s_dph: number;
  dostupnost: string;
  kategoria_id: number;
  znacka: string;
  skladom: number;
  hlavny_obrazok: string;
  wi_fi_ovladanie: boolean;
  hmotnost_kg: number;
}

export interface Klimatizacie {
  produkt_id: number;
  klima_pre_miestnost_m2: number;
  nazov: string;
  kod_produktu: string;
  popis_kratky: string;
  popis_dlhy: string;
  cena_bez_dph: number;
  cena_s_dph: number;
  dostupnost: string;
  kategoria_id: number;
  skladom: number;
  hlavny_obrazok: string;
  wi_fi_ovladanie: boolean;
  hmotnost_kg: number;
  vykon_kurenia_kw: number;
  ener_trieda_chlad: string;
  hlu_vonkajsia_db: number;
  system_typ: string;
  komponent_typ: string;
  typ_vnutornej: string;
  vykon_chladenia_kw: number;
  ener_trieda_kuren: string;
  chladivo: string;
  hlu_vnutorna_db: number;
  znacka: string;
}

export interface TepelneCerpadla {
  produkt_id: number;
  typ_rekuperacie: string;
  montaz_typ: string;
  ucinnost_rekuperacie: number;
  vzduchovy_vykon: number;
  hladina_hluku_db: number;
  priemer_potrubia: string;
  filtracia: string;
  nazov: string;
  kod_produktu: string;
  popis_kratky: string;
  popis_dlhy: string;
  cena_bez_dph: number;
  cena_s_dph: number;
  dostupnost: string;
  kategoria_id: number;
  skladom: number;
  hlavny_obrazok: string;
  wi_fi_ovladanie: boolean;
  hmotnost_kg: number;
  znacka: string;
}

// Union type for all products
export type Product = Rekuperacie | Klimatizacie | TepelneCerpadla;

// Helper type to identify product type
export type ProductType = 'rekuperacie' | 'klimatizacie' | 'tepelnecerpadla';

// Category mapping
export const CATEGORY_MAP: Record<string, ProductType> = {
  'rekuperacie': 'rekuperacie',
  'klimatizacie': 'klimatizacie',
  'tepelne-cerpadla': 'tepelnecerpadla',
};

export const TABLE_TO_ROUTE: Record<ProductType, string> = {
  'rekuperacie': 'rekuperacie',
  'klimatizacie': 'klimatizacie',
  'tepelnecerpadla': 'tepelne-cerpadla',
};
