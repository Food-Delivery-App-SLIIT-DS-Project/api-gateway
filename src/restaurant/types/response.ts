export interface RestaurantResponse<T = any> {
  code: string;
  message: string;
  data: T;
}
