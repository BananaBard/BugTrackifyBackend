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
      activityLogs: {
        Row: {
          action: string | null
          created_at: string
          entity: string | null
          entityType: string | null
          id: string
          userId: string
        }
        Insert: {
          action?: string | null
          created_at?: string
          entity?: string | null
          entityType?: string | null
          id?: string
          userId: string
        }
        Update: {
          action?: string | null
          created_at?: string
          entity?: string | null
          entityType?: string | null
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ActivityLogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          createdAt: string
          creatorId: string
          id: string
          incidentId: string
          parentId: string | null
          updatedAt: string | null
        }
        Insert: {
          content?: string
          createdAt?: string
          creatorId: string
          id?: string
          incidentId: string
          parentId?: string | null
          updatedAt?: string | null
        }
        Update: {
          content?: string
          createdAt?: string
          creatorId?: string
          id?: string
          incidentId?: string
          parentId?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Comments_creatorId_fkey"
            columns: ["creatorId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comments_incidentId_fkey"
            columns: ["incidentId"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comments_parentId_fkey"
            columns: ["parentId"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          actual_result: string
          assigned_to: string | null
          created_at: string
          created_by: string
          description: string
          expected_result: string
          id: string
          priority: string
          project_id: string
          severity: string
          status: string
          steps_to_reproduce: string[]
          title: string
          updated_at: string | null
        }
        Insert: {
          actual_result: string
          assigned_to?: string | null
          created_at?: string
          created_by: string
          description: string
          expected_result: string
          id?: string
          priority: string
          project_id: string
          severity: string
          status: string
          steps_to_reproduce: string[]
          title: string
          updated_at?: string | null
        }
        Update: {
          actual_result?: string
          assigned_to?: string | null
          created_at?: string
          created_by?: string
          description?: string
          expected_result?: string
          id?: string
          priority?: string
          project_id?: string
          severity?: string
          status?: string
          steps_to_reproduce?: string[]
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Incidents_assignedTo_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Incidents_createdBy_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Incidents_projectId_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          description: string
          id: string
          incident_count: number
          leader: string | null
          start_date: string | null
          status: string | null
          team: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          incident_count?: number
          leader?: string | null
          start_date?: string | null
          status?: string | null
          team?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          incident_count?: number
          leader?: string | null
          start_date?: string | null
          status?: string | null
          team?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Projects_leader_fkey"
            columns: ["leader"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          fullname: string
          id: string
          role: string
          total_incidents: number | null
          total_projects: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          fullname: string
          id: string
          role: string
          total_incidents?: number | null
          total_projects?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          fullname?: string
          id?: string
          role?: string
          total_incidents?: number | null
          total_projects?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decreace_incident_count: {
        Args: {
          projectid: string
        }
        Returns: undefined
      }
      increment_incident_count: {
        Args: {
          projectid: string
        }
        Returns: undefined
      }
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
