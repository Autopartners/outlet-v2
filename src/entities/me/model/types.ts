export interface Company {
  company_name: string;
  address: string;
  inn: string;
  signature: string;
  buyer: string;
  buyer_base: string;
}

export interface Role {
  id: number;
}

export interface Attachment {
  id: number,
  path: string;
  filename: string;
}

export interface Me {
  id: number | null;
  company: Company | null;
  outlet_user_setting: meOutletSettings;
  name: string;
  email0: string;
  phone0: string;
  phone_confirmed: boolean;
  email_confirmed: boolean;
  username: string;
  show_success_notifications: boolean;
  roles: Role[];
  ap_user: boolean;
  outlet: boolean;
  auction_confirmed?: boolean;
  attachments?: Attachment[];
  lawyer_comments?: [string, string][];
  documents_comment?: string;
  phone_confirmation_sent_at: string;
  email_confirmation_sent_at: string;
  avatar_url: string;

  [key: string]: unknown;
}

export interface meOutletSettings {
  filters: {
    liked: boolean | null,
    q: {
      vehicle_vehicle_model_id_eq: string | null,
      vehicle_vehicle_brand_id_eq: string | null,
      vehicle_city_of_remarketing_id_eq: string | null
    }
  },
  filters_enabled: boolean| null,
  view_type: 'table_view' | 'cards_view' | null
}
