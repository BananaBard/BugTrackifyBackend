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
      ActivityLogs: {
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
      Comments: {
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
            referencedRelation: "Incidents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comments_parentId_fkey"
            columns: ["parentId"]
            isOneToOne: false
            referencedRelation: "Comments"
            referencedColumns: ["id"]
          },
        ]
      }
      Incidents: {
        Row: {
          actualResult: string | null
          assignedTo: string | null
          createdAt: string
          createdBy: string
          description: string | null
          expectedResult: string | null
          id: string
          priority: string | null
          projectId: string | null
          severity: string | null
          status: string | null
          stepsToReproduce: string | null
          title: string | null
          updatedAt: string | null
        }
        Insert: {
          actualResult?: string | null
          assignedTo?: string | null
          createdAt?: string
          createdBy: string
          description?: string | null
          expectedResult?: string | null
          id?: string
          priority?: string | null
          projectId?: string | null
          severity?: string | null
          status?: string | null
          stepsToReproduce?: string | null
          title?: string | null
          updatedAt?: string | null
        }
        Update: {
          actualResult?: string | null
          assignedTo?: string | null
          createdAt?: string
          createdBy?: string
          description?: string | null
          expectedResult?: string | null
          id?: string
          priority?: string | null
          projectId?: string | null
          severity?: string | null
          status?: string | null
          stepsToReproduce?: string | null
          title?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Incidents_assignedTo_fkey"
            columns: ["assignedTo"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Incidents_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Incidents_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Projects: {
        Row: {
          createdAt: string | null
          description: string | null
          id: string
          incidentCount: number | null
          leader: string
          startDate: string | null
          status: string | null
          team: string[] | null
          title: string | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string | null
          description?: string | null
          id?: string
          incidentCount?: number | null
          leader: string
          startDate?: string | null
          status?: string | null
          team?: string[] | null
          title?: string | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string | null
          description?: string | null
          id?: string
          incidentCount?: number | null
          leader?: string
          startDate?: string | null
          status?: string | null
          team?: string[] | null
          title?: string | null
          updatedAt?: string | null
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
          createdat: string
          email: string
          fullname: string | null
          id: string
          role: string | null
          totalincidents: number | null
          totalprojects: number | null
          updatedat: string | null
        }
        Insert: {
          createdat?: string
          email: string
          fullname?: string | null
          id: string
          role?: string | null
          totalincidents?: number | null
          totalprojects?: number | null
          updatedat?: string | null
        }
        Update: {
          createdat?: string
          email?: string
          fullname?: string | null
          id?: string
          role?: string | null
          totalincidents?: number | null
          totalprojects?: number | null
          updatedat?: string | null
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
