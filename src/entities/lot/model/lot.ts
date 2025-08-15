export interface Lot {
    end_at: string;
    id: number;
    km: number;
    last_bid: number;
    price: number;
    sales_pictures: [{ url: string; id: number }];
    short_name: string;
    start_at: string;
    vehicle: { city_of_remarketing_name: string };
    vehicle_name: string;
    year: number
}
