export type Role = 'Admin' | 'customer' | 'restaurant' | 'delivery_personnel';

export interface User {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: Role;
  isVerified: 'pending' | 'verified' | 'rejected';
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
}

export interface TokenInfo {
  access: string;
  refresh: string;
  expire_seconds: number;
  uid: string;
}

export interface AuthData {
  role: Role;
  user: User;
  token: TokenInfo;
}

export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}
