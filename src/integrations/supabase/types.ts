export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      kategoria: {
        Row: {
          kategoria_id: number
          nazov_kategorie: string
          parent_id: number
        }
        Insert: {
          kategoria_id: number
          nazov_kategorie: string
          parent_id: number
        }
        Update: {
          kategoria_id?: number
          nazov_kategorie?: string
          parent_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "kategoria_fk2"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "kategoria"
            referencedColumns: ["kategoria_id"]
          },
        ]
      }
      klimatizacie: {
        Row: {
          cena_bez_dph: number
          cena_s_dph: number
          chladivo: string
          dostupnost: string
          ener_trieda_chlad: string
          ener_trieda_kuren: string
          hlavny_obrazok: string
          hlu_vnutorna_db: number
          hlu_vonkajsia_db: number
          hmotnost_kg: number
          kategoria_id: number
          klima_pre_miestnost_m2: number
          kod_produktu: string
          komponent_typ: string
          nazov: string
          popis_dlhy: string
          popis_kratky: string
          produkt_id: number
          skladom: number
          system_typ: string
          typ_vnutornej: string
          vykon_chladenia_kw: number
          vykon_kurenia_kw: number
          wi_fi_ovladanie: boolean
          znacka: string
        }
        Insert: {
          cena_bez_dph: number
          cena_s_dph: number
          chladivo: string
          dostupnost: string
          ener_trieda_chlad: string
          ener_trieda_kuren: string
          hlavny_obrazok: string
          hlu_vnutorna_db: number
          hlu_vonkajsia_db: number
          hmotnost_kg: number
          kategoria_id: number
          klima_pre_miestnost_m2: number
          kod_produktu: string
          komponent_typ: string
          nazov: string
          popis_dlhy: string
          popis_kratky: string
          produkt_id: number
          skladom: number
          system_typ: string
          typ_vnutornej: string
          vykon_chladenia_kw: number
          vykon_kurenia_kw: number
          wi_fi_ovladanie: boolean
          znacka: string
        }
        Update: {
          cena_bez_dph?: number
          cena_s_dph?: number
          chladivo?: string
          dostupnost?: string
          ener_trieda_chlad?: string
          ener_trieda_kuren?: string
          hlavny_obrazok?: string
          hlu_vnutorna_db?: number
          hlu_vonkajsia_db?: number
          hmotnost_kg?: number
          kategoria_id?: number
          klima_pre_miestnost_m2?: number
          kod_produktu?: string
          komponent_typ?: string
          nazov?: string
          popis_dlhy?: string
          popis_kratky?: string
          produkt_id?: number
          skladom?: number
          system_typ?: string
          typ_vnutornej?: string
          vykon_chladenia_kw?: number
          vykon_kurenia_kw?: number
          wi_fi_ovladanie?: boolean
          znacka?: string
        }
        Relationships: [
          {
            foreignKeyName: "klimatizacie_fk9"
            columns: ["kategoria_id"]
            isOneToOne: false
            referencedRelation: "kategoria"
            referencedColumns: ["kategoria_id"]
          },
        ]
      }
      rekuperacie: {
        Row: {
          cena_bez_dph: number
          cena_s_dph: number
          dostupnost: string
          energeticka_trieda: string
          hladina_hluku_db: number
          hlavny_obrazok: string
          hmotnost_kg: number
          kategoria_id: number
          kod_produktu: string
          nazov: string
          popis_dlhy: string
          popis_kratky: string
          produkt_id: number
          skladom: number
          typ_rekuperacie: string
          ucinnost_percenta: number
          wi_fi_ovladanie: boolean
          znacka: string
        }
        Insert: {
          cena_bez_dph: number
          cena_s_dph: number
          dostupnost: string
          energeticka_trieda: string
          hladina_hluku_db: number
          hlavny_obrazok: string
          hmotnost_kg: number
          kategoria_id: number
          kod_produktu: string
          nazov: string
          popis_dlhy: string
          popis_kratky: string
          produkt_id: number
          skladom: number
          typ_rekuperacie: string
          ucinnost_percenta: number
          wi_fi_ovladanie: boolean
          znacka: string
        }
        Update: {
          cena_bez_dph?: number
          cena_s_dph?: number
          dostupnost?: string
          energeticka_trieda?: string
          hladina_hluku_db?: number
          hlavny_obrazok?: string
          hmotnost_kg?: number
          kategoria_id?: number
          kod_produktu?: string
          nazov?: string
          popis_dlhy?: string
          popis_kratky?: string
          produkt_id?: number
          skladom?: number
          typ_rekuperacie?: string
          ucinnost_percenta?: number
          wi_fi_ovladanie?: boolean
          znacka?: string
        }
        Relationships: [
          {
            foreignKeyName: "rekuperacie_fk12"
            columns: ["kategoria_id"]
            isOneToOne: false
            referencedRelation: "kategoria"
            referencedColumns: ["kategoria_id"]
          },
        ]
      }
      tepelnecerpadla: {
        Row: {
          cena_bez_dph: number
          cena_s_dph: number
          dostupnost: string
          filtracia: string
          hladina_hluku_db: number
          hlavny_obrazok: string
          hmotnost_kg: number
          kategoria_id: number
          kod_produktu: string
          montaz_typ: string
          nazov: string
          popis_dlhy: string
          popis_kratky: string
          priemer_potrubia: string
          produkt_id: number
          skladom: number
          typ_rekuperacie: string
          ucinnost_rekuperacie: number
          vzduchovy_vykon: number
          wi_fi_ovladanie: boolean
          znacka: string
        }
        Insert: {
          cena_bez_dph: number
          cena_s_dph: number
          dostupnost: string
          filtracia: string
          hladina_hluku_db: number
          hlavny_obrazok: string
          hmotnost_kg: number
          kategoria_id: number
          kod_produktu: string
          montaz_typ: string
          nazov: string
          popis_dlhy: string
          popis_kratky: string
          priemer_potrubia: string
          produkt_id: number
          skladom: number
          typ_rekuperacie: string
          ucinnost_rekuperacie: number
          vzduchovy_vykon: number
          wi_fi_ovladanie: boolean
          znacka: string
        }
        Update: {
          cena_bez_dph?: number
          cena_s_dph?: number
          dostupnost?: string
          filtracia?: string
          hladina_hluku_db?: number
          hlavny_obrazok?: string
          hmotnost_kg?: number
          kategoria_id?: number
          kod_produktu?: string
          montaz_typ?: string
          nazov?: string
          popis_dlhy?: string
          popis_kratky?: string
          priemer_potrubia?: string
          produkt_id?: number
          skladom?: number
          typ_rekuperacie?: string
          ucinnost_rekuperacie?: number
          vzduchovy_vykon?: number
          wi_fi_ovladanie?: boolean
          znacka?: string
        }
        Relationships: [
          {
            foreignKeyName: "tepelnecerpadla_fk15"
            columns: ["kategoria_id"]
            isOneToOne: false
            referencedRelation: "kategoria"
            referencedColumns: ["kategoria_id"]
          },
        ]
      }
      test: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
