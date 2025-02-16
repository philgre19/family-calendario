
import { supabase } from "@/integrations/supabase/client";

export const setupRealtimeSubscriptions = () => {
  const channel = supabase
    .channel('app-updates')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public' },
      (payload) => {
        console.log('Change received!', payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
