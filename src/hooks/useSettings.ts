
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
      const { data, error } = await supabase
        .from("app_settings")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.details?.includes("No rows")) {
        const { data: newData, error: insertError } = await supabase
          .from("app_settings")
          .insert({ user_id: userId })
          .select("*")
          .single();
        if (insertError) throw insertError;
        setSettings(newData);
      } else if (error) {
        throw error;
      } else {
        setSettings(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateSettings(partial: Partial<AppSettings>) {
    if (!settings || !settings.id) return;
    try {
      setLoading(true);
      const updated = { ...settings, ...partial };
      const { data, error } = await supabase
        .from("app_settings")
        .update(updated)
        .eq("id", settings.id)
        .select("*")
        .single();
      if (error) throw error;
      setSettings(data);
    } catch (err: any) {
      setError(err.message);
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
