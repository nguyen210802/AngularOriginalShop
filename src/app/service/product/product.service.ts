import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../module/user.module";
import {ApiResponse, PageResponse} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/users/product';

  constructor(private http : HttpClient) { }

  getAll(page: number, size : number): Observable<ApiResponse<PageResponse<Product>>> {
    return this.http.get<any>(`${this.url}/getAll`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }
}
