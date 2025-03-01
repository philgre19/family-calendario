
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

// Fonction pour créer un profil utilisateur après inscription
export const createUserProfile = async (userId: string, email: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      { 
        id: userId,
        email: email,
        display_name: email.split('@')[0],
        avatar_url: null,
        role: 'user',
      }
    ]);
    
  if (error) {
    console.error('Erreur lors de la création du profil:', error);
    throw error;
  }
  
  return data;
};

// Fonction pour récupérer le profil d'un utilisateur
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return null;
  }
  
  return data;
};

// Fonction pour mettre à jour le profil d'un utilisateur
export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
    
  if (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    throw error;
  }
  
  return data;
};
