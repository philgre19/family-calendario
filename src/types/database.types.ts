
export interface Database {
  public: {
    Tables: {
      members: {
        Row: Member;
      };
      avatar_items: {
        Row: AvatarItem;
      };
      member_avatar_items: {
        Row: MemberAvatarItem;
      };
    };
  };
}

export interface Member {
  id: string;
  name: string;
  created_at?: string;
  avatar_url: string | null;
  color: string;
  avatar_type: 'illustrated' | 'photo';
  participate_in_quests: boolean | null;
  quest_language_style: 'rpg' | 'neutral' | null;
  current_hair: string | null;
  current_clothes: string | null;
  current_accessory: string | null;
  current_background: string | null;
  current_hair_color: string | null;
}

export interface AvatarItem {
  id: string;
  name: string;
  type: 'hair' | 'clothes' | 'accessory';
  image_url: string;
  color?: string | null;
  display_name?: string | null;
  is_premium?: boolean | null;
  rarity?: string | null;
  created_at?: string;
}

export interface MemberAvatarItem {
  id: string;
  member_id: string;
  item_id: string;
  color?: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  platform: string | null;
}

export interface EventParticipant {
  id: string;
  event_id: string;
  member_id: string;
  confirmed: boolean | null;
}

export interface Task {
  id: string;
  description: string;
  assigned_to: string | null;
  completed: boolean;
  points: number;
  quest_type: 'mission' | 'daily_quest' | 'challenge';
  xp_reward: number;
  gold_reward: number;
  streak?: number;
}

export interface Level {
  id: string;
  member_id: string;
  current_level: number;
  current_xp: number;
  gold: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  min_level: number;
  image_url: string | null;
  type: string;
}

export interface Cosmetic {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  type: 'hair' | 'clothes' | 'accessory' | 'background';
  min_level: number;
}

export interface MemberCosmetic {
  id: string;
  member_id: string;
  cosmetic_id: string;
  is_equipped: boolean;
}

export interface FamilyQuest {
  id: string;
  title: string;
  description: string | null;
  goal_type: string;
  goal_value: number;
  current_value: number;
  reward_id: string | null;
  completed: boolean;
}
