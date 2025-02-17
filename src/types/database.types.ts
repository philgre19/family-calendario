
export interface Member {
  id: string;
  name: string;
  avatar_url: string;
  color: string;
  level?: number;
  xp?: number;
  gold?: number;
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
  image_url: string | null;
}

export interface Cosmetic {
  id: string;
  name: string;
  type: string;
  price: number;
  image_url: string | null;
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
