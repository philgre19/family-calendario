export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          title: string
          xp_reward: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          title: string
          xp_reward?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          title?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      avatar_items: {
        Row: {
          color: string | null
          created_at: string | null
          display_name: string | null
          id: string
          image_url: string
          is_premium: boolean | null
          name: string
          rarity: string | null
          type: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          image_url: string
          is_premium?: boolean | null
          name: string
          rarity?: string | null
          type: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          image_url?: string
          is_premium?: boolean | null
          name?: string
          rarity?: string | null
          type?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          min_level: number
          name: string
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          min_level: number
          name: string
          type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          min_level?: number
          name?: string
          type?: string
        }
        Relationships: []
      }
      cosmetics: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          min_level: number | null
          name: string
          price: number
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          min_level?: number | null
          name: string
          price: number
          type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          min_level?: number | null
          name?: string
          price?: number
          type?: string
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          completed: boolean | null
          created_at: string | null
          description: string | null
          id: string
          title: string
          xp_reward: number | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          xp_reward?: number | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      event_participants: {
        Row: {
          confirmed: boolean | null
          created_at: string
          event_id: string | null
          id: string
          member_id: string | null
          status: string | null
        }
        Insert: {
          confirmed?: boolean | null
          created_at?: string
          event_id?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
        }
        Update: {
          confirmed?: boolean | null
          created_at?: string
          event_id?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participants_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          id: string
          participants: string[] | null
          platform: string | null
          start_date: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          participants?: string[] | null
          platform?: string | null
          start_date: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          participants?: string[] | null
          platform?: string | null
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      family_goals: {
        Row: {
          completed: boolean | null
          created_at: string | null
          description: string | null
          id: string
          progress: number | null
          reward: string | null
          target: number
          title: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          reward?: string | null
          target: number
          title: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          reward?: string | null
          target?: number
          title?: string
        }
        Relationships: []
      }
      levels: {
        Row: {
          created_at: string
          current_level: number | null
          current_xp: number | null
          gold: number | null
          id: string
          member_id: string | null
        }
        Insert: {
          created_at?: string
          current_level?: number | null
          current_xp?: number | null
          gold?: number | null
          id?: string
          member_id?: string | null
        }
        Update: {
          created_at?: string
          current_level?: number | null
          current_xp?: number | null
          gold?: number | null
          id?: string
          member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "levels_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: true
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      member_achievements: {
        Row: {
          achievement_id: string | null
          id: string
          member_id: string | null
          unlocked_at: string | null
        }
        Insert: {
          achievement_id?: string | null
          id?: string
          member_id?: string | null
          unlocked_at?: string | null
        }
        Update: {
          achievement_id?: string | null
          id?: string
          member_id?: string | null
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_member_achievements_achievement"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_member_achievements_member"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_achievements_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      member_cosmetics: {
        Row: {
          cosmetic_id: string | null
          created_at: string | null
          id: string
          is_equipped: boolean | null
          member_id: string | null
        }
        Insert: {
          cosmetic_id?: string | null
          created_at?: string | null
          id?: string
          is_equipped?: boolean | null
          member_id?: string | null
        }
        Update: {
          cosmetic_id?: string | null
          created_at?: string | null
          id?: string
          is_equipped?: boolean | null
          member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_cosmetics_cosmetic_id_fkey"
            columns: ["cosmetic_id"]
            isOneToOne: false
            referencedRelation: "cosmetics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_cosmetics_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          avatar_type: string
          avatar_url: string | null
          color: string
          created_at: string
          current_accessory: string | null
          current_background: string | null
          current_clothes: string | null
          current_hair: string | null
          id: string
          level: number | null
          name: string
          participate_in_quests: boolean | null
          quest_language_style: string | null
          xp: number | null
        }
        Insert: {
          avatar_type?: string
          avatar_url?: string | null
          color: string
          created_at?: string
          current_accessory?: string | null
          current_background?: string | null
          current_clothes?: string | null
          current_hair?: string | null
          id?: string
          level?: number | null
          name: string
          participate_in_quests?: boolean | null
          quest_language_style?: string | null
          xp?: number | null
        }
        Update: {
          avatar_type?: string
          avatar_url?: string | null
          color?: string
          created_at?: string
          current_accessory?: string | null
          current_background?: string | null
          current_clothes?: string | null
          current_hair?: string | null
          id?: string
          level?: number | null
          name?: string
          participate_in_quests?: boolean | null
          quest_language_style?: string | null
          xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "members_current_accessory_fkey"
            columns: ["current_accessory"]
            isOneToOne: false
            referencedRelation: "cosmetics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_current_background_fkey"
            columns: ["current_background"]
            isOneToOne: false
            referencedRelation: "cosmetics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_current_clothes_fkey"
            columns: ["current_clothes"]
            isOneToOne: false
            referencedRelation: "cosmetics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_current_hair_fkey"
            columns: ["current_hair"]
            isOneToOne: false
            referencedRelation: "cosmetics"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_rankings: {
        Row: {
          created_at: string | null
          id: string
          member_id: string | null
          month: string
          points: number | null
          rank: number | null
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          month: string
          points?: number | null
          rank?: number | null
          year: number
        }
        Update: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          month?: string
          points?: number | null
          rank?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_monthly_rankings_member"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_rankings_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          member_id: string | null
          message: string
          read: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          message: string
          read?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          message?: string
          read?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_notifications_member"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      points_history: {
        Row: {
          created_at: string | null
          id: string
          member_id: string | null
          points: number | null
          reason: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          points?: number | null
          reason?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          points?: number | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_points_history_member"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "points_history_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          cost: number
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          cost: number
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          cost?: number
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed: boolean | null
          created_at: string
          date: string | null
          description: string
          difficulty: string | null
          gold_reward: number | null
          id: string
          members_ids: string[] | null
          points: number | null
          quest_type: string | null
          xp_reward: number | null
        }
        Insert: {
          assigned_to?: string | null
          completed?: boolean | null
          created_at?: string
          date?: string | null
          description: string
          difficulty?: string | null
          gold_reward?: number | null
          id?: string
          members_ids?: string[] | null
          points?: number | null
          quest_type?: string | null
          xp_reward?: number | null
        }
        Update: {
          assigned_to?: string | null
          completed?: boolean | null
          created_at?: string
          date?: string | null
          description?: string
          difficulty?: string | null
          gold_reward?: number | null
          id?: string
          members_ids?: string[] | null
          points?: number | null
          quest_type?: string | null
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      todos: {
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          task: string | null
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id?: string
        }
        Relationships: []
      }
      widgets_positions: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
