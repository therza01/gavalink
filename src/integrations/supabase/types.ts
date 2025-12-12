export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          application_number: string
          application_type: string
          assigned_officer: string | null
          created_at: string | null
          description: string | null
          id: string
          last_updated: string | null
          notes: string | null
          officer_id: string | null
          priority: string | null
          resolution_date: string | null
          status: string | null
          submitted_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_number: string
          application_type: string
          assigned_officer?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          last_updated?: string | null
          notes?: string | null
          officer_id?: string | null
          priority?: string | null
          resolution_date?: string | null
          status?: string | null
          submitted_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_number?: string
          application_type?: string
          assigned_officer?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          last_updated?: string | null
          notes?: string | null
          officer_id?: string | null
          priority?: string | null
          resolution_date?: string | null
          status?: string | null
          submitted_date?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string | null
          document_name: string
          document_type: string
          expiry_date: string | null
          file_size: number | null
          file_url: string | null
          id: string
          issued_date: string | null
          reference_number: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_name: string
          document_type: string
          expiry_date?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          issued_date?: string | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_name?: string
          document_type?: string
          expiry_date?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          issued_date?: string | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          application_id: string | null
          attachments: Json | null
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          message_type: string | null
          priority: string | null
          receiver_id: string
          sender_id: string
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          application_id?: string | null
          attachments?: Json | null
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          priority?: string | null
          receiver_id: string
          sender_id: string
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          application_id?: string | null
          attachments?: Json | null
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          priority?: string | null
          receiver_id?: string
          sender_id?: string
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          mpesa_receipt: string | null
          payment_date: string | null
          payment_method: string | null
          status: string | null
          tax_return_id: string | null
          transaction_reference: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          mpesa_receipt?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
          tax_return_id?: string | null
          transaction_reference?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          mpesa_receipt?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
          tax_return_id?: string | null
          transaction_reference?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_tax_return_id_fkey"
            columns: ["tax_return_id"]
            isOneToOne: false
            referencedRelation: "tax_returns"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          compliance_score: number | null
          county: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          kra_pin: string | null
          national_id: string | null
          phone_number: string | null
          postal_address: string | null
          profile_type: string | null
          sub_county: string | null
          tcc_status: string | null
          updated_at: string | null
          user_id: string | null
          ward: string | null
        }
        Insert: {
          avatar_url?: string | null
          compliance_score?: number | null
          county?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          kra_pin?: string | null
          national_id?: string | null
          phone_number?: string | null
          postal_address?: string | null
          profile_type?: string | null
          sub_county?: string | null
          tcc_status?: string | null
          updated_at?: string | null
          user_id?: string | null
          ward?: string | null
        }
        Update: {
          avatar_url?: string | null
          compliance_score?: number | null
          county?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          kra_pin?: string | null
          national_id?: string | null
          phone_number?: string | null
          postal_address?: string | null
          profile_type?: string | null
          sub_county?: string | null
          tcc_status?: string | null
          updated_at?: string | null
          user_id?: string | null
          ward?: string | null
        }
        Relationships: []
      }
      tax_returns: {
        Row: {
          acknowledgement_number: string | null
          amount_due: number | null
          amount_paid: number | null
          created_at: string | null
          due_date: string
          filing_date: string | null
          id: string
          reference_number: string | null
          return_type: string
          status: string | null
          tax_year: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          acknowledgement_number?: string | null
          amount_due?: number | null
          amount_paid?: number | null
          created_at?: string | null
          due_date: string
          filing_date?: string | null
          id?: string
          reference_number?: string | null
          return_type: string
          status?: string | null
          tax_year: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          acknowledgement_number?: string | null
          amount_due?: number | null
          amount_paid?: number | null
          created_at?: string | null
          due_date?: string
          filing_date?: string | null
          id?: string
          reference_number?: string | null
          return_type?: string
          status?: string | null
          tax_year?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      voice_agent_requests: {
        Row: {
          created_at: string
          description: string
          id: string
          officer_id: string | null
          officer_notes: string | null
          priority: string | null
          request_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          officer_id?: string | null
          officer_notes?: string | null
          priority?: string | null
          request_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          officer_id?: string | null
          officer_notes?: string | null
          priority?: string | null
          request_type?: string
          status?: string
          updated_at?: string
          user_id?: string
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
    Enums: {},
  },
} as const
