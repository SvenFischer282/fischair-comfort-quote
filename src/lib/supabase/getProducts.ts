import { supabase } from "./supabaseClient";

async function getProducts(where: string) {
  const { data, error } = await supabase.from(where).select("*");
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    return data;
    console.log("Fetched data:", data);
  }
}
export default getProducts;
