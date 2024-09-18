import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart, UserRequest, UserResponse} from "../module/user.module";
import {ApiResponse} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/users';

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor(private http : HttpClient) { }
  getMyInfo(): Observable<ApiResponse<UserResponse>> {
    return this.http.get<any>(`${this.url}/myInfo`, {headers: this.getHeaders()});
  }

  getMyCart(): Observable<ApiResponse<Cart>>{
    return this.http.get<any>(`${this.url}/myCart`,{headers: this.getHeaders()})
  }

  createUser(user: UserRequest): Observable<ApiResponse<UserResponse>> {
    return this.http.post<any>(`${this.url}/registration`, user);
  }

  updateUser(user: UserRequest): Observable<ApiResponse<UserResponse>>{
    return this.http.put<any>(`${this.url}/update`, user, {headers: this.getHeaders()});
  }

  deleteUser():Observable<ApiResponse<string>>{
    return this.http.delete<any>(`${this.url}/delete`, {headers: this.getHeaders()});
  }
}
