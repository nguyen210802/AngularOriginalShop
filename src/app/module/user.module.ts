export interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  dob: string;
  createAt: string,
  updateAt: string,
}

export interface UserRequest{
  username: string;
  password: string;
  email: string;
  phone: string;
  dob: string
}

export interface AuthenticationRequest{
  username: string;
  password: string;
}

export interface AuthenticationResponse{
  authenticated: boolean;
  token: string;
  refreshToken: string;
}

export class RefreshTokenRequest{
  refreshToken: string;
  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}

export interface IntrospectRequest{
  token: string;
}

export interface IntrospectResponse{
  valid: boolean;
}

export enum Authenticated{
  USER= 'USER',
  ADMIN = 'ADMIN'
}

export interface Product {
  id: string;
  seller: UserResponse;  // Định nghĩa interface User tương tự
  name: string;
  images: ProductImage[];
  description?: string;  // Dấu ? để cho phép giá trị này có thể null
  manufacturer?: string;
  price: number;
  comments: Comment[];  // Định nghĩa interface Comment tương tự
}

export interface ProductRequest{
  name: string;
  images: string[];
  description: string;
  manufacturer: string;
  price: number;
}

export interface ProductImage{
  id: string;
  image: ArrayBuffer;
  mainImage: boolean;
  product: Product;
}

export interface Comment {
  id: string;
  message: string;
  product: Product;
  buyer: UserResponse;
}

export interface Order{
  id: string;
  buyer: UserResponse;
  orderItems: OrderItem[];
  totalAmount: bigint,
  createAt: string,
  updateAt: string,
}

export interface OrderItem{
  id: string;
  productId: string,
  productPrice: string,
  linkProduct: string,
  quantity:number,
  price: bigint
}

export interface CartItem{
  id: string;
  cart: Cart;
  product:Product;
  quantity: number;
  price: bigint;
}

export interface Cart{
  id: string;
  buyer: UserResponse;
  cartItems: CartItem[];
}

export interface Notifications {
  id: string;
  user: UserResponse;
  message: string;
  read: boolean;
  createAt: Date;
}
