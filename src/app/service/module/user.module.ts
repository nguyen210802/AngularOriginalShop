export interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  createAt: string,
  updateAt: string,
}

export interface UserRequest{
  username: string;
  password: string;
  email: string;
}

export interface AuthenticationRequest{
  username: string;
  password: string;
}

export interface AuthenticationResponse{
  authenticated: boolean;
  token: string;
}

export enum Authenticated{
  USER= 'USER',
  ADMIN = 'ADMIN'
}

export interface Product {
  id: string;
  seller: UserResponse;  // Định nghĩa interface User tương tự
  name: string;
  image: ArrayBuffer;  // Kiểu dữ liệu để lưu trữ ảnh
  description?: string;  // Dấu ? để cho phép giá trị này có thể null
  manufacturer?: string;
  price: number;
  comments: Comment[];  // Định nghĩa interface Comment tương tự
}
