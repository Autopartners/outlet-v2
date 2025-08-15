export interface Lot {
    id: number;
    short_name: string;
    year: number;
    km: number;
    price: number;
    sales_pictures: [{ url: string, id: number }];
    last_bid: number;
    end_at: string;
}
