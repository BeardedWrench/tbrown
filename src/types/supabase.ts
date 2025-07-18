export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      _PostTags: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_PostTags_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "Post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_PostTags_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      _TutorialTags: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_TutorialTags_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_TutorialTags_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "Tutorial"
            referencedColumns: ["id"]
          },
        ]
      }
      FeatureFlag: {
        Row: {
          createdAt: string
          enabled: boolean
          id: string
          key: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          enabled?: boolean
          id: string
          key: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          enabled?: boolean
          id?: string
          key?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Post: {
        Row: {
          authorId: string
          content: string
          coverImage: string | null
          createdAt: string
          excerpt: string | null
          id: string
          postCategoryId: string | null
          published: boolean
          slug: string
          title: string
          updatedAt: string
        }
        Insert: {
          authorId: string
          content: string
          coverImage?: string | null
          createdAt?: string
          excerpt?: string | null
          id: string
          postCategoryId?: string | null
          published?: boolean
          slug: string
          title: string
          updatedAt: string
        }
        Update: {
          authorId?: string
          content?: string
          coverImage?: string | null
          createdAt?: string
          excerpt?: string | null
          id?: string
          postCategoryId?: string | null
          published?: boolean
          slug?: string
          title?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Post_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Post_postCategoryId_fkey"
            columns: ["postCategoryId"]
            isOneToOne: false
            referencedRelation: "PostCategory"
            referencedColumns: ["id"]
          },
        ]
      }
      PostCategory: {
        Row: {
          createdAt: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          slug: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      Project: {
        Row: {
          authorId: string
          coverImage: string | null
          createdAt: string
          description: string
          featured: boolean
          id: string
          projectCategoryId: string | null
          repo: string | null
          slug: string
          techStack: string[] | null
          title: string
          updatedAt: string
          url: string | null
        }
        Insert: {
          authorId: string
          coverImage?: string | null
          createdAt?: string
          description: string
          featured?: boolean
          id: string
          projectCategoryId?: string | null
          repo?: string | null
          slug: string
          techStack?: string[] | null
          title: string
          updatedAt: string
          url?: string | null
        }
        Update: {
          authorId?: string
          coverImage?: string | null
          createdAt?: string
          description?: string
          featured?: boolean
          id?: string
          projectCategoryId?: string | null
          repo?: string | null
          slug?: string
          techStack?: string[] | null
          title?: string
          updatedAt?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Project_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Project_projectCategoryId_fkey"
            columns: ["projectCategoryId"]
            isOneToOne: false
            referencedRelation: "ProjectCategory"
            referencedColumns: ["id"]
          },
        ]
      }
      ProjectCategory: {
        Row: {
          createdAt: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          slug: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      Role: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Setting: {
        Row: {
          createdAt: string
          id: string
          key: string
          type: Database["public"]["Enums"]["SettingType"]
          updatedAt: string
          value: string
        }
        Insert: {
          createdAt?: string
          id: string
          key: string
          type?: Database["public"]["Enums"]["SettingType"]
          updatedAt: string
          value: string
        }
        Update: {
          createdAt?: string
          id?: string
          key?: string
          type?: Database["public"]["Enums"]["SettingType"]
          updatedAt?: string
          value?: string
        }
        Relationships: []
      }
      Tag: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      Tutorial: {
        Row: {
          authorId: string
          content: string
          createdAt: string
          difficulty: Database["public"]["Enums"]["Difficulty"]
          id: string
          slug: string
          title: string
          tutorialCategoryId: string | null
          updatedAt: string
        }
        Insert: {
          authorId: string
          content: string
          createdAt?: string
          difficulty: Database["public"]["Enums"]["Difficulty"]
          id: string
          slug: string
          title: string
          tutorialCategoryId?: string | null
          updatedAt: string
        }
        Update: {
          authorId?: string
          content?: string
          createdAt?: string
          difficulty?: Database["public"]["Enums"]["Difficulty"]
          id?: string
          slug?: string
          title?: string
          tutorialCategoryId?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Tutorial_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Tutorial_tutorialCategoryId_fkey"
            columns: ["tutorialCategoryId"]
            isOneToOne: false
            referencedRelation: "TutorialCategory"
            referencedColumns: ["id"]
          },
        ]
      }
      TutorialCategory: {
        Row: {
          createdAt: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          slug: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          avatarUrl: string | null
          createdAt: string
          email: string
          id: string
          name: string | null
          roleId: string
        }
        Insert: {
          avatarUrl?: string | null
          createdAt?: string
          email: string
          id: string
          name?: string | null
          roleId: string
        }
        Update: {
          avatarUrl?: string | null
          createdAt?: string
          email?: string
          id?: string
          name?: string | null
          roleId?: string
        }
        Relationships: [
          {
            foreignKeyName: "User_roleId_fkey"
            columns: ["roleId"]
            isOneToOne: false
            referencedRelation: "Role"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_editor: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      Difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
      SettingType: "STRING" | "BOOLEAN" | "NUMBER" | "JSON"
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
    Enums: {
      Difficulty: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
      SettingType: ["STRING", "BOOLEAN", "NUMBER", "JSON"],
    },
  },
} as const
