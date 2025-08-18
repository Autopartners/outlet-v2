export interface Lot {
    code: string;
    end_at: string;
    id: number;
    km: number;
    last_bid: number;
    my_last_bid: number|null;
    price: number;
    sales_pictures: [{ url: string; id: number }];
    short_name: string;
    start_at: string;
    vehicle: {
        city_of_remarketing_name: string,
        brand_name: string,
        vehicle_model_name: string,
        vehicle_submodel: {
            body_type: { name: string },
            gearbox: { name: string },
            fuel_type: { name: string },
        }
        vehicle_plate_no: string,
        vin: string
    };
    vehicle_name: string;
    year: number;
}
