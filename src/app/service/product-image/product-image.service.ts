import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../app.module";
import {ProductImage} from "../module/user.module";

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  private url = 'http://localhost:8080/users/product/image';
  constructor(private http: HttpClient) { }

  getProductImages(productId: string): Observable<ApiResponse<ProductImage[]>>{
    return this.http.get<ApiResponse<any[]>>(`${this.url}/getByProduct`, {params: {productId: productId}});
  }
}
