
export interface Member {
  id: string;
  name: string;
  avatar_url: string;
  color: string;
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
}
