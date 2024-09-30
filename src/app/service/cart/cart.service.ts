import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiResponse} from "../../app.module";
import {Cart} from "../../module/user.module";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = 'http://localhost:8080/users/cart';

  constructor(private http : HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCartByProductName(productName: string): Observable<ApiResponse<Cart>>{
    return this.http.get<any>(`${this.url}/getCartByProductName`, {
      params: {
        productName: productName
      },
      headers: this.getHeaders() });
  }

  countCart(): Observable<ApiResponse<number>>{
    return this.http.get<any>(`${this.url}/count`, {headers: this.getHeaders() });
  }

  addCart(productId: string): Observable<ApiResponse<Cart>>{
    return this.http.post<any>(`${this.url}/addCart/${productId}`, {}, {
      headers: this.getHeaders() });
  }

  reduceCart(productId: string): Observable<ApiResponse<Cart>>{
    return this.http.post<any>(`${this.url}/reduceCart/${productId}`, {}, {
      headers: this.getHeaders() });
  }

  deleteCart(productId: string): Observable<ApiResponse<Cart>>{
    return this.http.delete<any>(`${this.url}/deleteCart/${productId}`, {
      headers: this.getHeaders() });
  }
}
