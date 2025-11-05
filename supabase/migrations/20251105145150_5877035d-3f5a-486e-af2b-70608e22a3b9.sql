-- Enable Row Level Security on product tables
ALTER TABLE public.klimatizacie ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rekuperacie ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tepelnecerpadla ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kategoria ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users on klimatizacie"
ON public.klimatizacie
FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users on rekuperacie"
ON public.rekuperacie
FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users on tepelnecerpadla"
ON public.tepelnecerpadla
FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users on kategoria"
ON public.kategoria
FOR SELECT
USING (true);