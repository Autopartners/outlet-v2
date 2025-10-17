import 'react-image-gallery';

export type Picture = {
  id: number;
  url: string;
  thumbnail: string;
  is_avatar: boolean;
  is_deleted: boolean;
  updated_at: string;
};

export type DamagePart = {
  canvas_position_x: number;
  canvas_position_y: number;
  title?: string;
}

export type Damage = {
  id: number;
  left_right: number;
  part_damages: [{ description: string; damage_type: { title: string } }];
  damage_part: DamagePart;
  pictures: Picture[];
  hide_on_auction: boolean;
}

export type AutotekaReport = {
  data: object;
  id: number;
  web_link: string;
  pdf_link: string;
  status: string;
  report_id: string;
  vehicle_id: number;
}

export interface Lot {
  id: number;
  status: 'agreement' | 'agreed' | 'sold' | 'cancelled';
  vehicle_id: number;
  auction_id: number;
  winner_user_id: number | null;
  sales_price: number | null;
  sales_comment: number | null;
  second_stage_minimal_price: number | undefined;
  definition_name: string;
  return_km: string;
  vehicle_year_of_production: number;
  definition_short_name: string;
  vehicle_plate_no: string;
  vin: string;
  address: string;
  stage: 'preparing' | 'first_stage' | 'second_stage' | 'third_stage' | 'finished';
  like_status: 'indifferent' | 'like';
  code: string;
  city_of_remarketing_name: string;
  vehicle_brand_name: string
  vehicle_model_name: string,
  body_type_name: string,
  gearbox_name: string,
  fuel_type_name: string,
  end_at: string;
  start_at: string;
  second_stage_at: string;
  third_stage_at: string;
  sales_pictures: Picture[];
  damages: Damage[];
  service_requests: ServiceRequest[];
  autoteka_reports: AutotekaReport[];
  vehicle_options: string;
  remarketing_options: string;
  my_first_stage_amount: number;
  my_second_stage_amount: number;
}

export interface ServiceRequest {
  date_at: string;
  smart_km?: number;
  auction_notes?: string;
  manager_notes?: string;
  note0?: string;
  id: number;
  hide_on_auction: boolean;
}

export interface LotsCache {
  result: Lot[];
  pages: number;
  total: number;
}

// Глобально расширенный тип
declare module 'react-image-gallery' {
  interface ReactImageGalleryItem {
    is_deleted?: boolean;
    is_avatar?: boolean;
  }
}
