import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse, PageResponse} from "../../app.module";
import {UserResponse} from "../module/user.module";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url =  'http://localhost:8080/users/product/comment';


  constructor(private http : HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllByProduct(productId: string, page: number, size: number) : Observable<ApiResponse<PageResponse<Comment>>>{
    return this.http.get<any>(`${this.url}/getAllByProduct/${productId}`, {
      params: {
        page: page.toString(),
        size: size.toString()
      },
      headers: this.getHeaders()});
  }

  createComment(productId: string, comment: Comment): Observable<ApiResponse<Comment>>{
    return this.http.post<any>(`${this.url}/create/${productId}`, comment, {
      headers: this.getHeaders()
    })
  }

  deleteComment(commentId: string): Observable<ApiResponse<String>>{
    return this.http.delete<any>(`${this.url}/delete/${commentId}`, {
      headers: this.getHeaders()
    })
  }
}
