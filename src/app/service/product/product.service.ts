import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart, Product, ProductRequest} from "../module/user.module";
import {ApiResponse, PageResponse} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/users/product';

  constructor(private http : HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAll(page: number, size : number): Observable<ApiResponse<PageResponse<Product>>> {
    return this.http.get<any>(`${this.url}/getAll`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  getById(productId: string): Observable<ApiResponse<Product>> {
    return this.http.get<any>(`${this.url}/${productId}`, {
      headers: this.getHeaders()
    });
  }

  getMyProduct(page: number, size: number): Observable<ApiResponse<PageResponse<Product>>>{
    return this.http.get<any>(`${this.url}/myProduct`, {
      params: {
        page: page.toString(),
        size: size.toString()
      },
      headers: this.getHeaders()
    });
  }

  createProduct(request: ProductRequest): Observable<ApiResponse<Product>>{
    return this.http.post<any>(`${this.url}/create`, request, { headers: this.getHeaders() });
  }

  updateProduct(productId: string, request: ProductRequest): Observable<ApiResponse<Product>>{
    return this.http.put<any>(`${this.url}/update/${productId}`, request, { headers: this.getHeaders() });
  }

  deleteProduct(productId: string): Observable<ApiResponse<String>>{
    return this.http.delete<any>(`${this.url}/delete/${productId}`, {
      headers: this.getHeaders()
    });
  }
}
