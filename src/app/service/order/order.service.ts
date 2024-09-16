import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse, PageResponse} from "../../app.module";
import {Order, OrderItem} from "../module/user.module";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = 'http://localhost:8080/users/order';
  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAll(page: number, size: number): Observable<ApiResponse<PageResponse<Order>>>{
    return this.http.get<any>(`${this.url}/getAll`, {
      params: {
        page: page.toString(),
        size: size.toString()
      },
      headers: this.getHeaders()
    });
  }

  getById(orderId: string): Observable<ApiResponse<Order>>{
    return this.http.get<any>(`${this.url}`, {
      params: {
        orderId: orderId
      },
      headers: this.getHeaders()
    });
  }

  createOrder(orderItems: OrderItem[]): Observable<ApiResponse<Order>>{
    return this.http.post<any>(`${this.url}/create`, orderItems, {
      headers: this.getHeaders()
    })
  }

  deleteOrder(orderId: string): Observable<ApiResponse<string>>{
    return this.http.delete<any>(`${this.url}/delete`, {
      params: {
        orderId: orderId
      },
      headers: this.getHeaders()
    });
  }
}
