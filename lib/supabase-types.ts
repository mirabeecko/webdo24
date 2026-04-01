export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          message: string;
          name: string;
          email: string;
          phone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          message: string;
          name: string;
          email: string;
          phone: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          lead_id: string;
          price: number;
          paid: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          price: number;
          paid?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
        Relationships: [];
      };
      webdo24_customers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          company: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          company?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          company?: string | null;
        };
        Relationships: [];
      };
      webdo24_orders: {
        Row: {
          id: string;
          customer_id: string;
          package_id: string;
          package_name: string;
          total_price: number;
          deposit_amount: number;
          remaining_amount: number;
          status: string;
          industry: string | null;
          business_description: string | null;
          design_style: string | null;
          design_inspiration: string | null;
          has_logo: string | null;
          has_texts: string | null;
          has_photos: string | null;
          note: string | null;
          deposit_paid_at: string | null;
        };
        Insert: {
          id?: string;
          customer_id: string;
          package_id: string;
          package_name: string;
          total_price: number;
          deposit_amount: number;
          remaining_amount: number;
          status: string;
          industry?: string | null;
          business_description?: string | null;
          design_style?: string | null;
          design_inspiration?: string | null;
          has_logo?: string | null;
          has_texts?: string | null;
          has_photos?: string | null;
          note?: string | null;
          deposit_paid_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['webdo24_orders']['Insert']>;
        Relationships: [];
      };
      webdo24_payments: {
        Row: {
          id: string;
          order_id: string;
          stripe_session_id: string;
          stripe_payment_intent_id: string | null;
          amount: number;
          currency: string;
          type: string;
          status: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          stripe_session_id: string;
          stripe_payment_intent_id?: string | null;
          amount: number;
          currency: string;
          type: string;
          status: string;
          paid_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['webdo24_payments']['Insert']>;
        Relationships: [];
      };
      webdo24_projects: {
        Row: {
          id: string;
          order_id: string;
          status: string;
          started_at: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          status: string;
          started_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['webdo24_projects']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
