import { supabase } from "@/integrations/supabase/client";
import { Rekuperacie, Klimatizacie, TepelneCerpadla, ProductType, Kategoria } from "@/types/database";

export async function getProductsByCategory(table: ProductType, kategoria_id?: number) {
  let query = supabase
    .from(table)
    .select("*")
    .order('nazov', { ascending: true });

  if (kategoria_id) {
    query = query.eq('kategoria_id', kategoria_id);
  }

  const { data, error } = await query;

  if (error) {
    if (import.meta.env.DEV) {
      console.error(`Error fetching ${table}:`, error);
    }
    return null;
  }

  return data as Rekuperacie[] | Klimatizacie[] | TepelneCerpadla[];
}

export async function getProductById(table: ProductType, id: number) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq('produkt_id', id)
    .maybeSingle();

  if (error) {
    if (import.meta.env.DEV) {
      console.error(`Error fetching product ${id} from ${table}:`, error);
    }
    return null;
  }

  return data as Rekuperacie | Klimatizacie | TepelneCerpadla | null;
}

export async function getAllProducts() {
  const [rekuperacie, klimatizacie, tepelneCerpadla] = await Promise.all([
    getProductsByCategory('rekuperacie'),
    getProductsByCategory('klimatizacie'),
    getProductsByCategory('tepelnecerpadla'),
  ]);

  return {
    rekuperacie: rekuperacie || [],
    klimatizacie: klimatizacie || [],
    tepelnecerpadla: tepelneCerpadla || [],
  };
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('kategoria')
    .select("*")
    .order('nazov_kategorie', { ascending: true });

  if (error) {
    if (import.meta.env.DEV) {
      console.error("Error fetching categories:", error);
    }
    return null;
  }

  return data as Kategoria[];
}

