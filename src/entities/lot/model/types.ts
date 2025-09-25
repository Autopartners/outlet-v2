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
  my_bid: number | null;
  like_status: 'indifferent' | 'liked' | 'unliked';
  code: string;
  city_of_remarketing_name: string;
  brand_name: string
  vehicle_model_name: string,
  body_type: { name: string },
  gearbox: { name: string },
  fuel_type: { name: string },
  end_at: string;
  start_at: string;
  second_stage_at: string;
  third_stage_at: string;
  sales_pictures_limited: [{ url: string; id: number }];
  damages: Array<object>;
  service_requests: Array<object>;
}
