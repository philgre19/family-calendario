
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AppSettings {
  id?: string;
  user_id?: string;
  sidebar_color?: string;
  dashboard_color?: string;
  notifications_enabled?: boolean;
  notification_events?: string[]; 
  gamification_enabled?: boolean;
  quest_style?: string;
  dashboard_layout?: string;
}

export function useSettings(userId: string) {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    fetchSettings();
  }, [userId]);

  async function fetchSettings() {
    try {
      setLoading(true);
      setError(null);
      
      // D'abord, essayons de récupérer les paramètres existants
      const { data, error } = await supabase
        .from("app_settings")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle(); // Utilisation de maybeSingle au lieu de single

      if (error) throw error;
      
      // Si aucune donnée n'existe, créons-en
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from("app_settings")
          .insert([{ 
            user_id: userId,
            sidebar_color: "#0f31b3",
            dashboard_color: "#ffffff",
            notifications_enabled: false,
            notification_events: [],
            gamification_enabled: true,
            quest_style: "rpg"
          }])
          .select()
          .single();
          
        if (insertError) throw insertError;
        setSettings(newData);
      } else {
        setSettings(data);
      }
    } catch (err: any) {
      console.error("Erreur dans useSettings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateSettings(partial: Partial<AppSettings>) {
    if (!settings?.id) return;
    try {
      setLoading(true);
      setError(null);
      
      const updated = { ...settings, ...partial };
      const { data, error } = await supabase
        .from("app_settings")
        .update(updated)
        .eq("id", settings.id)
        .select()
        .single();
        
      if (error) throw error;
      setSettings(data);
      return data;
    } catch (err: any) {
      console.error("Erreur dans updateSettings:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    settings,
    loading,
    error,
    updateSettings
  };
}
