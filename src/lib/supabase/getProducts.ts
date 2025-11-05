import { supabase } from "@/integrations/supabase/client";

type AllowedTable = 'test' | 'tepelnecerpadla' | 'klimatizacie' | 'rekuperacie' | 'kategoria';

async function getProducts(tableName: AllowedTable) {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error) {
    if (import.meta.env.DEV) {
      console.error("Error fetching data:", error);
    }
    return null;
  }
  return data;
}
export default getProducts;
