export interface VehicleResponse {
  code: string;
  message: string;
  data: {
    vehicle_id?: string;
    driver_id?: string;
    vehicle_type?: string;
    brand_name?: string;
    model_name?: string;
    registration_number?: string;
    color?: string;
    year?: number;
    insurance_number?: string;
    insurance_expiry?: string;
    availability?: boolean;
    created_at?: string;
    updated_at?: string;
    tracking_id?: string;
    latitude?: number;
    longitude?: number;
  };
}
